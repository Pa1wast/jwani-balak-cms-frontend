import { LoaderCircle } from 'lucide-react';

function Loader() {
  return (
    <div className="mx-auto text-xl font-semibold flex gap-2 items-center text-primary/80">
      <LoaderCircle className="rotate" />
      Loading...
    </div>
  );
}

export default Loader;
