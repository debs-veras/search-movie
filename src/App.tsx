import { useEffect, useState } from "react";
import { postUploadArquivo } from "./services/searchMovie";
import { ListMovie } from "./types/listMovie.d";
import { Play, Calendar, Film } from "lucide-react";

function App() {
  const [listMovie, setListMovie] = useState<Array<ListMovie>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const fetchMovieData = async (query: string) => {
    setLoading(true);
    try {
      const data = await postUploadArquivo(`s=${query}`);
      setListMovie(data.Search || []);
    } catch (err) {
      console.error(err);
      setListMovie([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search) fetchMovieData(search);
  }, [search]);

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8 relative">
      {/* Barra de pesquisa */}
      <div className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-center animate-pulse opacity-30" style={{ backgroundImage: "url('/particula.jpg')" }}></div>
      <div className="flex justify-center mb-12 relative z-10">
        <input
          type="text"
          className="w-full max-w-md p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500 transition-all"
          placeholder="Busque um filme..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && fetchMovieData(search)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40 text-2xl text-gray-500">
          <span>Carregando...</span> 
        </div>
      ) : (
        <div>
          {listMovie.length > 0 ? (
            <div className="grid grid-cols-1 justify-items-center items-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {listMovie.map((item) => (
                <div
                  key={item.imdbID}
                  className="group relative rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-xl sm:w-full w-4/5 sm:h-full h-auto"
                >
                  {/* Imagem do filme */}
                  <img
                    className="w-full h-80 sm:h-72 md:h-64 lg:h-80 xl:h-96 object-cover brightness-75 group-hover:brightness-50 transition-all duration-300"
                    src={item?.Poster && item.Poster !== "N/A" ? item.Poster : "/picture.png"}
                    alt={item.Title}
                  />

                  {/* Fundo escuro para melhorar contraste */}
                  <div className="absolute inset-0 group-hover:opacity-100 transition-all duration-300"></div>

                  {/* Informações do filme */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 opacity-100">
                    <span  className="text-white lg:text-xl font-semibold leading-tight drop-shadow-lg">
                      {item.Title}
                    </span>
                    <p className="text-gray-300 text-sm mt-2 flex gap-2 items-center flex-wrap">
                      <span className="flex gap-1 items-center">
                        <Calendar size={16} className="text-gray-400" />
                        {item.Year}
                      </span>
                      |
                      <span className="flex gap-1 items-center bg-red-500 font-semibold px-2 py-1 rounded-full ml-2">
                        <Film size={16} className="text-white" />
                        {item.Type}
                      </span>
                    </p>
                  </div>

                  {/* Botão Assistir no centro */}
                  <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="flex items-center gap-3 bg-red-600 px-8 py-4 rounded-xl text-white text-lg font-semibold hover:bg-red-700 transition-all focus:ring-2 focus:ring-white sm:px-6 sm:py-3">
                      <Play size={24} /> Assistir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-xl text-gray-500 mt-12">
              {search && "Nenhum filme encontrado"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
