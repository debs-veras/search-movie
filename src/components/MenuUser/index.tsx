import { BiUserCircle } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';
import { getAccountDetails, removeSession } from '../../services/authRequest';
import { useNavigate } from 'react-router-dom';
import useToastLoading from '../../hooks/useToastLoading';
import { useEffect, useState } from 'react';
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
      try {
        localStorage.removeItem('@user');
      } catch {
        /* noop */
      }
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

  return (
    <>
      <div className="flex gap-2 w-full justify-between">
        <div className="flex gap-2">
          <button
            className="flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full cursor-pointer hover:scale-105"
            aria-label="Menu do usuário"
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
          </button>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 truncate">
              Bem-vindo(a),
            </span>
            <span className="text-sm text-gray-100 font-semibold truncate">
              {account.username || 'Usuário'}
            </span>
          </div>
        </div>
        <button
          className="px-3 py-2 text-sm text-red-300 hover:bg-red-900/30 hover:text-red-100 flex items-center gap-3 cursor-pointer transition-all duration-150 rounded-md focus:outline-none focus:bg-red-900/30"
          onClick={handleLogout}
        >
          <FiLogOut size={16} className="text-red-400" />
          Sair
        </button>
      </div>
    </>
  );
}
