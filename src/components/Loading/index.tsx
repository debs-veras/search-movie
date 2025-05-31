// components/LoadingFilmes.tsx
import { FaFilm } from 'react-icons/fa';

type Props = {
  className?: string | null;
  fill?: string | null;
  texto?: string;
};

export default function Loading({ className, fill, texto }: Props) {
  return (
    <div className={`relative flex flex-1 ${className || ''} p-4 transition duration-200`}>
      <div className="flex flex-1 flex-col items-center justify-center">
        <FaFilm
          className="animate-pulse text-red-600"
          size={48}
          style={{ fill: fill || 'currentColor' }}
        />
        {texto && (
          <span className="mt-6 mb-8 block text-md font-medium text-primary-900 text-white">
            {texto}
          </span>
        )}
      </div>
    </div>
  );
}
