/* eslint-disable react-refresh/only-export-components */
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { listViewTypes } from '@/types/company';
import { createContext, ReactNode, useContext } from 'react';

interface CompaniesProvider {
  selectedCompanyId: string | null;
  listView: listViewTypes;
  setSelectedCompany: (id: string | null) => void;
  setListView: (viewType: listViewTypes) => void;
}

const CompaniesContext = createContext<CompaniesProvider | undefined>(undefined);

function CompaniesProvider({ children }: { children: ReactNode }) {
  const [selectedCompanyId, setSelectedCompany] = useLocalStorageState<string | null>(
    null,
    'selected-company-id'
  );

  const [listView, setListView] = useLocalStorageState<listViewTypes>(
    listViewTypes.GRID,
    'company-list-view'
  );

  return (
    <CompaniesContext.Provider
      value={{ selectedCompanyId, setSelectedCompany, listView, setListView }}
    >
      {children}
    </CompaniesContext.Provider>
  );
}

function useCompanies() {
  const context = useContext(CompaniesContext);

  if (!context) {
    throw new Error('CompaniesContext was used outisde of a CompaniesProvider!');
  }

  return context;
}

export { CompaniesProvider, useCompanies };
