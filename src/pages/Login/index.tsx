import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import {
  GiFilmStrip,
  GiClapperboard,
  GiTicket,
  GiDirectorChair,
  GiFilmSpool,
} from 'react-icons/gi';
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
  FaFilm,
  FaPhotoVideo,
  FaVideo,
} from 'react-icons/fa';
import {
  MdLocalMovies,
  MdMovie,
  MdOutlineSlowMotionVideo,
} from 'react-icons/md';
import {
  BsCameraReels,
  BsFilm,
  BsTicketPerforated,
  BsCollectionPlay,
} from 'react-icons/bs';
import { BiMoviePlay, BiCameraMovie } from 'react-icons/bi';
import { IoMdFilm } from 'react-icons/io';
import useToastLoading from '../../hooks/useToastLoading';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/Logo';

const loginSchema = z.object({
  username: z.string().min(1, 'Usuário é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

const movieQuotes = [
  'May the Force be with you. - Star Wars',
  "Here's looking at you, kid. - Casablanca",
  "You're gonna need a bigger boat. - Jaws",
  'My precious. - The Lord of the Rings',
  'Just keep swimming. - Finding Nemo',
  "I'll be back. - The Terminator",
];

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [currentQuote, setCurrentQuote] = useState('');
  const toastLoading = useToastLoading();
  const { login } = useAuth();

  const handleLogin = handleSubmit(async (data) => {
    setLoading(true);
    toastLoading({ mensagem: 'Verificando usuário...' });
    const response = await login(data.username, data.password);

    if (response.success) {
      toastLoading({
        mensagem: 'Login realizado com sucesso',
        tipo: 'success',
        onClose: () => navigate('/'),
      });
    } else {
      toastLoading({
        mensagem: response.message,
        tipo: 'error',
      });
    }

    setLoading(false);
  });

  const floatingIcons = [
    GiFilmStrip,
    GiClapperboard,
    GiTicket,
    GiDirectorChair,
    GiFilmSpool,
    FaFilm,
    FaPhotoVideo,
    FaVideo,
    MdMovie,
    MdOutlineSlowMotionVideo,
    BsFilm,
    BsTicketPerforated,
    BsCollectionPlay,
    BiMoviePlay,
    BiCameraMovie,
    IoMdFilm,
  ];

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote(
        movieQuotes[Math.floor(Math.random() * movieQuotes.length)]
      );
    }, 5000);

    return () => {
      clearInterval(quoteInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 relative flex items-center justify-center px-4 overflow-hidden">
      {/* Elementos flutuantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => {
          const Icon =
            floatingIcons[Math.floor(Math.random() * floatingIcons.length)];
          return (
            <div
              key={i}
              className={`absolute ${
                i % 3 === 0
                  ? 'text-red-400'
                  : i % 3 === 1
                    ? 'text-blue-400'
                    : 'text-green-400'
              } opacity-15 text-4xl animate-float`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${10 + Math.random() * 20}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              <Icon />
            </div>
          );
        })}
      </div>

      {/* Efeito de luz de cinema */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-red-500/10 to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-blue-500/10 to-transparent opacity-30"></div>

      {/* Formulário */}
      <div className="relative z-10 p-8 rounded-xl shadow-2xl bg-gray-900/80 backdrop-blur-md border border-gray-700/50 max-w-md w-full transform transition-all duration-500 hover:shadow-red-500/10">
        {/* Efeitos de luz no card */}
        <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-red-500/10 blur-xl"></div>
        <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-blue-500/10 blur-xl"></div>
        {/* Cabeçalho */}
        <Logo />

        {/* Citação de filme */}
        <div className="text-center mb-6 text-sm text-gray-300/80 italic transition-opacity duration-1000 font-light">
          <BsCameraReels className="inline mr-2 text-red-400" /> "{currentQuote}
          "
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Campo de usuário */}
          <div className="relative group">
            <label className="text-sm text-gray-300 flex items-center mb-2">
              <FaUser className="mr-2 text-blue-400" /> Usuário
            </label>
            <div className="flex items-center bg-gray-800/50 rounded-lg px-3 border border-gray-700/50 group-hover:border-blue-500/50 transition-all duration-300 shadow-inner">
              <input
                type="text"
                {...register('username')}
                className="w-full p-3 bg-transparent text-white placeholder-gray-500 focus:outline-none"
                placeholder="Seu nome de usuário"
              />
            </div>
            {errors.username && (
              <p className="text-red-400 text-xs mt-2 animate-pulse flex items-center">
                <MdLocalMovies className="mr-1" /> {errors.username.message}
              </p>
            )}
          </div>

          {/* Campo de senha */}
          <div className="relative group">
            <label className="text-sm text-gray-300 flex items-center mb-2">
              <FaLock className="mr-2 text-red-400" /> Senha
            </label>
            <div className="flex items-center bg-gray-800/50 rounded-lg px-3 border border-gray-700/50 group-hover:border-red-500/50 transition-all duration-300 shadow-inner">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                className="w-full p-3 bg-transparent text-white placeholder-gray-500 focus:outline-none"
                placeholder="Sua senha secreta"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-white ml-2 focus:outline-none transition-colors p-2"
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-2 animate-pulse flex items-center">
                <FaFilm className="mr-1" /> {errors.password.message}
              </p>
            )}
          </div>

          {/* Botão de login */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-500 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center relative overflow-hidden"
          >
            <span className="relative z-10">
              {loading ? 'Acessando o catálogo...' : 'Acessar'}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-white/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </form>

        {/* Rodapé */}
        <div className="mt-8 text-center space-y-3">
          <p className="text-xs text-gray-500 flex items-center justify-center">
            Sua jornada cinematográfica começa aqui
          </p>
          <a
            href="https://www.themoviedb.org/signup"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            Criar conta no TMDB
          </a>
        </div>
      </div>
    </div>
  );
}
