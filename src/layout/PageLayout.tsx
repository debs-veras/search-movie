import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchPage from './components/SearchMovie';
import { useSearch } from '../context/FiltroContext';

export default function PageLayout() {
  const { filtros } = useSearch();

  return (
    <div className="min-h-screen flex flex-col relative bg-[#050505] text-gray-200 overflow-hidden min-w-[250px]">
      {/* Efeitos de Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Efeito de tela de cinema */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-geometric.png')]" />
      </div>

      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="flex-1 relative z-10">
        {filtros.query === '' || filtros.type === '' ? (
          <Outlet />
        ) : (
          <SearchPage />
        )}
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
