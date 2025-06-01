import { createContext, useContext, useState, useEffect } from "react";
import { ListMovie } from "../types/listMovie.d";
import { SearchFormInputs } from "../types/searchFormInputs.d";
import { getBuscaFilme } from "../services/searchMovieRequest";
import useDebounce from "../hooks/useDebounce";

type SearchContextType = {
  filtros: SearchFormInputs;
  setFiltros: (val: SearchFormInputs) => void;
  listMovie: ListMovie[] | null;
  loading: boolean;
  isFetchingMore: boolean;
  fetchMore: () => Promise<void>;
  hasMore: boolean;
};

const SearchContext = createContext({} as SearchContextType);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [filtros, setFiltros] = useState<SearchFormInputs>({ query: "" });
  const [listMovie, setListMovie] = useState<ListMovie[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const buscaMovieData = async (resetPage = true) => {
    if (!filtros.query) {
      setListMovie(null);
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
      const response = await getBuscaFilme(params.toString());
      const results = response.results || [];
      const totalPages = response.total_pages || 1;

      setListMovie((prev) =>
        resetPage ? results : [...(prev || []), ...results]
      );
      setPage(currentPage + 1);
      setHasMore(currentPage < totalPages);
    } catch (error) {
      console.error(error);
      setListMovie(null);
      setHasMore(false);
    } finally {
      if (resetPage) setLoading(false);
      else setIsFetchingMore(false);
    }
  };

  const filtroDebounce = useDebounce(() => buscaMovieData(true), 1000);

  useEffect(() => {
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
