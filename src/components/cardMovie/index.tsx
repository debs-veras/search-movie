import { BiCalendar } from "react-icons/bi";
import { ListMovie } from "../../types/listMovie.d";
import { FiFilm } from "react-icons/fi";
import { PlayIcon } from "lucide-react";

type Props = {
  movie: ListMovie;
};

export default function CardMovie({ movie }: Props) {
  return (
    <div className="group relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.03]">
      <div className="relative h-80">
        <img
          alt={movie.Title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={
            movie?.Poster && movie.Poster !== "N/A"
              ? movie.Poster
              : "/picture.png"
          }
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"></div>
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60">
        <h3 className="text-white text-lg font-bold line-clamp-3 drop-shadow-md">
          {movie.Title}
        </h3>
        <div className="text-gray-300 text-md mt-1 flex items-center justify-between gap-2 font-bold">
          <div className="flex items-center justify-center gap-1 ">
            <BiCalendar size={20} />
            {movie.Year}
          </div>
          <span className="flex items-center gap-1 bg-red-500 text-white px-2 py-0.5 rounded-full">
            <FiFilm size={14} />
            {movie.Type}
          </span>
        </div>
      </div>

      <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button className="flex items-center gap-2 bg-red-600 px-5 py-3 rounded-full text-white font-medium hover:bg-red-700 transition-all">
          <PlayIcon size={20} /> Assistir
        </button>
      </div>
    </div>
  );
}
