import { TbVaccine } from 'react-icons/tb';
import { FiZap } from 'react-icons/fi';
import { FaClapperboard } from 'react-icons/fa6';
import { LuAlignCenterVertical } from 'react-icons/lu';
import TrendingHero from '../../layout/components/TrendingHero';
import Banner from '../../layout/components/Banner';
import ReleasedSoon from '../../layout/components/ReleasedSoon';
import { useEffect } from 'react';
import { useSearch } from '../../context/FiltroContext';
import CollectionsSection from '../../layout/components/CollectionsSection';

export default function HomePage() {
  const { setFiltros } = useSearch();

  useEffect(() => {
    setFiltros({ query: '', type: 'multi' });
  }, [setFiltros]);

  return (
    <div className="max-w-[2080px] mx-auto">
      {/* Hero Section */}
      <Banner />
      <TrendingHero />
      <ReleasedSoon />
      <CollectionsSection />
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
              title: 'Clássicos do Cinema',
              count: '356',
              color: 'red',
            },
            {
              icon: <TbVaccine size={24} />,
              title: 'Séries Premiadas',
              count: '189',
              color: 'blue',
            },
            {
              icon: <FiZap size={24} />,
              title: 'Animes Populares',
              count: '142',
              color: 'purple',
            },
            {
              icon: <LuAlignCenterVertical size={24} />,
              title: 'Lançamentos',
              count: '87',
              color: 'green',
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
            'Ação',
            'Aventura',
            'Animação',
            'Comédia',
            'Crime',
            'Documentário',
            'Drama',
            'Fantasia',
            'Ficção Científica',
            'Terror',
            'Mistério',
            'Romance',
            'Suspense',
            'Anime',
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
