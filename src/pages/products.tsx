import { Button } from '@/components/ui/button';
import ProductsDataTable from '@/components/ui/products-data-table';
import { Plus } from 'lucide-react';

import AddProductForm from '@/components/ui/add-product-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

function Products() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-semibold text-lg md:text-xl">Products</h1>
          <p className="text-xs md:text-sm">View, edit, and manage products here.</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a product</DialogTitle>
            </DialogHeader>

            <AddProductForm />
          </DialogContent>
        </Dialog>
      </div>

      <ProductsDataTable />
    </div>
  );
}

export default Products;
