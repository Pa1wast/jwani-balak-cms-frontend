import { Outlet } from 'react-router-dom';

function PdfPageLayout() {
  return (
    <div className="h-screen w-screen">
      <Outlet />
    </div>
  );
}

export default PdfPageLayout;
