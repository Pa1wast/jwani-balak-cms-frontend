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
import { Link } from 'react-router-dom';

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
      {/* <Button
        variant="outline"
        size="sm"
        className="hidden md:flex  text-primary-foreground bg-primary mb-10 dark:bg-primary-foreground dark:text-primary dark:hover:bg-primary/10 dark:hover:text-primary border-primary-foreground/20 dark:border-primary/20 hover:bg-primary-foreground/10 hover:text-primary-foreground"
        asChild
      >
        <Link to="/">
          <ArrowLeft /> <span>Companies</span>
        </Link>
      </Button> */}
      {items.map(item => (
        <SidebarItem key={item.href} href={item.href} name={item.name} icon={item.icon} />
      ))}
    </div>
  );
}

export default Sidebar;
