import { useState } from 'react';
import { FiFilm } from 'react-icons/fi';
import { BiCalendar } from 'react-icons/bi';
import { API_URL_IMG_TMDB } from '../../constants/api';
import { MovieResult } from '../../types/listResultsData.d';
import CardActionButton from '../CardActionButton';
import CardImageLoader from '../CardImageLoader';

type Props = {
  movie: MovieResult;
};

export default function CardMovie({ movie }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const imageUrl = `${API_URL_IMG_TMDB}w500${movie.poster_path}`;
  return (
    <div
      className="group relative rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.03]"
      title={movie.title}
    >
      <div className="relative h-80 w-full">
        {/* Loading Spinner */}
        {isLoading && <CardImageLoader />}

        {/* Imagem */}
        <img
          src={hasError ? 'movie.png' : imageUrl}
          alt={`Poster de ${movie.title}`}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          loading="lazy"
        />

        {/* Overlay de gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Informações do filme */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 z-10 flex items-center justify-between">
          <div className="text-white">
            <h3 className="text-lg font-bold leading-tight line-clamp-2 mb-1">
              {movie.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <BiCalendar className="text-red-400" size={18} />
              {movie.release_date || 'Data indisponível'}
            </div>
          </div>

          <span className="bg-blue-600 text-white rounded-full p-2 shadow-md">
            <FiFilm size={18} />
          </span>
        </div>

        {/* Ação no hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/30 backdrop-blur-sm z-20">
          <CardActionButton
            text="Ver Detalhes"
            color="red"
            onClick={() => console.log('Assistir clicado')}
          />
        </div>
      </div>
    </div>
  );
}
