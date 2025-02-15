import { Button } from '@/components/ui/button';
import { Download, Trash } from 'lucide-react';

function UploadedInvoice() {
  return (
    <div className="flex flex-col w-40">
      <Button variant="ghost" asChild>
        <img
          src="../../../public/jwani-balak-logo.jpg"
          alt="Uploaded Invoice"
          className="w-full h-40"
        />
      </Button>

      <div>
        <Button variant="ghost" className="w-full">
          <Download />
          Download
        </Button>

        <Button variant="ghost" className="w-full">
          <Trash className="text-destructive" />
          Delete
        </Button>
      </div>
    </div>
  );
}

export default UploadedInvoice;
