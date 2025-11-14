import { BiSearch } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { useSearch } from '../../../context/FiltroContext';
import Logo from '../../../components/Logo';
import MenuUser from '../../../components/MenuUser';
import { useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { filtros, setFiltros } = useSearch();
  const [searchActive, setSearchActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    if (searchActive) setMobileMenuOpen(false);
  }, [searchActive]);

  // Animations
  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: 'afterChildren',
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

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
            <Logo />
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
        <div className="md:hidden flex items-center justify-between h-16">
          {/* Menu Hamburger */}
          <motion.button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              setSearchActive(false);
            }}
            className="text-gray-300 hover:text-white p-2"
            whileTap={{ scale: 0.9 }}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <IoClose size={24} className="text-red-500" />
            ) : (
              <FiMenu size={24} />
            )}
          </motion.button>

          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Logo />
          </motion.div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => {
                setSearchActive(!searchActive);
                setMobileMenuOpen(false);
              }}
              className="text-gray-300 hover:text-white p-2"
              whileTap={{ scale: 0.9 }}
              aria-label="Buscar"
            >
              <BiSearch size={20} />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
            >
              <motion.nav className="flex flex-col space-y-3 mt-4 bg-gray-900/90 rounded-lg p-4 backdrop-blur-sm">
                <MenuUser />
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Search */}
        <AnimatePresence>
          {searchActive && (
            <motion.div
              className="md:hidden overflow-hidden"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={searchVariants}
            >
              <div className="relative mt-4">
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
                  className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-full focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="Buscar filmes, séries..."
                  autoFocus
                />
                {filtros.query && (
                  <motion.button
                    onClick={handleClearFilters}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    whileHover={{ scale: 1.2 }}
                  >
                    ×
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
