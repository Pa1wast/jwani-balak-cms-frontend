import { Card, CardContent } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { FilePlus, Image, Pen, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Company } from '@/types/company';

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
import UpdateCompanyForm from './update-company-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useDeleteCompany } from '@/features/company/useDeleteCompany';
import { Link, useNavigate } from 'react-router-dom';
import { getCompanyImgLocalPath } from '@/lib/getImgLocalPath';

interface CompanyDetailsProps {
  company: Company;
}

function CompanyDetails({ company }: CompanyDetailsProps) {
  const navigate = useNavigate();
  const { isDeleting, deleteCompany } = useDeleteCompany();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_3fr_1fr] gap-2">
      <Card
        className={cn(
          'overflow-hidden flex items-center justify-center',
          company.logo && 'dark:bg-white'
        )}
      >
        <CardContent className="p-2 w-60 h-40 flex items-center justify-center">
          {company.logo ? (
            <img
              src={getCompanyImgLocalPath(company.logo)}
              alt={company.companyName}
              className="max-w-56 max-h-32"
            />
          ) : (
            <Image className="size-24 text-secondary" />
          )}
        </CardContent>
      </Card>

      <Card className="p-2 flex items-center gap-6 justify-center flex-1 flex-col">
        <div className="flex gap-1 items-center bg-secondary/40 p-2 rounded-lg w-full">
          <p className="text-lg">Name:</p>
          <p className="font-semibold text-xl">{company.companyName}</p>
        </div>
        <div className="flex gap-1 items-center bg-secondary/40 p-2 rounded-lg w-full">
          <p className="text-sm">Address:</p>
          <p className="truncate text-wrap">{company.address}</p>
        </div>
      </Card>

      <Card className="sm:col-span-2 md:col-span-1">
        <CardContent className="p-2 grid grid-cols-1 justify-between items-center h-full sm:grid-cols-[1fr_max-content_1fr] gap-2 md:flex md:flex-col">
          <Button size="sm" variant="ghost" className="w-full  h-full" asChild>
            <Link to="/pdf/report/:reportId">
              <FilePlus /> Generate Summary Report
            </Link>
          </Button>

          <div className="w-full h-[1px] sm:h-full sm:w-[1px] bg-foreground/20 md:w-full md:h-[1px]" />

          <div className="space-y-1 w-full">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="ghost" className="w-full h-8">
                  <Pen />
                  Edit
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
                <Button size="sm" variant="destructive" className="w-full h-8">
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
                    onClick={() => {
                      deleteCompany(company._id);
                      navigate('/');
                    }}
                    disabled={isDeleting}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CompanyDetails;
