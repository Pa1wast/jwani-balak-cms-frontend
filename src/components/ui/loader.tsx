import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

interface LoaderProps {
  className?: string;
  text?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

function Loader({ className, size = 'md', text = true }: LoaderProps) {
  return (
    <div
      className={cn(
        'mx-auto font-semibold flex gap-2 items-center text-primary/80',
        size === 'sm' && 'text-sm',
        size === 'md' && 'text-base',
        size === 'lg' && 'text-xl',
        className
      )}
    >
      <LoaderCircle
        className={cn(
          'rotate size-4',
          size === 'sm' && 'size-4',
          size === 'md' && 'size-6',
          size === 'lg' && 'size-8'
        )}
      />
      {text && 'Loading...'}
    </div>
  );
}

export default Loader;
