import { BiSearch } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { useSearch } from '../../../context/FiltroContext';
import Logo from '../../../components/Logo';
import MenuUser from '../../../components/MenuUser';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaX } from 'react-icons/fa6';

export default function Header() {
  const { filtros, setFiltros } = useSearch();
  const [searchActive, setSearchActive] = useState(false);
  const navigate = useNavigate();

  const handleClearFilters = () => {
    setFiltros({ query: '', type: '' });
    setSearchActive(false);
    navigate('/');
  };

  // redireciona automaticamente para /search ou /
  useEffect(() => {
    if (filtros.query?.trim() !== '') {
      navigate('/search');
    } else {
      navigate('/');
    }
  }, [filtros.query, navigate]);

  // mantém o campo de busca ativo enquanto há query
  useEffect(() => {
    if (filtros.query) setSearchActive(true);
    else setSearchActive(false);
  }, [filtros.query]);

  const searchVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' },
  };

  return (
    <header className="sticky top-0 z-50 p-4 border-b border-gray-800 bg-gradient-to-b from-black/95 to-black/80 backdrop-blur-md shadow-lg">
      <div className="mx-auto px-4">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between h-16">
          {/* Logo + Navigation */}
          <div className="flex items-center space-x-8">
            <Logo homeLink />
          </div>

          {/* Search + User */}
          <div className="flex items-center space-x-4">
            <motion.div
              className={`relative transition-all duration-300 ${
                searchActive ? 'w-64' : 'w-48'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                value={filtros.query || ''}
                onChange={(e) =>
                  setFiltros({
                    ...filtros,
                    query: e.target.value,
                  })
                }
                type="text"
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder={searchActive ? 'Continue buscando...' : 'Buscar'}
                onFocus={() => setSearchActive(true)}
              />
              {searchActive && filtros.query && (
                <motion.button
                  onClick={handleClearFilters}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  whileHover={{ scale: 1.2 }}
                >
                  ×
                </motion.button>
              )}
            </motion.div>

            <div className="relative">
              <MenuUser />
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden min-h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-between gap-1 flex-wrap"
          >
            <Logo homeLink />
            <MenuUser />
          </motion.div>
          {/* Icons */}
          {!searchActive && (
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => {
                  setSearchActive(!searchActive);
                }}
                className="text-gray-300 hover:text-white pt-4"
                whileTap={{ scale: 0.9 }}
                aria-label="Buscar"
              >
                <BiSearch size={20} />
              </motion.button>
            </div>
          )}
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {searchActive && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={searchVariants}
              className="md:hidden"
            >
              <div className="relative">
                <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  value={filtros.query || ''}
                  onChange={(e) =>
                    setFiltros({
                      ...filtros,
                      query: e.target.value,
                    })
                  }
                  type="text"
                  className="w-full bg-gray-800 text-white pl-12 pr-10 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="Buscar filmes, séries..."
                  autoFocus
                />
                <button
                  onClick={handleClearFilters}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
                  aria-label="Limpar busca"
                >
                  <FaX size={10} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
