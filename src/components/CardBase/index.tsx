import { useState } from 'react';
import CardImageLoader from '../CardImageLoader';
import CardActionButton from '../CardActionButton';
import { FiFilm, FiTv } from 'react-icons/fi';
import { BiUserCircle } from 'react-icons/bi';

type ImageUrls = {
  src: string;
  srcSet?: string;
  sizes?: string;
  fallback: string;
};

type Props = {
  title: string;
  subtitle?: string;
  image: ImageUrls;
  type?: 'movie' | 'tv' | 'person' | 'multi';
  heightClass?: string;
  actionColor?: 'red' | 'blue' | 'purple' | 'green';
  onAction?: () => void;
};

export default function CardBase({
  title,
  subtitle,
  image,
  type = 'multi',
  heightClass = 'h-80',
  actionColor = 'red',
  onAction,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const icon =
    type === 'movie' ? (
      <FiFilm size={18} />
    ) : type === 'tv' ? (
      <FiTv size={18} />
    ) : (
      <BiUserCircle size={18} />
    );

  return (
    <div className="group relative rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.03]">
      <div className={`relative ${heightClass} w-full`}>
        {isLoading && <CardImageLoader />}

        <img
          src={hasError ? image.fallback : image.src}
          srcSet={hasError ? undefined : image.srcSet}
          sizes={image.sizes}
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
          decoding="async"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 z-10 flex items-center justify-between">
          <div className="text-white">
            <h3 className="text-lg font-bold leading-tight line-clamp-2 mb-1">
              {title}
            </h3>
            {subtitle && (
              <div className="text-sm text-gray-300">{subtitle}</div>
            )}
          </div>

          <span
            className={`rounded-full p-2 shadow-md text-white ${
              type === 'movie'
                ? 'bg-blue-600'
                : type === 'tv'
                  ? 'bg-purple-600'
                  : 'bg-green-600'
            }`}
          >
            {icon}
          </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/30">
          <CardActionButton
            text="Ver Detalhes"
            color={actionColor}
            onClick={onAction || (() => undefined)}
          />
        </div>
      </div>
    </div>
  );
}
