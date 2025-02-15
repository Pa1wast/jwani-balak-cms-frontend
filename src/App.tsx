import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import DashboardLayout from '@/components/ui/dashboard-layout';

import { Toaster } from 'sonner';

import Home from '@/pages/home';
import Dashboard from '@/pages/dashboard';
import Products from '@/pages/products';
import Transactions from '@/pages/transactions';
import Invoices from '@/pages/invoices';
import KleshNotes from '@/pages/klesh-notes';

import Invoice from '@/components/pdf/invoice';
import Report from '@/components/pdf/report';
import KleshNote from '@/components/pdf/klesh-note';

import { DarkModeProvider } from '@/contexts/dark-mode-context';
import { CompaniesViewProvider } from '@/contexts/companies-view-context';
import { KleshNotesEditorProvider } from '@/contexts/klesh-notes-context';
import PdfPageLayout from './components/pdf/pdf-page-layout';
import TransactionDetails from './components/transaction/transaction-details';
import InvoicesLayout from './components/invoice/invoices-layout';
import UploadedInvoices from './pages/uploaded-invoices';

const queryClient = new QueryClient();

function App() {
  return (
    <DarkModeProvider>
      <CompaniesViewProvider>
        <KleshNotesEditorProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <BrowserRouter>
              <Routes>
                <Route index element={<Home />} />
                <Route path="dashboard" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="/dashboard/products" element={<Products />} />
                  <Route path="/dashboard/transactions" element={<Transactions />} />
                  <Route
                    path="/dashboard/transactions/:transactionId"
                    element={<TransactionDetails />}
                  />
                  <Route path="/dashboard/invoices" element={<InvoicesLayout />}>
                    <Route index element={<Invoices />} />
                    <Route
                      path="/dashboard/invoices/uploaded-invoices"
                      element={<UploadedInvoices />}
                    />
                  </Route>

                  <Route path="/dashboard/klesh-notes" element={<KleshNotes />} />
                </Route>
                <Route path="/pdf" element={<PdfPageLayout />}>
                  <Route path="/pdf/invoice/:invoiceId" element={<Invoice />} />
                  <Route path="/pdf/klesh/:noteId" element={<KleshNote />} />
                  <Route path="/pdf/report/:reportId" element={<Report />} />
                </Route>
              </Routes>
            </BrowserRouter>
            <Toaster />
          </QueryClientProvider>
        </KleshNotesEditorProvider>
      </CompaniesViewProvider>
    </DarkModeProvider>
  );
}

export default App;
