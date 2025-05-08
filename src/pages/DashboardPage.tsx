import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div>
      {/* Logout */}
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      {user && (
        <button onClick={handleLogout} className='px-3 py-1 bg-red-600 rounded hover:bg-red-700'>
          Logout
        </button>
      )}
    </div>
  );
}
