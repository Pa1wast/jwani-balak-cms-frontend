import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface FilterProps {
  className?: string;
}

function Filter({ className }: FilterProps) {
  return (
    <Select>
      <SelectTrigger className={cn('w-32 md:w-40', className)}>
        <SelectValue placeholder="Filter By" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="filter">Filter</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default Filter;
