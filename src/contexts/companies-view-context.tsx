/* eslint-disable react-refresh/only-export-components */
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { listViewTypes } from '@/types/company';
import { createContext, ReactNode, useContext } from 'react';

interface CompaniesViewProvider {
  selectedCompanyId: string | null;
  listView: listViewTypes;
  setSelectedCompany: (id: string | null) => void;
  setListView: (viewType: listViewTypes) => void;
}

const CompaniesViewContext = createContext<CompaniesViewProvider | undefined>(undefined);

function CompaniesViewProvider({ children }: { children: ReactNode }) {
  const [selectedCompanyId, setSelectedCompany] = useLocalStorageState<string | null>(
    null,
    'selected-company-id'
  );

  const [listView, setListView] = useLocalStorageState<listViewTypes>(
    listViewTypes.GRID,
    'company-list-view'
  );

  return (
    <CompaniesViewContext.Provider
      value={{ selectedCompanyId, setSelectedCompany, listView, setListView }}
    >
      {children}
    </CompaniesViewContext.Provider>
  );
}

function useCompaniesView() {
  const context = useContext(CompaniesViewContext);

  if (!context) {
    throw new Error('CompaniesViewContext was used outisde of a CompaniesProvider!');
  }

  return context;
}

export { CompaniesViewProvider, useCompaniesView };
