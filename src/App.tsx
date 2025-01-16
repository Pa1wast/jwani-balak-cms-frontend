import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import DashboardLayout from '@/components/ui/dashboard-layout';

import { Toaster } from 'sonner';

import Home from '@/pages/home';
import Dashboard from '@/pages/dashboard';
import Products from '@/pages/products';
import Transactions from '@/pages/transactions';
import Invoices from '@/pages/invoices';
import Reports from '@/pages/reports';
import KleshNotes from '@/pages/klesh-notes';

import Invoice from '@/components/pdf/invoice';
import Klesh from '@/components/pdf/klesh';
import Report from '@/components/pdf/report';

import { DarkModeProvider } from '@/contexts/dark-mode-context';
import { CompaniesProvider } from '@/contexts/companies-context';
import { KleshNotesProvider } from '@/contexts/klesh-notes-context';

const queryClient = new QueryClient();

function App() {
  return (
    <DarkModeProvider>
      <CompaniesProvider>
        <KleshNotesProvider>
          <QueryClientProvider client={queryClient}>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <BrowserRouter>
              <Routes>
                <Route index element={<Home />} />
                <Route path="dashboard" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="/dashboard/products" element={<Products />} />
                  <Route path="/dashboard/transactions" element={<Transactions />} />
                  <Route path="/dashboard/invoices" element={<Invoices />} />

                  <Route path="/dashboard/klesh-notes" element={<KleshNotes />} />
                  <Route path="/dashboard/reports" element={<Reports />} />
                </Route>
                <Route path="/pdf">
                  <Route path="/pdf/invoice/:invoiceId" element={<Invoice />} />
                  <Route path="/pdf/klesh/:noteId" element={<Klesh />} />
                  <Route path="/pdf/report/:reportId" element={<Report />} />
                </Route>
              </Routes>
            </BrowserRouter>
            <Toaster />
          </QueryClientProvider>
        </KleshNotesProvider>
      </CompaniesProvider>
    </DarkModeProvider>
  );
}

export default App;
