import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

function Filter() {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-32 md:w-40">
          <SelectValue placeholder="Filter By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="filter">Filter</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Filter;
