import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface SortProps {
  className?: string;
}

function Sort({ className }: SortProps) {
  return (
    <Select>
      <SelectTrigger className={cn('w-32 md:w-40', className)}>
        <SelectValue placeholder="Company" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="sort">Sort</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default Sort;
