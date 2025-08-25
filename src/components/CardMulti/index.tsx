import { FiFilm, FiTv } from 'react-icons/fi';
import { BiUserCircle } from 'react-icons/bi';
import { useState } from 'react';
import { API_URL_IMG_TMDB } from '../../constants/api';
import { MultiResult } from '../../types/listResultsData.d';
import CardImageLoader from '../CardImageLoader';
import CardActionButton from '../CardActionButton';

type Props = {
  item: MultiResult;
};

export default function CardMulti({ item }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const isPerson = item.media_type === 'person';
  const isMovie = item.media_type === 'movie';
  const isTv = item.media_type === 'tv';

  const imagePath = isPerson ? item.profile_path : item.poster_path;
  const imageDefault = isPerson
    ? 'avatar.png'
    : isMovie
      ? 'movie.png'
      : 'serie.png';
  const imageUrl = `${API_URL_IMG_TMDB}w500${imagePath}`;

  const title = item.title || item.name || 'Título Indisponível';
  const subtitle =
    item.release_date ||
    item.first_air_date ||
    item.known_for_department ||
    'Data Indisponível';

  return (
    <div className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:shadow-black/30 transition-transform duration-300 hover:scale-[1.03] bg-black">
      <div className="relative h-72 md:h-80 w-full">
        {/* Loader */}
        {isLoading && <CardImageLoader />}

        {/* Imagem */}
        <img
          src={hasError ? imageDefault : imageUrl}
          alt={title}
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

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/40 backdrop-blur-sm" />

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 z-10 flex items-center justify-between">
          <div className="text-white">
            <h3 className="text-lg font-semibold leading-tight line-clamp-2 mb-1">
              {title}
            </h3>
            <p className="text-sm text-gray-300 drop-shadow-sm">{subtitle}</p>
          </div>

          {/* Ícone do tipo */}
          <span
            className={`rounded-full p-2 shadow-md text-white ${
              isMovie ? 'bg-blue-600' : isTv ? 'bg-purple-600' : 'bg-green-600'
            }`}
          >
            {isMovie ? (
              <FiFilm size={18} />
            ) : isTv ? (
              <FiTv size={18} />
            ) : (
              <BiUserCircle size={18} />
            )}
          </span>
        </div>

        {/* Botão de ação */}
        <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/30">
          <CardActionButton
            text="Ver Detalhes"
            color={isMovie ? 'blue' : isTv ? 'purple' : 'green'}
            onClick={() => console.log(`Ver detalhes de ${title}`)}
          />
        </div>
      </div>
    </div>
  );
}
