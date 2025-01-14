import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

interface SearchProps {
  placeholder?: string;
}

function Search({ placeholder }: SearchProps) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="relative w-full">
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
