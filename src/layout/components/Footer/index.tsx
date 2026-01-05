import { GiPopcorn } from 'react-icons/gi';

export default function Footer() {
  return (
    <footer className="relative z-1 py-8 border-t border-gray-900 bg-[#0a0a0a]/90 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <GiPopcorn size={24} className="text-red-600" />
            <span className="text-xl font-bold">MovieExplore</span>
          </div>

          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Movie Explore - Todos os direitos
            reservados
          </div>
        </div>
      </div>
    </footer>
  );
}
