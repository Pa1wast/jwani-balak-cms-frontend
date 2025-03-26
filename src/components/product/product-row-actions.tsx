import { AlertCircle, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { useDeleteProduct } from '@/features/product/useDeleteProduct';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import UpdateProductForm from '@/components/product/update-product-form';
import { Product } from '@/types/product';
import { Link } from 'react-router-dom';

function ProductRowActions({ product }: { product: Product }) {
  const { isDeleting, deleteProduct } = useDeleteProduct();

  return (
    <>
      <Dialog>
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem asChild>
                <Link to={`/dashboard/products/${product._id}`}>View Details</Link>
              </DropdownMenuItem>

              <DialogTrigger asChild>
                <DropdownMenuItem>Edit product</DropdownMenuItem>
              </DialogTrigger>

              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product._id)}>
                Copy product ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialogTrigger asChild>
                <DropdownMenuItem>
                  Delete product
                  <AlertCircle className="ml-auto dark:text-red-500 text-destructive" />
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="text-background hover:bg-destructive/80 bg-destructive dark:hover:bg-red-500/80 dark:text-foreground dark:bg-red-500"
                disabled={isDeleting}
                onClick={() => deleteProduct(product._id)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update product name</DialogTitle>
          </DialogHeader>

          <UpdateProductForm product={product} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProductRowActions;
