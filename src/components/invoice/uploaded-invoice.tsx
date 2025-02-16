import { Button } from '@/components/ui/button';
import { useDeleteUploadedInvoice } from '@/features/invoice.ts/useDeleteUploadedInvoice';
import { getUploadedInvoiceImgLocalPath, isImage } from '@/lib/getImgLocalPath';
import { type UploadedInvoice } from '@/types/invoice';
import { Download, EllipsisVertical, File, Trash } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Separator } from '../ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface UploadedInvoiceProps {
  invoice: UploadedInvoice;
}

function UploadedInvoice({ invoice }: UploadedInvoiceProps) {
  const { isDeleting, deleteUploadedInvoice } = useDeleteUploadedInvoice();

  const getFileNameWithExtension = () => {
    const filePath = invoice.filePath;
    const name = invoice.name;

    // Extract file extension from filePath
    const extensionMatch = filePath.match(/\.[0-9a-z]+$/i);
    const extension = extensionMatch ? extensionMatch[0] : '';

    // Ensure filename has an extension
    return name.includes('.') ? name : `${name}${extension}`;
  };

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
      link.download = getFileNameWithExtension(); // Ensure correct filename
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div className="flex flex-col border rounded-md overflow-hidden">
      {isImage(invoice.filePath) ? (
        <img
          src={getUploadedInvoiceImgLocalPath(invoice.filePath)}
          alt={invoice.name}
          className="w-full h-40"
        />
      ) : (
        <File className="size-14 mx-auto my-auto" />
      )}

      <Separator />

      <div className="flex justify-between items-center p-1">
        <p className="font-medium text-sm ml-2 truncate max-w-[150px] text-right">{invoice.name}</p>

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

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost">
                  <Trash className="text-destructive" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and
                    remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="text-background hover:bg-destructive/80 bg-destructive dark:hover:bg-red-500/80 dark:text-foreground dark:bg-red-500"
                    onClick={() => deleteUploadedInvoice(invoice._id)}
                    disabled={isDeleting}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default UploadedInvoice;
