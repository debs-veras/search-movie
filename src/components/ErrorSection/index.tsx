import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

interface ErrorSectionProps {
  error: string;
  onRetry: () => void;
  className?: string;
  retryButtonText?: string;
}

export default function ErrorSection({
  error,
  onRetry,
  className = '',
  retryButtonText = 'Tentar Novamente',
}: ErrorSectionProps) {
  return (
    <section className="relative w-full max-h-[600px] bg-gradient-to-br from-gray-900 to-black overflow-hidden py-16 px-4">
      <div
        className={`flex flex-col items-center justify-center py-16 px-4 rounded-xl bg-red-900/20 border border-red-700/30 ${className}`}
      >
        <FaExclamationTriangle className="text-red-400 text-4xl mb-4" />
        <p className="text-red-200 text-center mb-6 max-w-md">{error}</p>
        <button
          onClick={onRetry}
          className="flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-full transition-colors"
        >
          <FaRedo className="text-sm" />
          {retryButtonText}
        </button>
      </div>
    </section>
  );
}
