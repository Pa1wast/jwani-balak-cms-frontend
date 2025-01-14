/* eslint-disable react-refresh/only-export-components */
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { createContext, ReactNode, useContext } from 'react';

export enum listViewTypes {
  GRID = 'grid',
  ROW = 'row',
}

interface CompaniesProvider {
  selectedCompanyId: string | null;
  listView: listViewTypes;
  setSelectedCompany: (id: string | null) => void;
  setListView: (viewType: listViewTypes) => void;
}

const SelectedCompanyContext = createContext<CompaniesProvider | undefined>(undefined);

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
    <SelectedCompanyContext.Provider
      value={{ selectedCompanyId, setSelectedCompany, listView, setListView }}
    >
      {children}
    </SelectedCompanyContext.Provider>
  );
}

function useCompanies() {
  const context = useContext(SelectedCompanyContext);

  if (!context) {
    throw new Error('CompaniesContext was used outisde of a CompaniesProvider!');
  }

  return context;
}

export { CompaniesProvider, useCompanies };
