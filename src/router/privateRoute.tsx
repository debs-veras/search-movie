import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const isAuth = Boolean(localStorage.getItem('@session_id'));
  return isAuth ? children : <Navigate to="/login" replace />;
}
