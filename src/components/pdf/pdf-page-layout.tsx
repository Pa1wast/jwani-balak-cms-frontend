import { useDarkMode } from '@/contexts/dark-mode-context';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function PdfPageLayout() {
  const { setIsDarkMode } = useDarkMode();

  useEffect(() => {
    setIsDarkMode(false);
  }, [setIsDarkMode]);

  return <Outlet />;
}

export default PdfPageLayout;
