import { Outlet, useNavigate } from 'react-router-dom';
import Loader from '@/components/ui/loader';
import { useEffect, useState } from 'react';
import { getCookie } from '@/lib/cookie';

function ProtectedLayout() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authToken = getCookie('Auth');

    if (authToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate('/login');
    }

    setIsLoading(false);
  }, [navigate]);

  if (isLoading)
    return (
      <div className="grid h-screen w-screen place-items-center">
        <Loader size="lg" />
      </div>
    );

  if (true) return <Outlet />;
}

export default ProtectedLayout;
