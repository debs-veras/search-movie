import { GiPopcorn } from 'react-icons/gi';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950  flex flex-col items-center justify-center p-4">
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <GiPopcorn className="text-4xl text-white" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
        Carregando...
      </h2>
    </div>
  );
}
