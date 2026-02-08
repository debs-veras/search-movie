import { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  MovieResult,
  MultiResult,
  PersonResult,
  SerieResult,
} from '../types/listResultsData.d';
import { SearchFormInputs } from '../types/searchFormInputs.d';
import { getSearchMovie } from '../services/searchRequest';
import useDebounce from '../hooks/useDebounce';

type SearchContextType = {
  filtros: SearchFormInputs;
  setFiltros: (val: SearchFormInputs) => void;
  listMovie: MovieResult[] | null;
  listPerson: PersonResult[] | null;
  listSerie: SerieResult[] | null;
  listMulti: MultiResult[] | null;
  loading: boolean;
  isFetchingMore: boolean;
  fetchMore: () => Promise<void>;
  hasMore: boolean;
};

const SearchContext = createContext({} as SearchContextType);

// ===== Normalizadores - garantem que o app sempre recebe dados no formato certo =====
const normalizeMovie = (data: any): MovieResult => ({
  id: data.id,
  title: data.title || '',
  original_title: data.original_title || '',
  overview: data.overview || '',
  poster_path: data.poster_path ?? null,
  backdrop_path: data.backdrop_path ?? null,
  release_date: data.release_date || '',
  vote_average: data.vote_average ?? 0,
  vote_count: data.vote_count ?? 0,
  genre_ids: data.genre_ids || [],
  popularity: data.popularity ?? 0,
  media_type: 'movie',
});

const normalizeSerie = (data: any): SerieResult => ({
  id: data.id,
  name: data.name || '',
  original_name: data.original_name || data.name || '',
  overview: data.overview || '',
  poster_path: data.poster_path ?? null,
  backdrop_path: data.backdrop_path ?? null,
  vote_average: data.vote_average ?? 0,
  first_air_date: data.first_air_date || '',
  origin_country: data.origin_country || [],
  genre_ids: data.genre_ids || [],
  popularity: data.popularity ?? 0,
  media_type: 'tv',
});

const normalizePerson = (data: any): PersonResult => ({
  id: data.id,
  name: data.name || '',
  profile_path: data.profile_path ?? null,
  known_for_department: data.known_for_department || '',
  media_type: 'person',
});

const normalizeMulti = (data: any): MultiResult => ({
  id: data.id,
  media_type: data.media_type,
  name: data.name,
  title: data.title,
  overview: data.overview,
  poster_path: data.poster_path ?? null,
  profile_path: data.profile_path ?? null,
  release_date: data.release_date,
  first_air_date: data.first_air_date,
  known_for_department: data.known_for_department,
});

// ===== Função genérica para aplicar resultados =====
function applyResults<T>(
  setter: React.Dispatch<React.SetStateAction<T[] | null>>,
  normalizer: (data: any) => T,
  results: any[],
  replace: boolean
) {
  const normalizedResults = results.map(normalizer);
  setter((prev) =>
    replace ? normalizedResults : [...(prev || []), ...normalizedResults]
  );
}

// ===== SearchProvider =====
export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [filtros, setFiltros] = useState<SearchFormInputs>({
    query: '',
    type: '',
    page: null,
  });
  const [listMovie, setListMovie] = useState<MovieResult[] | null>(null);
  const [listPerson, setListPerson] = useState<PersonResult[] | null>(null);
  const [listSerie, setListSerie] = useState<SerieResult[] | null>(null);
  const [listMulti, setListMulti] = useState<MultiResult[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const cacheRef = useRef(new Map<string, { data: any; ts: number }>());
  const abortRef = useRef<AbortController | null>(null);
  const activeRequestRef = useRef(0);
  const CACHE_TTL = 60_000;

  const buildCacheKey = (q: string, t: string, p: number) => `${q}|${t}|${p}`;

  const buildParams = (q: string, p: number) => {
    const params = new URLSearchParams();
    params.append('query', q);
    params.append('page', String(p));
    return params.toString();
  };

  const parsePage = (value: string | null | undefined) => {
    const parsed = Number.parseInt(value ?? '', 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  };

  const toggleLoading = (main = true, value = false) => {
    if (main) setLoading(value);
    else setIsFetchingMore(value);
  };

  const clearLists = () => {
    setListMovie(null);
    setListPerson(null);
    setListSerie(null);
    setListMulti(null);
  };

  const SearchMovieData = async (reset = true) => {
    if (!filtros.query || !filtros.type) {
      setHasMore(false);
      toggleLoading(reset, false);
      return;
    }

    const currentPage = reset ? parsePage(filtros.page) : page;
    toggleLoading(reset, true);

    const cacheKey = buildCacheKey(filtros.query, filtros.type, currentPage);
    const cachedEntry = cacheRef.current.get(cacheKey);

    if (cachedEntry) {
      const isExpired = Date.now() - cachedEntry.ts > CACHE_TTL;
      if (
        !isExpired &&
        cachedEntry.data &&
        Array.isArray(cachedEntry.data.results)
      ) {
        handleResults(filtros.type, cachedEntry.data.results, reset);
        setPage(currentPage + 1);
        setHasMore(currentPage < (cachedEntry.data.total_pages || 1));
        toggleLoading(reset, false);
        return;
      }
      cacheRef.current.delete(cacheKey);
    }

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const requestId = ++activeRequestRef.current;

    try {
      const raw = await getSearchMovie(
        buildParams(filtros.query, currentPage),
        filtros.type,
        controller.signal
      );

      if (requestId !== activeRequestRef.current) return;

      if (
        !raw ||
        raw.success === false ||
        !raw.data ||
        !Array.isArray(raw.data.results)
      ) {
        if (raw && raw.success === false) {
          clearLists();
          setHasMore(false);
        }
        toggleLoading(reset, false);
        return;
      }

      cacheRef.current.set(cacheKey, { data: raw.data, ts: Date.now() });
      handleResults(filtros.type, raw.data.results, reset);
      setPage(currentPage + 1);
      setHasMore(currentPage < (raw.data.total_pages || 1));
    } catch (error: any) {
      if (error?.name !== 'AbortError') {
        clearLists();
        setHasMore(false);
      }
    } finally {
      toggleLoading(reset, false);
    }
  };

  // ===== Handle results por tipo =====
  const handleResults = (type: string, results: any[], replace: boolean) => {
    switch (type) {
      case 'movie':
        applyResults(setListMovie, normalizeMovie, results, replace);
        break;
      case 'tv':
        applyResults(setListSerie, normalizeSerie, results, replace);
        break;
      case 'person':
        applyResults(setListPerson, normalizePerson, results, replace);
        break;
      case 'multi':
        applyResults(setListMulti, normalizeMulti, results, replace);
        break;
    }
  };

  const [debouncedSearch, cancelDebounce] = useDebounce(
    () => SearchMovieData(true),
    500
  );

  // Paginação (carregar mais)
  const fetchMore = async () => {
    if (loading || isFetchingMore || !hasMore) return;
    await SearchMovieData(false);
  };

  // Efeito: executa busca quando filtros mudam
  useEffect(() => {
    setLoading(true);
    setHasMore(true);
    setPage(parsePage(filtros.page));
    clearLists();
    debouncedSearch();
    return cancelDebounce;
  }, [filtros, debouncedSearch, cancelDebounce]);

  // Efeito: cancelar requisição ao desmontar
  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  return (
    <SearchContext.Provider
      value={{
        filtros,
        setFiltros,
        listMovie,
        listPerson,
        listSerie,
        listMulti,
        loading,
        isFetchingMore,
        fetchMore,
        hasMore,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
