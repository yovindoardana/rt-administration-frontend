import { type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className='flex justify-center items-center h-full'>Loading...</div>;
  }

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
}
