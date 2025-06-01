//Icons
import { TbVaccine } from "react-icons/tb";
import { FiFilm, FiZap } from "react-icons/fi";
import { FaClapperboard } from "react-icons/fa6";
import { LuAlignCenterVertical } from "react-icons/lu";

export default function HomePage() {

  return (
    <div className="container mx-auto p-6">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden border border-gray-900 bg-[linear-gradient(135deg,#0f0f0f_0%,#1a1a1a_100%)] mb-12">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-red-600">Explore</span> o Universo do
              Entretenimento
            </h2>
            <p className="text-lg text-gray-400 mb-8">
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
      </div>

      {/* Categorias Destaque */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <span className="w-2 h-8 bg-red-600 rounded-full" />
          <span>Categorias em Destaque</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <FaClapperboard size={24} />,
              title: "Clássicos do Cinema",
              count: "356",
              color: "red",
            },
            {
              icon: <TbVaccine size={24} />,
              title: "Séries Premiadas",
              count: "189",
              color: "blue",
            },
            {
              icon: <FiZap size={24} />,
              title: "Animes Populares",
              count: "142",
              color: "purple",
            },
            {
              icon: <LuAlignCenterVertical size={24} />,
              title: "Lançamentos",
              count: "87",
              color: "green",
            },
          ].map((cat) => (
            <div
              key={cat.title}
              className={`relative overflow-hidden rounded-xl border border-gray-900 p-6 group hover:border-${cat.color}-600 transition-all`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br from-${cat.color}-900/10 to-black/70 opacity-70`}
              />
              <div className="relative z-10">
                <div
                  className={`w-12 h-12 rounded-lg bg-${cat.color}-900/50 flex items-center justify-center mb-4 text-${cat.color}-400`}
                >
                  {cat.icon}
                </div>
                <h4 className="text-xl font-bold mb-1">{cat.title}</h4>
                <p className="text-sm text-gray-400">{cat.count} títulos</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gêneros */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <span className="w-2 h-8 bg-blue-600 rounded-full" />
          <span>Explore por Gênero</span>
        </h3>

        <div className="flex flex-wrap gap-3">
          {[
            "Ação",
            "Aventura",
            "Animação",
            "Comédia",
            "Crime",
            "Documentário",
            "Drama",
            "Fantasia",
            "Ficção Científica",
            "Terror",
            "Mistério",
            "Romance",
            "Suspense",
            "Anime",
          ].map((genre) => (
            <button
              key={genre}
              className="px-4 py-2 rounded-full bg-[#111111] border border-gray-800 hover:border-red-600 hover:text-white transition-all text-gray-400 hover:bg-[#1a1a1a]"
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
