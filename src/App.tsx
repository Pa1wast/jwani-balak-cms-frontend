import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { DarkModeProvider } from '@/contexts/dark-mode-context';

import Home from '@/pages/home';
import DashboardLayout from '@/components/ui/dashboard-layout';
import Dashboard from '@/pages/dashboard';
import Products from '@/pages/products';
import Transactions from '@/pages/transactions';
import Invoices from '@/pages/invoices';
import Reports from './pages/reports';
import KleshNotes from './pages/klesh-notes';
import { CompaniesProvider } from './contexts/companies-context';
import { KleshNotesProvider } from './contexts/klesh-notes-context';

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
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </KleshNotesProvider>
      </CompaniesProvider>
    </DarkModeProvider>
  );
}

export default App;
