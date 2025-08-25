import { GiFilmProjector } from 'react-icons/gi';
export default function Logo() {
  return (
    <div
      aria-label="Logo"
      className="flex items-center gap-3 group justify-center relative cursor-pointer"
    >
      <div className="relative">
        <GiFilmProjector
          size={36}
          className="text-red-500 group-hover:text-red-400 transition-colors"
        />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
      </div>
      <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-500 xs:text-3xl">
        Movie<span className="text-white">Explore</span>
      </div>
    </div>
  );
}
