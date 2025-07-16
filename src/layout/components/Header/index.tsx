import { BiSearch } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useSearch } from "../../../context/FiltroContext";
import Logo from "../../../components/Logo";
import MenuUser from "../../../components/MenuUser";

export default function Header() {
  const { filtros, setFiltros } = useSearch();
  const [searchActive, setSearchActive] = useState(false);

  const handleClearFilters = () => {
    setFiltros({ query: "", type: "" });
    setSearchActive(false);
  };

  useEffect(() => {
    if (filtros.query) setSearchActive(true);
  }, [filtros.query]);

  return (
    <header className="sticky top-0 z-50 p-4 border-b border-gray-800 bg-gradient-to-b from-black/95 to-black/80 backdrop-blur-md shadow-lg">
      <div className="mx-auto px-4">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between h-16">
          {/* Logo + Navigation */}
          <div className="flex items-center space-x-8">
            <Logo />

            <nav className="hidden lg:flex space-x-6">
              <button
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setFiltros({ ...filtros, type: "movie" })}
              >
                Filmes
              </button>
              <button
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setFiltros({ ...filtros, type: "tv" })}
              >
                Séries
              </button>
              <button
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setFiltros({ ...filtros, type: "person" })}
              >
                Artistas
              </button>
            </nav>
          </div>

          {/* Search + User */}
          <div className="flex items-center space-x-4">
            <div
              className={`relative transition-all duration-300 ${
                searchActive ? "w-64" : "w-48"
              }`}
            >
              <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                value={filtros.query || ""}
                onChange={(e) =>
                  setFiltros({ ...filtros, query: e.target.value })
                }
                onClick={() => setFiltros({ ...filtros, type: "multi" })}
                type="text"
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder={searchActive ? "Continue buscando..." : "Buscar"}
                onFocus={() => setSearchActive(true)}
              />
              {searchActive && (
                <button
                  onClick={handleClearFilters}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  ×
                </button>
              )}
            </div>

            <div className="relative">
              <MenuUser />
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSearchActive(!searchActive)}
              className="text-gray-300 hover:text-white"
            >
              <BiSearch size={20} />
            </button>
            <MenuUser />
          </div>
        </div>

        {/* Mobile Search */}
        {searchActive && (
          <div className="md:hidden pb-4">
            <div className="relative">
              <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                value={filtros.query || ""}
                onChange={(e) =>
                  setFiltros({ ...filtros, query: e.target.value })
                }
                type="text"
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full focus:outline-none"
                placeholder="Buscar filmes, séries..."
                autoFocus
              />
              <button
                onClick={handleClearFilters}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
