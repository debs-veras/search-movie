import { FaClapperboard } from "react-icons/fa6";
import { FiFilm } from "react-icons/fi";

export default function Banner() {
  return (
    <section className="relative overflow-hidden border border-gray-900 bg-[linear-gradient(135deg,#0f0f0f_0%,#1a1a1a_100%)] mb-6">
      {/* Luzes laterais do cinema */}
      <div className="absolute top-0 left-0 h-full w-16 z-10">
        <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-yellow-500 to-transparent opacity-30" />
        <div className="absolute top-1/4 left-2 h-16 w-1 bg-yellow-400 rounded-full blur-sm opacity-70" />
        <div className="absolute top-1/2 left-2 h-16 w-1 bg-yellow-400 rounded-full blur-sm opacity-70" />
        <div className="absolute top-3/4 left-2 h-16 w-1 bg-yellow-400 rounded-full blur-sm opacity-70" />
      </div>
      <div className="absolute top-0 right-0 h-full w-16 z-10">
        <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-yellow-500 to-transparent opacity-30" />
        <div className="absolute top-1/4 right-2 h-16 w-1 bg-yellow-400 rounded-full blur-sm opacity-70" />
        <div className="absolute top-1/2 right-2 h-16 w-1 bg-yellow-400 rounded-full blur-sm opacity-70" />
        <div className="absolute top-3/4 right-2 h-16 w-1 bg-yellow-400 rounded-full blur-sm opacity-70" />
      </div>

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre-v2.png')] opacity-30" />
      {/* Efeito de filme rodando */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="animate-film-roll">
          <FiFilm size={300} className="text-gray-400" />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black z-10" />

      <div className="relative z-10 p-12 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="xxs:text-3xl xs:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-red-600">Explore</span> o Universo do
            Entretenimento
          </div>
          <p className="text-gray-400 mb-8 text-sm xxs:text-base xs:text-lg">
            Descubra filmes épicos, séries cativantes e animes emocionantes em
            um só lugar
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg hover:shadow-red-600/30">
              <FaClapperboard size={20} />
              Comece a Explorar
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-4 bg-[repeating-linear-gradient(to_right,black_0px,black_10px,white_20px,white_20px)] z-30" />

        <div className="absolute top-0 left-0 right-0 h-4 bg-[repeating-linear-gradient(to_right,black_0px,black_10px,white_20px,white_20px)] z-30" />
      </div>
    </section>
  );
}
