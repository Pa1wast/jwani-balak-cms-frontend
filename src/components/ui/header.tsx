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

import { companies } from '@/pages/home';
import { useSelectedCompany } from '@/contexts/selected-company-context';

function Header({ className }: { className?: string }) {
  const { pathname } = useLocation();
  const { selectedCompanyId, setSelectedCompany } = useSelectedCompany();

  return (
    <div
      className={cn(
        'border-b border-foreground dark:border-primary-foreground w-full px-2 py-2 flex justify-between items-center',
        className
      )}
    >
      <div className="flex items-center gap-3 md:gap-6">
        <div className="flex flex-col">
          <p className="font-semibold md:font-bold text-lg md:text-2xl">JWANI BALAK</p>
          <p className="text-xs md:font-semibold text-muted-foreground">
            Company Management System
          </p>
        </div>

        <div
          className={cn(
            'hidden sm:block h-10 w-[1px] bg-muted-foreground',
            pathname === '/' && 'sm:hidden'
          )}
        />

        {pathname !== '/' && (
          <Select
            onValueChange={value => setSelectedCompany(value)}
            value={selectedCompanyId as string}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Company" />
            </SelectTrigger>
            <SelectContent>
              {companies.map(company => (
                <SelectItem key={company.id} value={company.id.toString()}>
                  <div className="flex gap-2 w-full items-center justify-between text-xs">
                    <Avatar className="h-7 w-7 rounded-none">
                      <AvatarImage
                        src={company.logo}
                        alt={company.name}
                        className="dark:bg-white"
                      />
                      <AvatarFallback>{company.name[0].toUpperCase()}</AvatarFallback>
                    </Avatar>

                    <p className="text-xs">{company.name}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      {pathname !== '/' && (
        <Button variant="outline" size="sm" className="flex md:hidden ml-auto mr-2 text-xs" asChild>
          <Link to="/">
            <ArrowLeft className="w-2 h-2" /> <span>Companies</span>
          </Link>
        </Button>
      )}
      <DarkModeToggle />
    </div>
  );
}

export default Header;
