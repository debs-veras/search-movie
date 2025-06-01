import { GiPopcorn } from "react-icons/gi";
import { useSearch } from "../../../context/FiltroContext";
import { BiSearch } from "react-icons/bi";

export default function Header() {
  const { filtros, setFiltros } = useSearch();
  return (
    <header className="relative z-10 p-6 border-b border-gray-900 bg-[#0a0a0a]/90 backdrop-blur-sm">
      <div className="container mx-auto flex flex-col md:flex-row gap-6 items-center">
        <div className="flex items-center gap-3 group">
          <div className="relative">
            <GiPopcorn
              size={32}
              className="text-red-600 group-hover:text-red-500 transition-colors"
            />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold">
            <span className="text-red-600">Movie</span>
            <span className="text-gray-300">Explore</span>
          </h1>
        </div>

        <div className="flex-1 w-full">
          <div className="relative">
            <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              value={filtros.query || ""}
              onChange={(e) => setFiltros({ ...filtros, query: e.target.value })}
              type="text"
              className="w-full p-3 pl-10 rounded-full bg-[#111111] text-white border border-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-gray-600 transition-all"
              placeholder="Buscar filmes, séries, animes..."
            />
          </div>
        </div>
      </div>
    </header>
  );
}
