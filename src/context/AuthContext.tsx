import { createContext, useContext, useState, useEffect } from 'react';
import {
  getAccountDetails,
  userAuthRequestToken,
  userCreateSession,
  userValidateLoginSession,
} from '../services/authRequest';
import storage from '../utils/storage';
import { User } from '../types/auth';

type AuthContextType = {
  user: User | null;
  login: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    try {
      // 1) solicitar request token
      const tokenResp = await userAuthRequestToken();
      if (!tokenResp?.data?.success) {
        return {
          success: false,
          message: tokenResp?.message,
        };
      }

      // 2) validar com credenciais
      const validateResp = await userValidateLoginSession({
        username,
        password,
        request_token: tokenResp.data.request_token,
      });
      if (!validateResp?.success && !validateResp?.data?.success) {
        return {
          success: false,
          message: validateResp?.message,
        };
      }

      // 3) criar sessão
      const sessionResp = await userCreateSession(tokenResp.data.request_token);
      if (!sessionResp?.success) {
        return {
          success: false,
          message: sessionResp?.message,
        };
      }

      const sessionId = sessionResp.data.session_id;
      storage.setSession(sessionId);

      // 4) buscar dados da conta
      const accountResp = await getAccountDetails(sessionId);
      if (accountResp?.success && accountResp.data) {
        const d = accountResp.data;
        setUser({
          id: d.id,
          name: d.name,
          username: d.username,
          avatar_path: d.avatar?.tmdb?.avatar_path,
        });
        return { success: true };
      } else {
        return {
          success: false,
          message: accountResp.message,
        };
      }
    } catch (error: any) {
      return { success: false, message: error?.message };
    }
  };

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      try {
        const savedSession = storage.getSession();
        if (!savedSession) return;
        const accountResp = await getAccountDetails(savedSession);
        if (accountResp && accountResp.success && mounted) {
          const data = accountResp.data;
          setUser({
            id: data.id,
            name: data.name,
            username: data.username,
            avatar_path: data.avatar?.tmdb?.avatar_path,
          });
        }
      } catch (err) {
        console.error('Erro ao carregar sessão do usuário', err);
      }
    };
    init();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve estar dentro do AuthProvider');
  return context;
}
