import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { getReleasedSoon } from "../../../services/movieRequest";
import ErrorSection from "../../../components/ErrorSection";
import SkeletonReleasedSoon from "./SkeletonReleasedSoon";

interface ReleasedSoon {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export default function ReleasedSoon() {
  const [releasedSoon, setReleasedSoon] = useState<ReleasedSoon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchReleasedSoon = async () => {
    setError(null);
    const response = await getReleasedSoon();
    setIsLoading(false);

    if (response.success) setReleasedSoon(response.data.results.slice(0, 5));
    else setError(response.data);
  };

  useEffect(() => {
    searchReleasedSoon();
  }, []);

  if (isLoading) {
    return <SkeletonReleasedSoon />;
  }

  if (error) {
    return <ErrorSection error={error} onRetry={searchReleasedSoon} />;
  }

  return (
    <section className="relative py-16 px-4 sm:px-8 bg-gradient-to-br from-[#000] to-[#111827] ">
      <div className="mx-auto">
        <div className="mb-4 xs:mb-10 text-white flex items-center gap-2 xs:gap-3 ">
          <span className="w-1.5 xs:w-2 h-6 xs:h-8 bg-green-500 rounded-full  " />
          <h1 className="text-xl sm:text-lg md:text-2xl font-extrabold">
            Próximos Lançamentos
          </h1>
        </div>
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {releasedSoon.map((filme) => (
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
                  className="w-full max-h-90 object-cover transition-transform group-hover:scale-110 group-hover:brightness-110 duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
              </div>

              <div className="absolute bottom-0 z-20 p-4 text-white">
                <h3 className="text-base xs:text-lg font-semibold mb-1 line-clamp-2 drop-shadow-md ">
                  {filme.title}
                </h3>
                <div className="text-xs xs:text-sm text-gray-300 flex items-center gap-2 drop-shadow-sm">
                  <FaStar className="text-yellow-400" />
                  {filme.vote_average.toFixed(1)} -{" "}
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
