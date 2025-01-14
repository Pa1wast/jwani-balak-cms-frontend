import { cn } from '@/lib/utils';
import DarkModeToggle from '@/components/dark-mode-toggle';

function Header({ className }: { className?: string }) {
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

        <div className="hidden sm:block h-10 w-[1px] bg-muted-foreground" />

        <div className="gap-1 items-center hidden sm:flex">
          <img
            src="../../public/test-company-logo.png"
            alt="Company Logo"
            className="w-16 h-8 rounded-md border dark:bg-white"
          />

          <p className="text-sm font-semibold">Huewai</p>
        </div>
      </div>

      <DarkModeToggle />
    </div>
  );
}

export default Header;
