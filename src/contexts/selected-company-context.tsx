import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { createContext, ReactNode, useContext } from 'react';

interface SelectedCompanyContextValue {
  selectedCompanyId: string | null;
  setSelectedCompany: (id: string | null) => void;
}

const SelectedCompanyContext = createContext<SelectedCompanyContextValue | undefined>(undefined);

function SelectedCompanyProvider({ children }: { children: ReactNode }) {
  const [selectedCompanyId, setSelectedCompany] = useLocalStorageState<string | null>(
    null,
    'selected-company-id'
  );

  return (
    <SelectedCompanyContext.Provider value={{ selectedCompanyId, setSelectedCompany }}>
      {children}
    </SelectedCompanyContext.Provider>
  );
}

function useSelectedCompany() {
  const context = useContext(SelectedCompanyContext);

  if (!context) {
    throw new Error('useSelectedCompany must be used within a SelectedCompanyProvider');
  }

  return context;
}

export { SelectedCompanyProvider, useSelectedCompany };
