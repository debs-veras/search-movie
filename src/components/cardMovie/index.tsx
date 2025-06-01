import { BiCalendar } from "react-icons/bi";
import { ListMovie } from "../../types/listMovie.d";
import { FiFilm, FiTv } from "react-icons/fi";
import { BsPlay } from "react-icons/bs";
import { useState } from "react";
// import MovieDetailsDrawer from "../MovieDetailsDrawer";

type Props = {
  movie: ListMovie;
};

export default function CardMovie({ movie }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <div
        className="group relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.03] will-change-transform shadow-lg hover:shadow-xl hover:shadow-black/40"
        onClick={() => setIsDrawerOpen(true)}
      >
        {/* Container da imagem com overlay */}
        <div className="relative h-80 w-full">
          <img
            alt={movie?.name || movie?.title || "Movie Poster"}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={
              movie?.poster_path && movie.poster_path !== ""
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/picture.png"
            }
            loading="lazy"
          />

          {/* Overlay gradiente (semi-transparente sempre) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </div>

        {/* Informações do filme */}
        <div className="absolute z-1 bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/80 to-transparent">
          <h3 className="text-white text-lg font-bold line-clamp-2 leading-tight mb-1">
            {movie?.name || movie?.title || "Título Indisponível"}
          </h3>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <BiCalendar className="text-red-400" size={20} />
              <span>
                {movie?.first_air_date ||
                  movie?.release_date ||
                  "Data Indisponível"}
              </span>
            </div>

            <span
              className={`flex items-center gap-1 px-2 py-1 rounded-full font-semibold ${
                movie.media_type === "movie" ? "bg-blue-600" : "bg-purple-600"
              }`}
            >
              {movie.media_type === "movie" ? (
                <FiFilm size={14} />
              ) : (
                <FiTv size={14} />
              )}
              {movie.media_type}
            </span>
          </div>
        </div>

        {/* Botão de ação (hover) */}
        <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/30">
          <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-white font-medium transition-all transform translate-y-4 group-hover:translate-y-0 shadow-lg active:scale-95">
            <BsPlay size={18} className="flex-shrink-0" />
            <span>Assistir</span>
          </button>
        </div>
      </div>
      {/* <MovieDetailsDrawer
        movie={movie}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      /> */}
    </>
  );
}
