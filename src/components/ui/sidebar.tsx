import {
  ArrowLeft,
  ArrowUpDown,
  BookOpenText,
  Boxes,
  FileText,
  LayoutDashboard,
  NotebookPen,
} from 'lucide-react';
import SidebarItem from './sidebar-item';
import { cn } from '@/lib/utils';
import { Button } from './button';

const items = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/dashboard/products', icon: Boxes },
  { name: 'Transactions', href: '/dashboard/transactions', icon: ArrowUpDown },
  { name: 'Invoices', href: '/dashboard/invoices', icon: FileText },
  { name: 'Klesh Notes', href: '/dashboard/klesh-notes', icon: NotebookPen },
  { name: 'Reports', href: '/dashboard/reports', icon: BookOpenText },
];

function Sidebar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex justify-between text-background bg-primary p-2 md:border-t-0 md:border-r md:flex-col md:justify-start md:gap-4 dark:bg-primary-foreground',
        className
      )}
    >
      <Button
        variant="outline"
        size="sm"
        className="text-primary-foreground bg-primary mb-10 dark:bg-primary-foreground dark:text-primary dark:hover:bg-primary/10 dark:hover:text-primary border-primary-foreground/20 dark:border-primary/20 hover:bg-primary-foreground/10 hover:text-primary-foreground"
      >
        <ArrowLeft /> <span>Companies</span>
      </Button>
      {items.map(item => (
        <SidebarItem key={item.href} href={item.href} name={item.name} icon={item.icon} />
      ))}
    </div>
  );
}

export default Sidebar;
