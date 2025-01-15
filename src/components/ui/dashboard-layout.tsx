import { Outlet } from 'react-router-dom';

import Header from '@/components/ui/header';
import Sidebar from '@/components/ui/sidebar';
import useIsMobile from '@/hooks/useIsMobile';

function DashboardLayout() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileDashboardLayout /> : <DesktopDashboardLayout />;
}

function DesktopDashboardLayout() {
  return (
    <div className="h-screen grid grid-cols-[max-content_1fr] grid-rows-[max-content_1fr] overflow-hidden">
      <Header className="col-span-2" />
      <Sidebar />

      <main className="overflow-hidden px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

function MobileDashboardLayout() {
  return (
    <div className="h-screen grid grid-cols-1 grid-rows-[max-content_1fr_max-content] justify-between overflow-hidden">
      <Header />
      <main className="overflow-auto px-2 py-4">
        <Outlet />
      </main>
      <Sidebar />
    </div>
  );
}

export default DashboardLayout;
