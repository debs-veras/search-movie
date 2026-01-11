import { BiUserCircle } from 'react-icons/bi';
import { FaStar, FaChevronDown } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { getAccountDetails, removeSession } from '../../services/authRequest';
import { useNavigate } from 'react-router-dom';
import useToastLoading from '../../hooks/useToastLoading';
import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import storage from '../../utils/storage';
import { API_URL_IMG_TMDB } from '../../constants/api';

interface Account {
  username: string;
  name: string;
  avatar_path?: string;
}

export default function MenuUser() {
  const navigate = useNavigate();
  const toastLoading = useToastLoading();
  const session_id = storage.getSession();

  const [account, setAccount] = useState<Account>({
    username: '',
    name: '',
    avatar_path: '',
  });

  const handleLogout = async () => {
    const sessionId = storage.getSession() || '';
    const response = await removeSession(sessionId);

    if (response.success) {
      storage.clearSession();
      localStorage.removeItem('@user');
      navigate('/login');
    } else {
      toastLoading({
        mensagem: response.data || 'Erro ao sair',
        tipo: 'error',
      });
    }
  };

  useEffect(() => {
    const fetchAccount = async () => {
      const response = await getAccountDetails(session_id || '');
      if (response.success && response.data) {
        const data = response.data;
        setAccount({
          username: data.username,
          name: data.name,
          avatar_path: data.avatar?.tmdb?.avatar_path,
        });
      }
    };

    fetchAccount();
  }, [session_id]);

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }

    window.addEventListener('click', onClick);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="flex gap-3 items-center">
          <button
            onClick={() => setOpen((s) => !s)}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full cursor-pointer"
            aria-haspopup="true"
            aria-expanded={open}
            aria-label="Abrir menu do usuário"
          >
            {account.avatar_path ? (
              <img
                src={`${API_URL_IMG_TMDB}/w64_and_h64_face${account.avatar_path}`}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover border-2 border-gray-600 hover:border-red-500 transition-colors"
              />
            ) : (
              <BiUserCircle
                size={32}
                className="hover:text-red-400 transition-colors"
              />
            )}
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs text-gray-400 truncate">
                Bem-vindo(a),
              </span>
              <span className="text-sm text-gray-100 font-semibold truncate">
                {account.username || 'Usuário'}
              </span>
            </div>
            <FaChevronDown
              className={`ml-1 text-gray-400 transition-transform ${
                open ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {/* Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.12 }}
              className="absolute right-4 top-14 z-50 w-48 bg-gray-900 rounded-lg border border-gray-700 shadow-xl overflow-hidden"
            >
              <div className="flex flex-col py-2">
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate('/my-collection');
                  }}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 cursor-pointer"
                >
                  <FaStar className="text-yellow-400" />
                  Minha Coleção
                </button>

                <div className="border-t border-gray-800 mt-1" />
                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-red-300 hover:bg-red-900/20 cursor-pointer"
                >
                  <FiLogOut className="text-red-400" />
                  Sair
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
