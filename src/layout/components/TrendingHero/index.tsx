import { useEffect, useState } from 'react';
import { FaFire, FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

type TMDBMovie = {
  id: number;
  title: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  overview: string;
  release_date: string;
};

type TMDBResponse = {
  results: TMDBMovie[];
};

const TrendingHero = () => {
  const [trendingMovies, setTrendingMovies] = useState<TMDBMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=c82e5a4a26d33a1e3ca752a5daa59d54&language=pt-BR`
        );
        if (!response.ok) throw new Error('Erro ao buscar filmes em alta');
        const data: TMDBResponse = await response.json();
        setTrendingMovies(data.results.slice(0, 10));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-[80vh]">Carregando...</div>;
  if (error) return <div className="flex items-center justify-center h-[80vh] text-red-500">Erro: {error}</div>;

  return (
    <section className="relative w-full max-h-[600px] bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      {/* Background dinâmico */}
      {trendingMovies[0]?.backdrop_path && (
        <div className="absolute inset-0 z-0">
          <img
            src={`https://image.tmdb.org/t/p/original${trendingMovies[0].backdrop_path}`}
            alt={trendingMovies[0].title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>
      )}

      {/* Conteúdo */}
      <div className="relative z-10 px-4 pt-10 pb-14 sm:px-8 md:px-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-8 bg-red-600 rounded-full animate-pulse" />
          <span className="text-xl sm:text-lg md:text-2xl font-extrabold text-white flex items-center gap-2 tracking-tight">
            <FaFire className="text-red-500 animate-pulse" />
            Tendências da Semana
          </span>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={16}
          slidesPerView={'auto'}
          className="w-full"
          breakpoints={{
            0: { slidesPerView: 1.3 },
            480: { slidesPerView: 2.2 },
            768: { slidesPerView: 3.2 },
            1024: { slidesPerView: 4.2 },
            1280: { slidesPerView: 5 },
          }}
        >
          {trendingMovies.map((movie, index) =>
            movie.poster_path ? (
              <SwiperSlide key={movie.id} className="rounded-xl overflow-hidden w-[180px] sm:w-[200px] md:w-[220px]">
                <div className="relative group transition-transform duration-300 shadow-lg hover:scale-103">
                  {/* Ranking */}
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold z-10">
                    #{index + 1}
                  </div>

                  {/* Imagem */}
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto xxs:h-[300px] sm:h-[350px] object-cover object-center rounded-xl"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end z-20">
                    <h3 className="text-white font-bold text-sm sm:text-base mb-1 line-clamp-1">{movie.title}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <FaStar className="text-xs" />
                        <span className="text-xs sm:text-sm font-semibold">{movie.vote_average.toFixed(1)}</span>
                      </div>
                      <span className="text-xs text-gray-300">{movie.release_date.split('-')[0]}</span>
                    </div>
                    <p className="text-xs text-gray-300 mt-2 line-clamp-2">{movie.overview}</p>
                  </div>
                </div>
              </SwiperSlide>
            ) : null
          )}
        </Swiper>
      </div>

    </section>
  );
};

export default TrendingHero;
