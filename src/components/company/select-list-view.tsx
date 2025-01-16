import { Button } from '@/components/ui/button';
import { useCompanies } from '@/contexts/companies-context';
import { listViewTypes } from '@/types/company';
import { Grid2X2, Rows2 } from 'lucide-react';

function SelectListView() {
  const { listView, setListView } = useCompanies();

  return (
    <div className="outline outline-border outline-1 rounded-lg hidden md:flex w-max">
      <Button
        size="icon"
        variant={listView === listViewTypes.ROW ? 'default' : 'ghost'}
        onClick={() => setListView(listViewTypes.ROW)}
        className="rounded-r-none"
      >
        <Rows2 />
      </Button>

      <Button
        size="icon"
        variant={listView === listViewTypes.GRID ? 'default' : 'ghost'}
        onClick={() => setListView(listViewTypes.GRID)}
        className="rounded-l-none"
      >
        <Grid2X2 />
      </Button>
    </div>
  );
}

export default SelectListView;
