import { ArrowUpDown, Boxes, FileText, LayoutDashboard, NotebookPen } from 'lucide-react';
import SidebarItem from '@/components/sidebar/sidebar-item';
import { cn } from '@/lib/utils';

const items = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/dashboard/products', icon: Boxes },
  { name: 'Transactions', href: '/dashboard/transactions', icon: ArrowUpDown },
  { name: 'Invoices', href: '/dashboard/invoices', icon: FileText },
  { name: 'Klesh Notes', href: '/dashboard/klesh-notes', icon: NotebookPen },
];

function Sidebar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex justify-between border-transparent dark:border-primary/50 text-background bg-primary p-2 md:border-t-0 md:border-r md:flex-col md:justify-start md:gap-4 dark:bg-primary/10 border-t md:pt-20',
        className
      )}
    >
      {items.map(item => (
        <SidebarItem key={item.href} href={item.href} name={item.name} icon={item.icon} />
      ))}
    </div>
  );
}

export default Sidebar;
