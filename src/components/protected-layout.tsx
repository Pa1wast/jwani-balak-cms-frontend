import { Outlet, useNavigate } from 'react-router-dom';
import Loader from '@/components/ui/loader';
import { useEffect } from 'react';

function ProtectedLayout() {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = { isLoading: false, isAuthenticated: false };

  useEffect(() => {
    console.log(document.cookie);
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
