import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

interface LoaderProps {
  className?: string;
}

function Loader({ className }: LoaderProps) {
  return (
    <div
      className={cn(
        'mx-auto text-xl font-semibold flex gap-2 items-center text-primary/80',
        className
      )}
    >
      <LoaderCircle className="rotate" />
      Loading...
    </div>
  );
}

export default Loader;
