import { createContext, useContext, useState, useEffect } from "react";
import {
  MovieResult,
  MultiResult,
  PersonResult,
  SerieResult,
} from "../types/listResultsData.d";
import { SearchFormInputs } from "../types/searchFormInputs.d";
import { getBuscaFilme } from "../services/searchMovieRequest";
import useDebounce from "../hooks/useDebounce";

type SearchContextType = {
  filtros: SearchFormInputs;
  setFiltros: (val: SearchFormInputs) => void;
  listMovie: MovieResult[] | null;
  listPerson?: PersonResult[] | null;
  listSerie?: SerieResult[] | null;
  listMulti?: MultiResult[] | null;
  loading: boolean;
  isFetchingMore: boolean;
  fetchMore: () => Promise<void>;
  hasMore: boolean;
};

const SearchContext = createContext({} as SearchContextType);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [filtros, setFiltros] = useState<SearchFormInputs>({
    query: "",
    type: "",
  });
  const [listMovie, setListMovie] = useState<MovieResult[] | null>(null);
  const [listPerson, setListPerson] = useState<PersonResult[] | null>(null);
  const [listSerie, setListSerie] = useState<SerieResult[] | null>(null);
  const [listMulti, setListMulti] = useState<MultiResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const buscaMovieData = async (resetPage = true) => {
    if (!filtros.query || !filtros.type) {
      setHasMore(false);
      return;
    }

    const currentPage = resetPage ? 1 : page;
    if (resetPage) setLoading(true);
    else setIsFetchingMore(true);

    const params = new URLSearchParams();
    params.append("query", filtros.query);
    params.append("page", String(currentPage));

    try {
      const response = await getBuscaFilme(
        params.toString(),
        filtros.type ?? ""
      );

      const results = response.results || [];
      const totalPages = response.total_pages || 1;

      if (filtros.type === "person")
        setListPerson((prev) =>
          resetPage ? results : [...(prev || []), ...results]
        );
      if (filtros.type === "tv") {
        setListSerie((prev) =>
          resetPage ? results : [...(prev || []), ...results]
        );
      }
      if (filtros.type === "movie")
        setListMovie((prev) =>
          resetPage ? results : [...(prev || []), ...results]
        );
      if (filtros.type === "multi") {
        setListMulti((prev) =>
          resetPage ? results : [...(prev || []), ...results]
        );
      }

      setPage(currentPage + 1);
      setHasMore(currentPage < totalPages);
    } catch (error) {
      console.error(error);
      setListMovie(null);
      setListPerson(null);
      setListSerie(null);
      setListMulti(null);
      setHasMore(false);
    } finally {
      if (resetPage) setLoading(false);
      else setIsFetchingMore(false);
    }
  };

  const filtroDebounce = useDebounce(() => buscaMovieData(true), 1000);

  useEffect(() => {
    setListMovie(null);
    setListPerson(null);
    setListSerie(null);
    setListMulti(null);
    filtroDebounce();
  }, [filtros]);

  const fetchMore = async () => {
    await buscaMovieData(false);
  };

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
        fetchMore,
        hasMore,
        isFetchingMore,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
