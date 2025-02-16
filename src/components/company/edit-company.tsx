import { CircleAlert, Ellipsis, Pen, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import useIsMobile from '@/hooks/useIsMobile';
import { useDeleteCompany } from '@/features/company/useDeleteCompany';
import { Company } from '@/types/company';
import UpdateCompanyForm from '@/components/company/update-company-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface EditCompanyProps {
  dialog?: boolean;
  company: Company;
}

function EditCompany({ dialog, company }: EditCompanyProps) {
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isEditCompanyOpen, setIsEditCompanyOpen] = useState(false);
  const isMobile = useIsMobile();
  const { isDeleting, deleteCompany } = useDeleteCompany();

  if (isMobile || dialog)
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto absolute right-1 top-1 z-10">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="mx-4">
            <DropdownMenuItem className="cursor-pointer" onClick={() => setIsEditCompanyOpen(true)}>
              <Pen /> Edit
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer" onClick={() => setIsDeletePopupOpen(true)}>
              <Trash /> Delete
              <CircleAlert className="ml-auto text-destructive dark:text-red-500" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={isEditCompanyOpen} onOpenChange={setIsEditCompanyOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update company information</DialogTitle>
            </DialogHeader>

            <UpdateCompanyForm company={company} />
          </DialogContent>
        </Dialog>

        <AlertDialog open={isDeletePopupOpen} onOpenChange={setIsDeletePopupOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="text-background hover:bg-destructive/80 bg-destructive dark:hover:bg-red-500/80 dark:text-foreground dark:bg-red-500"
                onClick={() => deleteCompany(company._id)}
                disabled={isDeleting}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );

  return (
    <div className="flex gap-1">
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline">
            <Pen /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update company information</DialogTitle>
          </DialogHeader>

          <UpdateCompanyForm company={company} />
        </DialogContent>
      </Dialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="destructive">
            <Trash /> Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="text-background hover:bg-destructive/80 bg-destructive dark:hover:bg-red-500/80 dark:text-foreground dark:bg-red-500"
              onClick={() => deleteCompany(company._id)}
              disabled={isDeleting}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default EditCompany;
