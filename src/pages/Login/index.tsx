import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  GiFilmProjector,
  GiFilmStrip,
  GiClapperboard,
  GiTicket,
  GiDirectorChair,
  GiFilmSpool,
} from "react-icons/gi";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
  FaFilm,
  FaStar,
  FaTheaterMasks,
  FaPhotoVideo,
  FaVideo,
} from "react-icons/fa";
import {
  MdLocalMovies,
  MdMovieFilter,
  MdMovie,
  MdOutlineSlowMotionVideo,
} from "react-icons/md";
import {
  BsStars,
  BsCameraReels,
  BsFilm,
  BsTicketPerforated,
  BsCollectionPlay,
} from "react-icons/bs";
import { BiMoviePlay, BiCameraMovie } from "react-icons/bi";
import { IoMdFilm } from "react-icons/io";
import useToastLoading from "../../hooks/useToastLoading";
import {
  userAuthRequestToken,
  userCreateSession,
  userValidateLoginSession,
} from "../../services/authRequest";

const loginSchema = z.object({
  username: z.string().min(1, "Usuário é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

const movieQuotes = [
  "May the Force be with you. - Star Wars",
  "Here's looking at you, kid. - Casablanca",
  "You're gonna need a bigger boat. - Jaws",
  "My precious. - The Lord of the Rings",
  "Just keep swimming. - Finding Nemo",
  "I'll be back. - The Terminator",
];

const genres = [
  { name: "Ação", icon: <FaStar className="text-red-500" /> },
  { name: "Drama", icon: <MdMovieFilter className="text-blue-400" /> },
  { name: "Comédia", icon: <FaTheaterMasks className="text-yellow-400" /> },
  { name: "Ficção", icon: <BsStars className="text-green-400" /> },
  { name: "Terror", icon: <GiClapperboard className="text-purple-500" /> },
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
  const [currentQuote, setCurrentQuote] = useState("");
  const toastLoading = useToastLoading();

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

  const handleLogin = handleSubmit(async (dados) => {
    setLoading(true);
    toastLoading({ mensagem: "Verificando usuário" });
    let response: any;
    response = await userAuthRequestToken();
    if (response.success) {
      response = await userValidateLoginSession({
        username: dados.username,
        password: dados.password,
        request_token: response.request_token,
      });
      if (response.success) {
        response = await userCreateSession(response.request_token);
        if (response.success) {
          localStorage.setItem("@session_id", response.session_id);
          toastLoading({
            mensagem: "Login realizado com sucesso",
            tipo: "success",
            onClose: () => navigate("/"),
          });
        }
      }
    }

    if (!response.success) {
      toastLoading({
        mensagem: response.status_message,
        tipo: response.tipo,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black relative flex items-center justify-center px-4 overflow-hidden">
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
                  ? "text-amber-400"
                  : i % 3 === 1
                  ? "text-red-400"
                  : "text-blue-400"
              } opacity-10 text-4xl animate-float`}
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

      {/* Formulário */}
      <div className="relative z-10 p-8 rounded-xl shadow-2xl bg-zinc-900/90 backdrop-blur-md border border-zinc-700 max-w-md w-full transform transition-all duration-500 hover:shadow-amber-500/20">
        {/* Cabeçalho */}
        <div className="flex items-center gap-3 group justify-center mb-8 relative">
          <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-amber-500/10 blur-xl"></div>
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-red-500/10 blur-xl"></div>

          <div className="relative">
            <GiFilmProjector
              size={36}
              className="text-amber-500 group-hover:text-amber-400 transition-colors"
            />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-red-500">
            Movie<span className="text-white">Verse</span>
          </h1>
        </div>

        {/* Citação de filme */}
        <div className="text-center mb-6 text-sm text-amber-300/70 italic transition-opacity duration-1000">
          <BsCameraReels className="inline mr-2" /> "{currentQuote}"
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Campos do formulário */}

          <div className="relative group">
            <label className="text-sm text-zinc-300 flex items-center">
              <FaUser className="mr-2 text-blue-400" /> Usuário
            </label>
            <div className="flex items-center mt-1 bg-zinc-800/70 rounded-lg px-3 border border-zinc-700 group-hover:border-blue-500 transition-all duration-300">
              <input
                type="text"
                {...register("username")}
                className="w-full p-3 bg-transparent text-white placeholder-zinc-500 focus:outline-none"
                placeholder="Seu nome de usuário"
              />
            </div>
            {errors.username && (
              <p className="text-amber-400 text-xs mt-1 animate-pulse flex items-center">
                <MdLocalMovies className="mr-1" /> {errors.username.message}
              </p>
            )}
          </div>

          <div className="relative group">
            <label className="text-sm text-zinc-300 flex items-center">
              <FaLock className="mr-2 text-red-400" /> Senha
            </label>
            <div className="flex items-center mt-1 bg-zinc-800/70 rounded-lg px-3 border border-zinc-700 group-hover:border-red-500 transition-all duration-300">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full p-3 bg-transparent text-white placeholder-zinc-500 focus:outline-none"
                placeholder="Sua senha secreta"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-zinc-400 hover:text-white ml-2 focus:outline-none transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-amber-400 text-xs mt-1 animate-pulse flex items-center">
                <FaFilm className="mr-1" /> {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-600 to-red-700 hover:from-amber-500 hover:to-red-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-amber-500/30 disabled:opacity-50 group flex items-center justify-center"
          >
            {loading ? <>Acessando o catálogo...</> : <>Acessar o Cinema</>}
          </button>
        </form>

        {/* Rodapé */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-4 mb-3">
            {genres.map((genre, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="group-hover:scale-125 transition-transform duration-300">
                  {genre.icon}
                </div>
                <span className="text-xs text-zinc-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {genre.name}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-zinc-500 flex items-center justify-center">
            <IoMdFilm className="mr-1" /> Sua jornada cinematográfica começa
            aqui
          </p>
        </div>
      </div>
    </div>
  );
}
