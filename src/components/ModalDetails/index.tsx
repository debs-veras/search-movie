import { useEffect, useRef } from 'react';
import {
  AiOutlineClose,
  AiOutlineStar,
  AiOutlineCalendar,
  AiOutlineGlobal,
  AiOutlineLink,
} from 'react-icons/ai';
import { BiUser, BiMoviePlay, BiTv } from 'react-icons/bi';
import { BsPeople } from 'react-icons/bs';
import { FaFire } from 'react-icons/fa';

type ModalDetailsProps = {
  open: boolean;
  onClose: () => void;
  data: any | null;
};

// Mapeamento base dos gêneros — pode ser expandido ou atualizado
const GENRE_MAP: Record<number, string> = {
  28: 'Ação',
  12: 'Aventura',
  16: 'Animação',
  35: 'Comédia',
  80: 'Crime',
  99: 'Documentário',
  18: 'Drama',
  10751: 'Família',
  14: 'Fantasia',
  36: 'História',
  27: 'Terror',
  10402: 'Música',
  9648: 'Mistério',
  10749: 'Romance',
  878: 'Ficção científica',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'Guerra',
  37: 'Faroeste',
};

export default function ModalDetails({
  open,
  onClose,
  data,
}: ModalDetailsProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Fecha com tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  // Fecha ao clicar fora
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!open || !data) return null;

  const {
    id,
    title,
    subtitle,
    overview,
    image,
    type,
    vote_average,
    vote_count,
    popularity,
    original_language,
    release_date,
    first_air_date,
    origin_country,
    genres,
    genre_ids,
  } = data;

  const iconType =
    type === 'movie' ? (
      <BiMoviePlay className="text-red-500" size={24} />
    ) : type === 'tv' ? (
      <BiTv className="text-purple-500" size={24} />
    ) : (
      <BiUser className="text-green-500" size={24} />
    );

  const year = release_date?.slice(0, 4) || first_air_date?.slice(0, 4) || '—';
  const tmdbUrl = `https://www.themoviedb.org/${type}/${id}`;

  // Resolve gêneros
  const genreList =
    genres ||
    genre_ids?.map((id: number) => ({
      id,
      name: GENRE_MAP[id] || `Gênero ${id}`,
    }));

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-gray-900 text-white rounded-2xl shadow-2xl max-w-3xl w-full relative overflow-hidden animate-fadeIn">
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-800 transition"
        >
          <AiOutlineClose size={22} />
        </button>

        {/* Imagem */}
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-64 object-cover border-b border-gray-800"
          />
        )}

        {/* Conteúdo */}
        <div className="p-6 space-y-4">
          {/* Cabeçalho */}
          <div className="flex items-center gap-3">
            {iconType}
            <div>
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="text-gray-400 text-sm">
                {type === 'movie'
                  ? 'Filme'
                  : type === 'tv'
                    ? 'Série'
                    : 'Pessoa'}
              </p>
            </div>
          </div>

          {/* Informações principais */}
          <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <AiOutlineCalendar size={16} />
              <span>{year}</span>
            </div>

            {original_language && (
              <div className="flex items-center gap-2">
                <AiOutlineGlobal size={16} />
                <span className="uppercase">{original_language}</span>
              </div>
            )}

            {origin_country && origin_country.length > 0 && (
              <div className="flex items-center gap-2">
                <BsPeople size={16} />
                <span>{origin_country.join(', ')}</span>
              </div>
            )}

            {vote_average != null && (
              <div className="flex items-center gap-2">
                <AiOutlineStar className="text-yellow-400" size={16} />
                <span>
                  {vote_average.toFixed(1)} ({vote_count} votos)
                </span>
              </div>
            )}

            {popularity && (
              <div className="flex items-center gap-2">
                <FaFire className="text-orange-500" size={16} />
                <span>Popularidade: {Math.round(popularity)}</span>
              </div>
            )}
          </div>

          {/* Gêneros */}
          {genreList && genreList.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {genreList.map((g: any) => (
                <span
                  key={g.id || g.name}
                  className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                >
                  {g.name}
                </span>
              ))}
            </div>
          )}

          {/* Descrição */}
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            {overview || 'Nenhuma descrição disponível para este título.'}
          </p>

          {/* Extra (departamento / função) */}
          {subtitle && (
            <p className="text-gray-400 text-sm">
              <strong>Área de atuação:</strong> {subtitle}
            </p>
          )}

          {/* Ações */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-full bg-gray-800 hover:bg-gray-700 transition"
            >
              Fechar
            </button>
            <a
              href={tmdbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm rounded-full bg-red-600 hover:bg-red-700 transition flex items-center gap-2"
            >
              <AiOutlineLink size={16} />
              Ver no TMDB
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
