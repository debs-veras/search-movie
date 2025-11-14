import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

export default function PageLayout() {
  return (
    <div className="min-h-screen flex flex-col relative bg-[#050505] text-gray-200 overflow-hidden min-w-[250px]">
      {/* Efeito de background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-geometric.png')]" />
      </div>

      {/* Cabeçalho */}
      <Header />

      {/* Conteúdo principal */}
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>

      {/* Rodapé */}
      <Footer />
    </div>
  );
}
