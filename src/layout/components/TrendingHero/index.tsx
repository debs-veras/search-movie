import { useEffect, useState } from 'react';
import { FaFire, FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { getTrendingHero } from '../../../services/movieRequest';
import ErrorSection from '../../../components/ErrorSection';
import SkeletonTrendingHero from './SkeletonTrendingHero';

type TrendingHero = {
  id: number;
  title: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  overview: string;
  release_date: string;
};

export default function TrendingHero() {
  const [trendingMovies, setTrendingMovies] = useState<TrendingHero[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchTrendingHero = async () => {
    setError(null);
    const response = await getTrendingHero();
    setIsLoading(false);

    if (response.success) setTrendingMovies(response.data.results.slice(0, 10));
    else setError(response.data);
  };

  useEffect(() => {
    searchTrendingHero();
  }, []);

  if (isLoading) {
    return <SkeletonTrendingHero />;
  }

  if (error) {
    return <ErrorSection error={error} onRetry={searchTrendingHero} />;
  }

  return (
    <section className="relative w-full max-h-[600px] bg-gradient-to-br from-gray-900 to-black overflow-hidden">
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
      <div className="relative z-10 px-4 sm:px-8 pt-10 pb-14 ">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-xl sm:text-lg md:text-2xl font-extrabold text-white flex items-center gap-2 tracking-tight">
            <FaFire className="text-red-500 animate-pulse" />
            Tendências da Semana
          </h1>
        </div>
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
          {trendingMovies.map((movie, index) => (
            <SwiperSlide
              key={movie.id}
              className="rounded-xl overflow-hidden w-[180px] sm:w-[200px] md:w-[220px]"
            >
              <div className="relative group transition-transform duration-300 shadow-lg hover:scale-103">
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold z-10">
                  #{index + 1}
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto xs:h-[300px] sm:h-[350px] object-cover object-center rounded-xl"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end z-20">
                  <h3 className="text-white font-bold text-sm sm:text-base mb-1 line-clamp-1">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <FaStar className="text-xs" />
                      <span className="text-xs sm:text-sm font-semibold">
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-300">
                      {movie.release_date.split('-')[0]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mt-2 line-clamp-3">
                    {movie.overview}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
