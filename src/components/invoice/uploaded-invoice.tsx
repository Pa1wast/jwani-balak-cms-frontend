import { Button } from '@/components/ui/button';
import { useDeleteUploadedInvoice } from '@/features/invoice.ts/useDeleteUploadedInvoice';
import { getUploadedInvoiceImgLocalPath, isImage } from '@/lib/getImgLocalPath';
import { type UploadedInvoice } from '@/types/invoice';
import { Download, EllipsisVertical, File, Trash } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Separator } from '../ui/separator';

interface UploadedInvoiceProps {
  invoice: UploadedInvoice;
}

function UploadedInvoice({ invoice }: UploadedInvoiceProps) {
  const { isDeleting, deleteUploadedInvoice } = useDeleteUploadedInvoice();

  const handleDownload = async () => {
    try {
      const fileUrl = getUploadedInvoiceImgLocalPath(invoice.filePath);

      // Fetch the file as a Blob
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error('File download failed');

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = invoice.name || 'invoice-file';
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div className="flex flex-col border rounded-md">
      <Button variant="ghost" className="p-1" asChild>
        {isImage(invoice.filePath) ? (
          <img
            src={getUploadedInvoiceImgLocalPath(invoice.filePath)}
            alt={invoice.name}
            className="w-full h-40"
          />
        ) : (
          <div className="w-full h-40">
            <File />
          </div>
        )}
      </Button>

      <Separator />

      <div className="flex justify-between items-center p-1">
        <p className="font-semibold truncate max-w-[150px] text-right">{invoice.name}</p>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVertical />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="flex flex-col w-max">
            <Button variant="ghost" onClick={handleDownload}>
              <Download />
              Download
            </Button>

            <Button
              variant="ghost"
              onClick={() => deleteUploadedInvoice(invoice._id)}
              disabled={isDeleting}
            >
              <Trash className="text-destructive" />
              Delete
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default UploadedInvoice;
