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
import { toast } from 'sonner';
import { downloadInvoice } from '@/api/invoice.ts/download-uploaded-invoice';

interface UploadedInvoiceProps {
  invoice: UploadedInvoice;
}

function UploadedInvoice({ invoice }: UploadedInvoiceProps) {
  const { isDeleting, deleteUploadedInvoice } = useDeleteUploadedInvoice();

  const handleDownload = async () => {
    try {
      const file = await downloadInvoice(invoice.filePath);

      const url = window.URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(String(error));
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
        <File className="size-14 mx-auto my-auto h-40" />
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
