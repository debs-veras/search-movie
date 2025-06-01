import { useState } from "react";
import { Auth } from "../../types/auth.d";
import { useForm } from "react-hook-form";
import {
  userAuthRequestToken,
  userCreateSession,
} from "../../services/authRequest";
import useToastLoading from "../../hooks/useToastLoading";
import { useNavigate } from "react-router-dom";
import { GiPopcorn } from "react-icons/gi";
import { FaKey, FaLock, FaUser } from "react-icons/fa";
import Botao from "../../components/Button";

export default function Login() {
  const { register, handleSubmit } = useForm<Auth>();
  const toastLoading = useToastLoading();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    toastLoading({ mensagem: "Verificando usuário" });
    let usuarioLogin: Auth = {} as Auth;
    let response: any;
    let request: any;

    await handleSubmit(
      (dados) => (usuarioLogin = { ...usuarioLogin, ...dados })
    )();
    
    request = () => userAuthRequestToken(usuarioLogin.api_key);
    response = await request();
    if (response.success) {
      localStorage.setItem("@api_key", usuarioLogin.api_key);
      localStorage.setItem("@admin_token", response.request_token);
      request = () =>
        userCreateSession({
          username: usuarioLogin.username,
          password: usuarioLogin.password,
          request_token: response.request_token,
        });
      response = await request();
      if (response.success) {
        toastLoading({
          mensagem: "Login realizado com sucesso",
          tipo: "success",
          onClose: () => navigate("/"),
        });
      }
    }

    if (!response.success) {
      toastLoading({
        mensagem: response.status_message,
        tipo: response.tipo,
      });
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen bg-black bg-cover bg-center relative flex items-center justify-center px-4"
      style={{ backgroundImage: `url('/img/bg-movies.jpg')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-900/90 to-black/70 backdrop-blur-sm" />

      <div className="relative z-10 p-8 rounded-xl shadow-2xl bg-zinc-900/80 backdrop-blur-md border border-zinc-700 max-w-md w-full">
        <div className="flex items-center gap-3 group justify-center mb-6">
          <div className="relative">
            <GiPopcorn
              size={32}
              className="text-red-600 group-hover:text-red-500 transition-colors"
            />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold">
            <span className="text-red-600">Movie</span>
            <span className="text-gray-300">Explore</span>
          </h1>
        </div>

        <form className="space-y-5">
          <div className="relative">
            <label className="text-sm text-zinc-300">API Key</label>
            <div className="flex items-center mt-1 bg-zinc-800 rounded px-3">
              <FaKey className="text-zinc-400 mr-2" />
              <input
                type="text"
                {...register("api_key")}
                className="w-full p-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                placeholder="Insira sua API Key"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="text-sm text-zinc-300">Usuário</label>
            <div className="flex items-center mt-1 bg-zinc-800 rounded px-3">
              <FaUser className="text-zinc-400 mr-2" />
              <input
                type="text"
                {...register("username")}
                className="w-full p-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                placeholder="Nome de usuário"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="text-sm text-zinc-300">Senha</label>
            <div className="flex items-center mt-1 bg-zinc-800 rounded px-3">
              <FaLock className="text-zinc-400 mr-2" />
              <input
                type="password"
                {...register("password")}
                className="w-full p-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                placeholder="Digite sua senha"
                required
              />
            </div>
          </div>

          <Botao
            id="botaoSalvar"
            onClick={handleLogin}
            carregando={loading}
            disabled={loading}
            texto={"Entrar no multiverso"}
            tipo={"sucesso"}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 px-4 rounded transition duration-300 disabled:opacity-50 cursor-pointer"
          />
        </form>

        <p className="text-center text-zinc-400 text-xs mt-6">
          Acesso ao catálogo de filmes, séries e animes com sua conta TMDB
        </p>
      </div>
    </div>
  );
}
