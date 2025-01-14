import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

interface SearchProps {
  placeholder?: string;
  className?: string;
}

function Search({ placeholder, className }: SearchProps) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className={cn('relative w-full', className)}>
      <SearchIcon className="absolute top-[50%] translate-y-[-50%] left-2" />
      <div className="h-[60%] w-[1px] bg-foreground/30  absolute top-[50%] translate-y-[-50%] left-10" />

      <Input
        placeholder={placeholder}
        onChange={e => setSearchValue(e.target.value)}
        value={searchValue}
        className="pl-12"
      />
    </div>
  );
}

export default Search;
