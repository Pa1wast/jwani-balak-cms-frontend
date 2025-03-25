import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import DashboardLayout from '@/components/ui/dashboard-layout';

import { Toaster } from 'sonner';

import Home from '@/pages/home';
import Dashboard from '@/pages/dashboard';
import Products from '@/pages/products';
import Transactions from '@/pages/transactions';
import Invoices from '@/pages/invoices';

import Invoice from '@/components/pdf/invoice';
import Report from '@/components/pdf/report';

import { DarkModeProvider } from '@/contexts/dark-mode-context';
import { CompaniesViewProvider } from '@/contexts/companies-view-context';
import { KleshNotesEditorProvider } from '@/contexts/klesh-notes-context';
import PdfPageLayout from '@/components/pdf/pdf-page-layout';
import TransactionDetails from '@/components/transaction/transaction-details';
import InvoicesLayout from '@/components/invoice/invoices-layout';
import UploadedInvoices from '@/pages/uploaded-invoices';
import PageNotFound from '@/components/page-not-found';
import ProtectedLayout from '@/components/protected-layout';
import Login from '@/pages/login';

const queryClient = new QueryClient();

function App() {
  return (
    <DarkModeProvider>
      <CompaniesViewProvider>
        <KleshNotesEditorProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                <Route element={<ProtectedLayout />}>
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
                  </Route>
                  <Route path="/pdf" element={<PdfPageLayout />}>
                    <Route path="/pdf/invoice/:invoiceId" element={<Invoice />} />
                    <Route path="/pdf/report/:reportId" element={<Report />} />
                  </Route>
                </Route>

                <Route path="login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
            <Toaster position="top-center" />
          </QueryClientProvider>
        </KleshNotesEditorProvider>
      </CompaniesViewProvider>
    </DarkModeProvider>
  );
}

export default App;
