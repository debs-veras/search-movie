import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Series } from "../../../types/series";

interface RecommendationsSectionProps {
  seriesId: number; // ID da série atual para buscar recomendações
}

export default function RecommendationsSection({ seriesId }: RecommendationsSectionProps) {
  const [recommendations, setRecommendations] = useState<Series[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/recommendations?api_key=${import.meta.env.VITE_API_KEY}&language=pt-BR&page=1`
        );
        
        if (!response.ok) throw new Error("Falha ao buscar recomendações");
        
        const data = await response.json();
        setRecommendations(data.results.filter((s: Series) => s.poster_path));
        setError(null);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError("Não foi possível carregar as recomendações");
      } finally {
        setIsLoading(false);
      }
    };

    if (seriesId) fetchRecommendations();
  }, [seriesId]);

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById("recommendations-container");
    if (container) {
      const scrollAmount = direction === "left" ? -500 : 500;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  if (error) return null; // Não mostra a seção se houver erro

  return (
    <section className="px-4 md:px-16 mt-8 mb-12 relative">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Você também pode gostar</h2>
      
      {isLoading ? (
        <div className="flex gap-4 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="min-w-[150px] md:min-w-[200px] h-[225px] md:h-[300px] bg-gray-800 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : recommendations.length > 0 ? (
        <div className="relative group">
          {/* Botão de navegação esquerdo */}
          <button
            onClick={() => scroll("left")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${scrollPosition <= 0 ? 'invisible' : ''}`}
            aria-label="Scroll left"
          >
            <FaChevronLeft className="text-white text-xl" />
          </button>

          {/* Carrossel de recomendações */}
          <div
            id="recommendations-container"
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-2"
          >
            {recommendations.map((serie) => (
              <motion.div
                key={serie.id}
                whileHover={{ scale: 1.05 }}
                className="min-w-[150px] md:min-w-[200px] flex-shrink-0 relative cursor-pointer"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                  alt={serie.name}
                  className="w-full h-[225px] md:h-[300px] object-cover rounded-lg hover:opacity-80 transition-opacity"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent rounded-b-lg">
                  <h3 className="text-white font-semibold text-sm truncate">{serie.name}</h3>
                  <div className="flex items-center text-xs text-white/80">
                    <span className="text-yellow-400 mr-1">⭐</span>
                    {serie.vote_average.toFixed(1)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Botão de navegação direito */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll right"
          >
            <FaChevronRight className="text-white text-xl" />
          </button>
        </div>
      ) : null}
    </section>
  );
}