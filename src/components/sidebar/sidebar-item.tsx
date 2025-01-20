import { Link, useLocation } from 'react-router-dom';

import type { LucideIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  name: string;
  href: string;
  icon: LucideIcon;
}

function SidebarItem({ name, href, icon: Icon }: SidebarItemProps) {
  const { pathname } = useLocation();

  const isActive = pathname === href;

  return (
    <Button
      variant={isActive ? 'default' : 'ghost'}
      asChild
      className={cn(
        'no-underline opacity-65 justify-start bg-none text-primary-foreground  dark:text-primary',
        isActive &&
          'opacity-100 bg-primary-foreground text-primary hover:text-primary hover:bg-primary-foreground dark:bg-primary dark:text-primary-foreground'
      )}
    >
      <Link to={href} className="no-underline">
        {Icon && <Icon />} <span className="hidden md:block">{name}</span>
      </Link>
    </Button>
  );
}

export default SidebarItem;
