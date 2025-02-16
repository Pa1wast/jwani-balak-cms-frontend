import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FilePlus, Upload } from 'lucide-react';

function InvoicesLayout() {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-semibold text-lg md:text-xl">Invoices</h1>
          <p className="text-xs md:text-sm">View, manage, upload and download invoices here.</p>
        </div>

        <div className="flex gap-1">
          <Button variant={pathname === '/dashboard/invoices' ? 'secondary' : 'ghost'} asChild>
            <Link to="/dashboard/invoices">
              <FilePlus /> Generated Invoices
            </Link>
          </Button>

          <Button
            variant={pathname === '/dashboard/invoices/uploaded-invoices' ? 'secondary' : 'ghost'}
            asChild
          >
            <Link to="/dashboard/invoices/uploaded-invoices">
              <Upload /> Uploaded Invoices
            </Link>
          </Button>
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default InvoicesLayout;
