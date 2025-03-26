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
import { getCompanyImgLocalPath } from '@/lib/getImgLocalPath';
import { Label } from './label';
import { Input } from './input';
import { useExchangeRate } from '@/features/exchange-rate/useExchangeRate';
import { formatPrice } from '@/lib/price';
import { currencyTypes } from '@/types/transaction';
import { useAddExchangeRate } from '@/features/exchange-rate/useAddExchangeRate';
import { useState } from 'react';

function Header({ className }: { className?: string }) {
  const { pathname } = useLocation();
  const { selectedCompanyId, setSelectedCompany } = useCompaniesView();
  const { isLoading, companies } = useCompanies();
  const { isLoading: isLoadingExchangeRate, exchangeRate } = useExchangeRate();
  const { isAdding, addExchangeRate } = useAddExchangeRate();

  const [rate, setRate] = useState(exchangeRate ?? 1450);

  function handleSelectCompany(id: string) {
    setSelectedCompany(id);
    window.location.reload();
  }

  function handleChangeExchangeRate() {
    if (rate) addExchangeRate(rate);
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
                            src={getCompanyImgLocalPath(company.logo)}
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

        {pathname !== '/' && (
          <div className="flex gap-2 items-center bg-foreground/10 p-2 rounded-sm">
            <Label className="w-max">Exchange Rate ($ to IQD)</Label>
            <Input
              className="max-w-[100px]"
              value={rate}
              onChange={e => {
                const value = e.target.value;
                if (!isNaN(Number(value))) setRate(Number(value));
              }}
              disabled={isAdding}
            />

            <Button variant="outline" onClick={handleChangeExchangeRate} disabled={isAdding}>
              Change
            </Button>

            <p className="p-2 bg-foreground/10 rounded-md font-semibold">
              {isLoadingExchangeRate ? (
                <Loader size="sm" className="text-foreground/50" />
              ) : (
                <>
                  <span className="text-cyan-500">$100</span> ={' '}
                  <span className="text-orange-500">
                    {formatPrice((exchangeRate ?? 0) * 100, currencyTypes.IQD)}
                  </span>
                </>
              )}
            </p>
          </div>
        )}
      </div>

      <DarkModeToggle />
    </div>
  );
}

export default Header;
