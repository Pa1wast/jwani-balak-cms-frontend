import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

function Sort() {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-32 md:w-40">
          <SelectValue placeholder="Company" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="sort">Sort</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Sort;
