import { useDarkMode } from '@/contexts/dark-mode-context';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function PdfPageLayout() {
  const { setIsDarkMode } = useDarkMode();

  useEffect(() => {
    setIsDarkMode(false);
  }, [setIsDarkMode]);

  return (
    <div className="h-screen w-screen">
      <Outlet />
    </div>
  );
}

export default PdfPageLayout;
