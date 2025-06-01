import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchPage from "../pages/SearchMovie";
import useToastLoading from "../hooks/useToastLoading";
import { userValideteSession } from "../services/authRequest";
import { useEffect } from "react";
import { useSearch } from "../context/FiltroContext";

export default function PageLayout() {
  const { listMovie, filtros } = useSearch();
  const toastLoading = useToastLoading();
  const navigate = useNavigate();

  const validateSession = async () => {
    const response = await userValideteSession();

    if (!response.success) {
      toastLoading({
        mensagem: "Faça o login novamente",
        tipo: "error",
        onClose: () => navigate("/login"),
      });
      navigate("/login");
    } else navigate("/");
  };

  useEffect(() => {
    validateSession();
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative bg-[#050505] text-gray-200 overflow-hidden">
      {/* Efeitos de Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Efeito de tela de cinema */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-geometric.png')]" />
      </div>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        {listMovie === null || filtros.query === "" ? (
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
