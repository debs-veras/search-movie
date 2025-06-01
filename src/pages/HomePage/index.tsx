import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useDebounce from "../../hooks/useDebounce";
//Services
import { getBuscaFilme } from "../../services/searchMovieRequest";
//Icons
import { GiPopcorn } from "react-icons/gi";
import { BiSearch } from "react-icons/bi";
import { TbVaccine } from "react-icons/tb";
import { FiFilm, FiZap } from "react-icons/fi";
import { FaClapperboard } from "react-icons/fa6";
import { LuAlignCenterVertical } from "react-icons/lu";
//Types
import { SearchFormInputs } from "../../types/searchFormInputs.d";
import { ListMovie } from "../../types/listMovie.d";
//Components
import CardMovie from "../../components/CardMovie";

// import {
//   Search,
//   Popcorn,
//   Clapperboard,
//   Tv,
//   Zap,
//   AlignCenterVertical,
//   Film,
// } from "lucide-react";

export default function HomePage() {
  const [listMovie, setListMovie] = useState<Array<ListMovie> | null>(null);
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
      setListMovie(null);
    } finally {
      setLoading(false);
    }
  };

  // const fetchMovies = async () => {
  //   const { s } = getValues();

  //   if (!s) return;

  //   setLoading(true);
  //   try {
  //     const results = await getBuscaFilmeTmdb(s);
  //     console.log("Resultados da busca:", results);
  //   } catch (err) {
  //     console.error("Erro ao buscar filmes", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const debounceFetch = useDebounce(fetchMovies, 1000);

  // useEffect(() => {
  //   const subscription = watch(() => debounceFetch());
  //   return () => subscription.unsubscribe();
  // }, [watch, debounceFetch]);

  const filtroDebounce = useDebounce(buscaMovieData, 1000);
  useEffect(() => {
    // fetchMovies();
    const subscription = watch(() => filtroDebounce());
    return () => subscription.unsubscribe();
  }, [filtroDebounce, watch]);

  return (
    <div className="min-h-screen flex flex-col relative bg-[#050505] text-gray-200 overflow-hidden">
      {/* Efeitos de Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Efeito de tela de cinema */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-geometric.png')]" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-gray-900 bg-[#0a0a0a]/90 backdrop-blur-sm">
        <div className="container mx-auto flex flex-col md:flex-row gap-6 items-center">
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <GiPopcorn
                size={32}
                className="text-red-600 group-hover:text-red-500 transition-colors"
              />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold">
              <span className="text-red-600">Movie</span>
              <span className="text-gray-300">Explore</span>
            </h1>
          </div>

          <div className="flex-1 w-full">
            <div className="relative">
              <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                {...register("s")}
                type="text"
                className="w-full p-3 pl-10 rounded-full bg-[#111111] text-white border border-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-gray-600 transition-all"
                placeholder="Buscar filmes, séries, animes..."
              />
            </div>
          </div>

          <div className="flex gap-3">
            <select
              {...register("type")}
              className="px-3 py-2 bg-[#111111] rounded-lg border border-gray-800 text-gray-300 focus:ring-2 focus:ring-red-600"
            >
              <option value="">Todos</option>
              <option value="movie">Filmes</option>
              <option value="series">Séries</option>
              <option value="anime">Animes</option>
            </select>

            <input
              {...register("y")}
              type="number"
              placeholder="Ano"
              className="px-3 py-2 bg-[#111111] rounded-lg border border-gray-800 text-gray-300 w-20 focus:ring-2 focus:ring-red-600"
              min={1900}
              max={2099}
            />
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 relative z-10">
        {listMovie === null || getValues().s === "" ? (
          <div className="container mx-auto p-6">
            {/* Hero Section */}
            <div className="relative rounded-xl overflow-hidden border border-gray-900 bg-[linear-gradient(135deg,#0f0f0f_0%,#1a1a1a_100%)] mb-12">
              {/* Luzes laterais do cinema */}
              <div className="absolute top-0 left-0 h-full w-16 z-10">
                <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-yellow-500 to-transparent opacity-30" />
                <div className="absolute top-1/4 left-2 h-16 w-1 bg-yellow-400 rounded-full blur-sm opacity-70" />
                <div className="absolute top-1/2 left-2 h-16 w-1 bg-yellow-400 rounded-full blur-sm opacity-70" />
                <div className="absolute top-3/4 left-2 h-16 w-1 bg-yellow-400 rounded-full blur-sm opacity-70" />
              </div>
              <div className="absolute top-0 right-0 h-full w-16 z-10">
                <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-yellow-500 to-transparent opacity-30" />
                <div className="absolute top-1/4 right-2 h-16 w-1 bg-yellow-400 rounded-full blur-sm opacity-70" />
                <div className="absolute top-1/2 right-2 h-16 w-1 bg-yellow-400 rounded-full blur-sm opacity-70" />
                <div className="absolute top-3/4 right-2 h-16 w-1 bg-yellow-400 rounded-full blur-sm opacity-70" />
              </div>

              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre-v2.png')] opacity-30" />
              {/* Efeito de filme rodando */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="animate-film-roll">
                  <FiFilm size={300} className="text-gray-400" />
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black z-10" />

              <div className="relative z-10 p-12 text-center">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    <span className="text-red-600">Explore</span> o Universo do
                    Entretenimento
                  </h2>
                  <p className="text-lg text-gray-400 mb-8">
                    Descubra filmes épicos, séries cativantes e animes
                    emocionantes em um só lugar
                  </p>

                  <div className="flex flex-wrap justify-center gap-4">
                    <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg hover:shadow-red-600/30">
                      <FaClapperboard size={20} />
                      Comece a Explorar
                    </button>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-4 bg-[repeating-linear-gradient(to_right,black_0px,black_10px,white_20px,white_20px)] z-30" />

                <div className="absolute top-0 left-0 right-0 h-4 bg-[repeating-linear-gradient(to_right,black_0px,black_10px,white_20px,white_20px)] z-30" />
              </div>
            </div>

            {/* Categorias Destaque */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-red-600 rounded-full" />
                <span>Categorias em Destaque</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: <FaClapperboard size={24} />,
                    title: "Clássicos do Cinema",
                    count: "356",
                    color: "red",
                  },
                  {
                    icon: <TbVaccine size={24} />,
                    title: "Séries Premiadas",
                    count: "189",
                    color: "blue",
                  },
                  {
                    icon: <FiZap size={24} />,
                    title: "Animes Populares",
                    count: "142",
                    color: "purple",
                  },
                  {
                    icon: <LuAlignCenterVertical size={24} />,
                    title: "Lançamentos",
                    count: "87",
                    color: "green",
                  },
                ].map((cat) => (
                  <div
                    key={cat.title}
                    className={`relative overflow-hidden rounded-xl border border-gray-900 p-6 group hover:border-${cat.color}-600 transition-all`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-${cat.color}-900/10 to-black/70 opacity-70`}
                    />
                    <div className="relative z-10">
                      <div
                        className={`w-12 h-12 rounded-lg bg-${cat.color}-900/50 flex items-center justify-center mb-4 text-${cat.color}-400`}
                      >
                        {cat.icon}
                      </div>
                      <h4 className="text-xl font-bold mb-1">{cat.title}</h4>
                      <p className="text-sm text-gray-400">
                        {cat.count} títulos
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gêneros */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-600 rounded-full" />
                <span>Explore por Gênero</span>
              </h3>

              <div className="flex flex-wrap gap-3">
                {[
                  "Ação",
                  "Aventura",
                  "Animação",
                  "Comédia",
                  "Crime",
                  "Documentário",
                  "Drama",
                  "Fantasia",
                  "Ficção Científica",
                  "Terror",
                  "Mistério",
                  "Romance",
                  "Suspense",
                  "Anime",
                ].map((genre) => (
                  <button
                    key={genre}
                    className="px-4 py-2 rounded-full bg-[#111111] border border-gray-800 hover:border-red-600 hover:text-white transition-all text-gray-400 hover:bg-[#1a1a1a]"
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <section className="container mx-auto p-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="relative w-16 h-16 mb-4">
                  <div className="absolute inset-0 border-4 border-transparent border-t-red-600 border-r-red-600 rounded-full animate-spin" />
                  <GiPopcorn
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600"
                    size={24}
                  />
                </div>
                <p className="text-gray-400">Buscando em nosso acervo...</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-8 w-1 bg-red-600 rounded-full" />
                  <h3 className="text-2xl font-bold">Resultados</h3>
                  <div className="flex-1 h-px bg-gray-800" />
                </div>

                {listMovie && listMovie.length > 0 ? (
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {listMovie.map((item) => (
                      <CardMovie key={item.imdbID} movie={item} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
                    <BiSearch size={48} className="text-gray-600" />
                    <h2 className="text-2xl text-gray-400">
                      Nenhum resultado encontrado
                    </h2>
                    <p className="text-gray-600 max-w-md">
                      Tente ajustar seus filtros ou buscar por termos diferentes
                    </p>
                  </div>
                )}
              </>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-gray-900 bg-[#0a0a0a]/90 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <GiPopcorn size={24} className="text-red-600" />
              <span className="text-xl font-bold">MovieExplore</span>
            </div>

            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                Filmes
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                Séries
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-600 transition-colors"
              >
                Animes
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                Sobre
              </a>
            </div>

            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Movie Explore - Todos os direitos
              reservados
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
