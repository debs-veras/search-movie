import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { BiUserCircle } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';
import { removeSession } from '../../services/authRequest';
import { useNavigate } from 'react-router-dom';
import useToastLoading from '../../hooks/useToastLoading';

export default function MenuUser() {
  const navigate = useNavigate();
  const toastLoading = useToastLoading();
  const user = localStorage.getItem('@user') || '';

  const handleLogout = async () => {
    const sessionId = localStorage.getItem('@session_id') || '';
    const response = await removeSession(sessionId);

    if (response.success) {
      localStorage.removeItem('@session_id');
      localStorage.removeItem('@user');
      navigate('/login');
    } else {
      toastLoading({
        mensagem: response.data || 'Erro ao sair',
        tipo: 'error',
      });
    }
  };
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="text-gray-300 hover:text-white transition-colors outline-none cursor-pointer"
          aria-label="Menu do usuário"
        >
          <BiUserCircle size={22} className="md:w-6 md:h-6" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[180px] bg-gray-800 rounded-md shadow-lg border border-gray-700 overflow-hidden z-50 will-change-[opacity,transform]"
          sideOffset={8}
          align="end"
        >
          <DropdownMenu.Label className="px-4 py-2 border-b border-gray-700 text-sm text-gray-300 select-none">
            Bem-vindo(a), {user}
          </DropdownMenu.Label>

          <DropdownMenu.Item
            className="px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center cursor-pointer outline-none"
            onClick={handleLogout}
          >
            <FiLogOut className="mr-2" />
            Sair
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="fill-gray-800" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
