import Search from '@/components/navigation/search';
import CompanyCard from '@/components/company/company-card';
import Header from '@/components/ui/header';
import RegisterCompanyForm from '@/components/company/register-company-form';
import { useCompanies } from '@/features/company/useCompanies';
import { cn } from '@/lib/utils';
import SelectListView from '@/components/company/select-list-view';
import { listViewTypes } from '@/types/company';
import { useCompaniesView } from '@/contexts/companies-view-context';

import { useState } from 'react';
import Loader from '@/components/ui/loader';

function Home() {
  const { listView } = useCompaniesView();
  const { isLoading, companies } = useCompanies();

  const [searchValue, setSearchVale] = useState('');

  const filteredCompanies = !isLoading
    ? companies?.filter(company =>
        company.companyName.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  const displayedCompanies = filteredCompanies;

  return (
    <div>
      <Header className="fixed z-50 top-0 bg-background" />
      <main className="px-2 py-4 space-y-12 mt-16">
        <div>
          <h1 className="font-semibold text-lg md:text-xl">Comapnies</h1>
          <p className="text-xs md:text-sm">View, edit, and manage companies here.</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between gap-2 flex-wrap">
            <div className="flex gap-1 flex-wrap md:flex-nowrap">
              <Search
                placeholder="Search companies..."
                searchValue={searchValue}
                setSearchValue={setSearchVale}
              />

              <div className="h-[80%] my-auto w-[2px] bg-primary/20 mx-2 hidden md:block" />

              <SelectListView />
            </div>

            <RegisterCompanyForm />
          </div>

          <div
            className={cn(
              'grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2',
              listView === listViewTypes.ROW && 'flex flex-col'
            )}
          >
            {!isLoading ? (
              displayedCompanies?.map(company => (
                <CompanyCard key={company._id} company={company} />
              ))
            ) : (
              <Loader className="col-span-4 mt-32" size="lg" />
            )}

            {!isLoading && searchValue && !displayedCompanies?.length && (
              <p className="mx-auto text-lg font-semibold text-foreground/60 mt-32 col-span-4">
                No results found!
              </p>
            )}

            {!isLoading && !displayedCompanies?.length && !searchValue && (
              <p className="mx-auto text-lg font-semibold text-foreground/60 mt-32 col-span-4">
                No companies are registered
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
