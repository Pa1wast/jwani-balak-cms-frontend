import Filter from '@/components/navigation/filter';
import Search from '@/components/navigation/search';
import Sort from '@/components/navigation/sort';
import CompanyCard from '@/components/ui/company-card';
import Header from '@/components/ui/header';
import RegisterCompanyForm from '@/components/ui/register-company-form';
import SelectGridView from '@/components/ui/select-grid-view';
import { listViewTypes, useCompanies } from '@/contexts/companies-context';
import { cn } from '@/lib/utils';

// eslint-disable-next-line react-refresh/only-export-components
export const companies = [
  {
    id: 0,
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    address: '123 Innovation Lane, San Francisco, CA',
  },
  {
    id: 1,
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    address: '1600 Amphitheatre Parkway, Mountain View, CA',
  },
  {
    id: 2,
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    address: 'One Microsoft Way, Redmond, WA',
  },
  {
    id: 3,
    name: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    address: '1 Apple Park Way, Cupertino, CA',
  },
  {
    id: 4,
    name: 'Facebook',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
    address: '1 Hacker Way, Menlo Park, CA',
  },
  {
    id: 5,
    name: 'Tesla',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors_logo.svg',
    address: '3500 Deer Creek Road, Palo Alto, CA',
  },
  {
    id: 6,
    name: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg',
    address: '100 Winchester Circle, Los Gatos, CA',
  },
  {
    id: 7,
    name: 'Samsung',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
    address: 'Samsung Digital City, Suwon, South Korea',
  },
  {
    id: 8,
    name: 'IBM',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
    address: '1 New Orchard Road, Armonk, NY',
  },
  {
    id: 9,
    name: 'Adobe',
    logo: '',
    address: '345 Park Avenue, San Jose, CA',
  },
  {
    id: 10,
    name: 'Intel',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel_logo_%282020%29.svg',
    address: '2200 Mission College Blvd, Santa Clara, CA',
  },
];

function Home() {
  const { listView } = useCompanies();
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
              <Search placeholder="Search companies..." />
              <Filter />
              <Sort />

              <div className="h-[80%] my-auto w-[2px] bg-primary/20 mx-2 hidden md:block" />

              <SelectGridView />
            </div>

            <RegisterCompanyForm />
          </div>

          <div
            className={cn(
              'grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2',
              listView === listViewTypes.ROW && 'flex flex-col'
            )}
          >
            {companies.map(company => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
