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
};

const SearchContext = createContext({} as SearchContextType);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [filtros, setFiltros] = useState<SearchFormInputs>({
    query: "",
    // type: null,
    // y: null,
  });
  const [listMovie, setListMovie] = useState<ListMovie[] | null>(null);
  const [loading, setLoading] = useState(false);

  const buscaMovieData = async () => {
    if (!filtros.query) return setListMovie(null);
    setLoading(true);

    const params = new URLSearchParams();
    if (filtros.query) params.append("query", filtros.query);
    // if (debouncedFiltros.type) params.append("type", debouncedFiltros.type);
    // if (debouncedFiltros.y) params.append("y", debouncedFiltros.y);
    try {
      const response = await getBuscaFilme(params.toString());
      console.log("Response from API:", response); 
      setListMovie(response.Search || []);
    } catch (error) {
      console.error(error);
      setListMovie(null);
    } finally {
      setLoading(false);
    }
  };

  const filtroDebounce = useDebounce(buscaMovieData, 1000);

  // useEffect(() => {
  //   const subscription = watch(() => filtroDebounce());
  //   return () => subscription.unsubscribe();
  // }, [filtroDebounce, watch]);

  useEffect(() => {
    filtroDebounce();
  }, [filtros]);

  return (
    <SearchContext.Provider value={{ filtros, setFiltros, listMovie, loading }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
