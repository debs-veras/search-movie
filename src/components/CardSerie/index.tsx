import { useState } from 'react';
import { SerieResult } from '../../types/listResultsData.d';
import { BiCalendar } from 'react-icons/bi';
import { FiTv } from 'react-icons/fi';
import { API_URL_IMG_TMDB } from '../../constants/api';
import CardActionButton from '../CardActionButton';
import CardImageLoader from '../CardImageLoader';

type Props = {
  serie: SerieResult;
};

export default function CardSerie({ serie }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imageUrl = `${API_URL_IMG_TMDB}w500${serie.poster_path}`;

  return (
    <div
      className="group relative rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.03]"
      title={serie.name}
    >
      <div className="relative h-80 w-full">
        {/* Loading Spinner */}
        {isLoading && <CardImageLoader />}

        {/* Imagem */}
        <img
          src={hasError ? 'serie.png' : imageUrl}
          alt={serie.name}
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

        {/* Gradiente escuro */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        {/* Informações */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 z-10 flex items-center justify-between">
          <div className="text-white">
            <h3 className="text-lg font-bold leading-tight line-clamp-2 mb-1">
              {serie.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <BiCalendar className="text-red-400" size={18} />
              {serie.first_air_date || 'Data indisponível'}
            </div>
          </div>

          <span className="bg-purple-600 text-white rounded-full p-2 shadow-md">
            <FiTv size={18} />
          </span>
        </div>

        {/* Botão Ver Detalhes */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/30 backdrop-blur-sm z-20">
          <CardActionButton
            text="Ver Detalhes"
            color="purple"
            onClick={() => console.log('Assistir clicado')}
          />
        </div>
      </div>
    </div>
  );
}
