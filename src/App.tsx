import { useEffect, useState } from "react";
import { getBuscaFilme } from "./services/searchMovie";
import { ListMovie } from "./types/listMovie.d";
import { Search, Popcorn } from "lucide-react";
import { SearchFormInputs } from "./types/searchFormInputs";
import { useForm } from "react-hook-form";
import useDebounce from "./utils/useDebounce";
import CardMovie from "./components/CardMovie";

function App() {
  const [listMovie, setListMovie] = useState<Array<ListMovie>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { register, watch, getValues } = useForm<SearchFormInputs>({
    defaultValues: {
      s: null,
      type: null,
      y: null,
    },
  });

  const buscaMovieData = async () => {
    setLoading(true);
    const filtros = getValues();
    const params = new URLSearchParams();

    if (filtros.s) params.append("s", filtros.s);
    if (filtros.type) params.append("type", filtros.type);
    if (filtros.y) params.append("y", filtros.y);
    const url = params.toString();

    try {
      const response = await getBuscaFilme(url);
      setListMovie(response.Search || []);
    } catch (err) {
      console.error(err);
      setListMovie([]);
    } finally {
      setLoading(false);
    }
  }

  const filtroDebounce = useDebounce(buscaMovieData, 1000);

  useEffect(() => {
    const subscription = watch(() => filtroDebounce());
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white flex flex-col">
      {/* Top Header */}
      <header className="p-6 border-b border-gray-800 bg-[#121212] shadow-md">
        <div className="flex gap-5 items-center flex-wrap ">
          <div className="text-2xl font-bold flex items-center gap-1">
            <Popcorn size={32} />
            MovieExplorer
          </div>

          <div className="flex sm:flex-row gap-4 w-full flex-wrap">
            {/* Campo de busca */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("s", { required: true })}
                type="text"
                className="w-full p-3 pl-10 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 placeholder-gray-500"
                placeholder="Busque um filme..."
              />
            </div>

            {/* Filtros */}
            <div className="flex gap-4 w-full sm:w-auto flex-wrap">
              <select
                {...register("type")}
                className="p-3 bg-zinc-800 rounded-lg border border-zinc-700 text-white"
                defaultValue=""
              >
                <option value="">Todos os tipos</option>
                <option value="movie">Filmes</option>
                <option value="series">Séries</option>
                <option value="episode">Episódios</option>
              </select>

              <input
                {...register("y")}
                type="number"
                placeholder="Ano"
                className="p-3 bg-zinc-800 rounded-lg border border-zinc-700 text-white"
                min={1900}
                max={2099}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex flex-1">
        {/* Lista de filmes */}
        <section className="flex-1 p-6">
          {loading ? (
            <div className="flex justify-center items-center h-40 text-2xl text-gray-500">
              <span>Carregando...</span>
            </div>
          ) : (
            <>
              {listMovie.length > 0 ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {listMovie.map((item) => (
                    <CardMovie key={item.imdbID} movie={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center text-xl text-gray-500 mt-12">
                  Nenhum filme encontrado
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
