import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

interface Filme {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const API_KEY = "c82e5a4a26d33a1e3ca752a5daa59d54";
const BASE_URL = "https://api.themoviedb.org/3";

export default function LancamentosRecentes() {
  const [filmes, setFilmes] = useState<Filme[]>([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/now_playing`, {
        params: {
          api_key: API_KEY,
          language: "pt-BR",
          region: "BR",
        },
      })
      .then((res) => {
        const principais = res.data.results
          .sort((a: Filme, b: Filme) => b.vote_average - a.vote_average)
          .slice(0, 5);
        setFilmes(principais);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="relative py-16 px-4 sm:px-8 bg-gradient-to-br from-[#000] to-[#111827]">
      <div className="mx-auto">
        <h3 className="text-3xl font-bold mb-10 text-white flex items-center gap-3">
          <span className="w-2 h-8 bg-green-500 rounded-full" />
          <span>Lançamentos da Semana</span>
        </h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filmes.map((filme) => (
            <a
              key={filme.id}
              href={`https://www.themoviedb.org/movie/${filme.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl overflow-hidden border border-white/10 backdrop-blur-md bg-white/5 transition-transform hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                  alt={filme.title}
                  className="w-full h-80 object-cover transition-transform group-hover:scale-110 group-hover:brightness-110 duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
              </div>

              <div className="absolute bottom-0 z-20 p-4 text-white">
                <h4 className="text-lg font-semibold mb-1 line-clamp-2 drop-shadow-md">
                  {filme.title}
                </h4>
                <div className="text-sm text-gray-300 flex items-center gap-2 drop-shadow-sm">
                  <FaStar className="text-yellow-400" />
                  {filme.vote_average.toFixed(1)} •{" "}
                  {new Date(filme.release_date).toLocaleDateString()}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
