import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import storage from '../utils/storage';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  if (!storage.getSession()) return <Navigate to="/login" replace />;
  return children;
}
