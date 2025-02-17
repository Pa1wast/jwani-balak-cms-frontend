import { Outlet, useNavigate } from 'react-router-dom';
import Loader from './ui/loader';
import { useEffect } from 'react';

function ProtectedLayout() {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = { isLoading: false, isAuthenticated: true };

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login');
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading)
    return (
      <div className="grid h-screen w-screen place-items-center">
        <Loader size="lg" />
      </div>
    );

  if (isAuthenticated) return <Outlet />;
}

export default ProtectedLayout;
