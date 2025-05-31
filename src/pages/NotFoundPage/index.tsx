import { FaFilm } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8 text-center">
      <FaFilm size={64} className="text-red-600 mb-6 animate-bounce" />
      <h1 className="text-5xl font-bold mb-4">404 - Filme não encontrado</h1>
      <p className="text-lg text-gray-300 mb-6 max-w-md">
        Parece que esse filme saiu de cartaz ou nunca existiu...
      </p>
      <Link
        to="/"
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
      >
        Voltar à busca
      </Link>
      <p className="mt-8 text-sm text-gray-500 italic">Powered by TMDB</p>
    </div>
  );
}
