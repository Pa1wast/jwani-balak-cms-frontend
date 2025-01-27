import { cn } from '@/lib/utils';
import DarkModeToggle from '@/components/dark-mode-toggle';
import { Button } from './button';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCompaniesView } from '@/contexts/companies-view-context';
import { useCompanies } from '@/features/company/useCompanies';
import { Company } from '@/types/company';
import Loader from './loader';
import { useQueryClient } from '@tanstack/react-query';
import { getImgLocalPath } from '@/lib/getImgLocalPath';

function Header({ className }: { className?: string }) {
  const { pathname } = useLocation();
  const { selectedCompanyId, setSelectedCompany } = useCompaniesView();
  const { isLoading, companies } = useCompanies();
  const queryClient = useQueryClient();

  function handleSelectCompany(id: string) {
    setSelectedCompany(id);
    queryClient.invalidateQueries({ queryKey: ['transactions'] });
    queryClient.invalidateQueries({ queryKey: ['transaction'] });
    queryClient.invalidateQueries({ queryKey: ['products'] });
    queryClient.invalidateQueries({ queryKey: ['product'] });
    queryClient.invalidateQueries({ queryKey: ['invoices'] });
    queryClient.invalidateQueries({ queryKey: ['invoice'] });
    queryClient.invalidateQueries({ queryKey: ['klesh-notes'] });
    queryClient.invalidateQueries({ queryKey: ['klesh-note'] });
  }

  return (
    <div
      className={cn(
        'border-b items-center border-foreground dark:border-primary dark:bg-primary/50 w-full px-2 py-2 flex justify-between  flex-wrap backdrop-blur-lg',
        className
      )}
    >
      <div className="flex items-center gap-2 md:gap-6">
        <p className="font-semibold md:font-bold text-sm md:text-xl">JWANI BALAK</p>

        <div
          className={cn(
            ' h-6 w-[1px] bg-muted-foreground/20 sm:mx-4',
            pathname === '/' && 'hidden'
          )}
        />

        <div className="flex items-center gap-1">
          {pathname !== '/' && (
            <Button variant="outline" size="icon" className="flex text-xs" asChild>
              <Link to="/">
                <ArrowLeft />
              </Link>
            </Button>
          )}

          {pathname !== '/' && (
            <Select
              onValueChange={value => handleSelectCompany(value)}
              value={selectedCompanyId as string}
            >
              <SelectTrigger className="w-32 md:w-40">
                {!isLoading ? <SelectValue placeholder="Company" /> : <Loader size="sm" />}
              </SelectTrigger>
              <SelectContent>
                {!isLoading &&
                  companies.map((company: Company) => (
                    <SelectItem key={company._id} value={company._id}>
                      <div className="flex gap-2 w-full items-center justify-between text-xs">
                        <Avatar className="h-7 w-7 rounded-none">
                          <AvatarImage
                            src={getImgLocalPath(company.logo)}
                            alt={company.companyName}
                            className="dark:bg-white"
                          />
                          <AvatarFallback>{company.companyName[0].toUpperCase()}</AvatarFallback>
                        </Avatar>

                        <p className="text-xs truncate">{company.companyName}</p>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <DarkModeToggle />
    </div>
  );
}

export default Header;
