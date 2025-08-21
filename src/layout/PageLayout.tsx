import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchPage from "./components/SearchMovie";
import useToastLoading from "../hooks/useToastLoading";
import { userValideteSession } from "../services/authRequest";
import { useEffect, useState } from "react";
import { useSearch } from "../context/FiltroContext";
import Loading from "../components/Loading";

export default function PageLayout() {
  const { filtros } = useSearch();
  const [loading, setLoading] = useState<boolean>(false);
  const toastLoading = useToastLoading();
  const navigate = useNavigate();

  const validateSession = async () => {
    setLoading(true);
    const response = await userValideteSession(localStorage.getItem("@session_id"));
    if (!response?.success && response?.success != undefined) {
      toastLoading({
        mensagem: response.status_message,
        tipo: "error",
        onClose: () => navigate("/login"),
      });
      navigate("/login");
    } 
    setLoading(false);
  };

  useEffect(() => {
    validateSession();
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative bg-[#050505] text-gray-200 overflow-hidden min-w-[250px]">
      {/* Efeitos de Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Efeito de tela de cinema */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-geometric.png')]" />
      </div>
      {loading ? (
        <Loading texto="Acessando o sistema" />
      ) : (
        <>
          {/* Header */}
          <Header />
          {/* Main Content */}
          <main className="flex-1 relative z-10">
            { (filtros.query === "" || filtros.type === "") ? (
              <Outlet />
            ) : (
              <SearchPage />
            )}
          </main>
          {/* Footer */}
          <Footer />
        </>
      )}
    </div>
  );
}
