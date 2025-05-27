import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BiCalendar, 
  BiStar, 
  BiTime, 
  BiX,
  BiLinkExternal
} from "react-icons/bi";
import { FiFilm, FiTv, FiPlay } from "react-icons/fi";

type MovieDetails = {
  Title: string;
  Year: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Poster: string;
  imdbRating?: string;
  imdbID: string;
  Type: string;
};

type MovieDetailsDrawerProps = {
  movie: MovieDetails;
  isOpen: boolean;
  onClose: () => void;
};

const MovieDetailsDrawer = ({ movie, isOpen, onClose }: MovieDetailsDrawerProps) => {
  // Impede scroll do body quando o drawer está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl overflow-y-auto bg-gray-900 shadow-2xl"
          >
            <div className="relative h-full">
              {/* Cabeçalho com imagem */}
              <div className="relative h-80 sm:h-96 w-full">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder-movie.jpg"}
                  alt={movie.Title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-black transition-colors"
                  aria-label="Fechar detalhes"
                >
                  <BiX size={24} className="text-white" />
                </button>
              </div>

              {/* Conteúdo */}
              <div className="p-6 space-y-6">
                {/* Título e Metadados */}
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <h1 className="text-2xl font-bold text-white">{movie.Title}</h1>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                      movie.Type === "movie" ? "bg-blue-600" : "bg-purple-600"
                    }`}>
                      {movie.Type === "movie" ? <FiFilm /> : <FiTv />}
                      {movie.Type}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-300">
                    <span className="flex items-center gap-1">
                      <BiCalendar /> {movie.Year}
                    </span>
                    {movie.Runtime && (
                      <span className="flex items-center gap-1">
                        <BiTime /> {movie.Runtime}
                      </span>
                    )}
                    {movie.imdbRating && (
                      <span className="flex items-center gap-1">
                        <BiStar className="text-yellow-400" /> {movie.imdbRating}/10
                      </span>
                    )}
                    {movie.Rated && (
                      <span className="border border-gray-600 px-2 rounded">
                        {movie.Rated}
                      </span>
                    )}
                  </div>
                </div>

                {/* Sinopse */}
                {movie.Plot && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Sinopse</h3>
                    <p className="text-gray-300">{movie.Plot}</p>
                  </div>
                )}

                {/* Detalhes em Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {movie.Genre && (
                    <div>
                      <h4 className="text-sm text-gray-400">Gênero</h4>
                      <p className="text-white">{movie.Genre}</p>
                    </div>
                  )}
                  
                  {movie.Director && (
                    <div>
                      <h4 className="text-sm text-gray-400">Direção</h4>
                      <p className="text-white">{movie.Director}</p>
                    </div>
                  )}

                  {movie.Writer && (
                    <div>
                      <h4 className="text-sm text-gray-400">Roteiro</h4>
                      <p className="text-white line-clamp-2">{movie.Writer}</p>
                    </div>
                  )}

                  {movie.Actors && (
                    <div className="sm:col-span-2">
                      <h4 className="text-sm text-gray-400">Elenco</h4>
                      <p className="text-white line-clamp-3">{movie.Actors}</p>
                    </div>
                  )}
                </div>

                {/* Botões de Ação */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white font-medium transition-colors flex-1">
                    <FiPlay size={18} /> Assistir Agora
                  </button>
                  
                  <a 
                    href={`https://www.imdb.com/title/${movie.imdbID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg text-white font-medium transition-colors flex-1"
                  >
                    <BiLinkExternal size={18} /> Ver no IMDB
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MovieDetailsDrawer;