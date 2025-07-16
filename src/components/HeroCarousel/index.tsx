import { useEffect, useState, useCallback } from "react";
import { getSeriesByCategory } from "../../services/series";
import { FaPlay, FaPlus, FaInfoCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Series {
  id: number;
  backdrop_path: string;
  poster_path: string;
  logo_path?: string;
  name: string;
  vote_average: number;
  first_air_date?: string;
  origin_country?: string[];
  overview: string;
  genre_ids?: number[];
}

interface Genre {
  id: number;
  name: string;
}

const TRANSITION_DURATION = 10000; // 10 segundos

export default function HeroBanner() {
  const [series, setSeries] = useState<Series | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Busca de séries e gêneros
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/tv/list?api_key=c82e5a4a26d33a1e3ca752a5daa59d54&language=pt-BR"
        );
        if (!response.ok) throw new Error("Failed to fetch genres");
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (err) {
        console.error("Error fetching genres:", err);
        setError("Failed to load genres");
      }
    };

    fetchGenres();
    loadRandomSeries();
  }, []);

  const loadRandomSeries = useCallback(async () => {
    setIsLoading(true);
    setProgress(0);
    
    try {
      const data = await getSeriesByCategory("popular");
      if (!data.results) throw new Error("No series found");
      
      const validSeries = data.results.filter(
        (s: Series) => s.backdrop_path && s.poster_path
      );
      
      if (validSeries.length === 0) throw new Error("No valid series available");
      
      const random = validSeries[Math.floor(Math.random() * validSeries.length)];
      setSeries(random);
      setError(null);
    } catch (err) {
      console.error("Error loading series:", err);
      setError("Failed to load series");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Troca automática da série com tempo
  useEffect(() => {
    if (error) return;

    const interval = setInterval(() => {
      loadRandomSeries();
    }, TRANSITION_DURATION);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + (100 / (TRANSITION_DURATION / 100))));
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [loadRandomSeries, error]);

  const handleWatchNow = () => {
    if (series) {
      navigate(`/watch/series/${series.id}`);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).getFullYear();
  };

  const getCountryName = (countryCode?: string) => {
    if (!countryCode) return "";
    // Aqui você poderia implementar uma lógica para converter código de país para nome
    return countryCode;
  };

  if (error) {
    return (
      <div className="w-full h-[85vh] flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Error loading content</h2>
          <p className="mb-4">{error}</p>
          <button 
            onClick={loadRandomSeries}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[85vh] overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background com animação de transição */}
      <AnimatePresence>
        {series && (
          <motion.div
            key={series.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <div
              className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out ${
                isHovered ? "scale-105 opacity-80" : "scale-100 opacity-100"
              }`}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${series.backdrop_path})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20 z-10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conteúdo */}
      <div className="relative z-20 h-full flex flex-col justify-end px-6 md:px-16 py-12">
        {isLoading && !series ? (
          <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl">
            <div className="animate-pulse">
              <div className="h-12 w-64 bg-gray-700 rounded mb-6"></div>
              <div className="h-4 w-32 bg-gray-700 rounded mb-4"></div>
              <div className="h-24 w-full bg-gray-700 rounded mb-6"></div>
              <div className="flex gap-4 mb-6">
                <div className="h-12 w-32 bg-gray-700 rounded-full"></div>
                <div className="h-12 w-32 bg-gray-700 rounded-full"></div>
              </div>
            </div>
          </div>
        ) : series ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl lg:max-w-3xl xl:max-w-4xl"
          >
            {series.logo_path ? (
              <img
                src={`https://image.tmdb.org/t/p/original${series.logo_path}`}
                alt={series.name}
                className="mb-6 max-h-24 object-contain drop-shadow-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-xl">
                {series.name}
              </h1>
            )}

            {/* Detalhes */}
            <div className="flex flex-wrap gap-3 items-center text-sm text-white/80 mb-5">
              <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                ⭐ {series.vote_average.toFixed(1)}
              </span>
              {series.first_air_date && (
                <span>{formatDate(series.first_air_date)}</span>
              )}
              {series.origin_country?.[0] && (
                <span>{getCountryName(series.origin_country[0])}</span>
              )}
              <span className="border border-white/30 px-2 py-1 rounded-full">HD</span>
              <span className="bg-white/10 px-2 py-1 rounded-full">16+</span>
            </div>

            {/* Descrição */}
            <p className="text-white/90 text-base md:text-lg leading-relaxed line-clamp-3 mb-6">
              {series.overview || "No description available."}
            </p>

            {/* Ações */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={handleWatchNow}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                <FaPlay /> Assistir Agora
              </button>
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95">
                <FaPlus /> Minha Lista
              </button>
              <button className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95">
                <FaInfoCircle className="text-white" />
              </button>
            </div>

            {/* Gêneros */}
            {series.genre_ids && (
              <div className="flex flex-wrap gap-2">
                {series.genre_ids.slice(0, 3).map((id) => {
                  const genre = genres.find((g) => g.id === id);
                  return genre ? (
                    <span
                      key={id}
                      className="bg-white/10 border border-white/10 text-white/80 text-xs px-3 py-1 rounded-full"
                    >
                      {genre.name}
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </motion.div>
        ) : null}
      </div>

      {/* Barra de progresso animada */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 z-30 bg-white/10">
        <motion.div
          className="h-full bg-red-600"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Controles de navegação */}
      {isHovered && series && (
        <div className="absolute z-20 top-1/2 left-0 right-0 flex justify-between px-4 transform -translate-y-1/2">
          <button
            onClick={loadRandomSeries}
            className="p-3 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-md border border-white/20 transition-all hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={loadRandomSeries}
            className="p-3 bg-black/50 hover:bg-black/70 rounded-full backdrop-blur-md border border-white/20 transition-all hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}