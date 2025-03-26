import { useProducts } from '@/features/product/useProducts';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../ui/loader';
import ErrorMessage from '../ui/error-message';
import { useTransactions } from '@/features/transaction/useTransactions';
import { currencyTypes, Transaction } from '@/types/transaction';
import { Card, CardContent, CardFooter, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Pen, Trash } from 'lucide-react';
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
} from '../ui/alert-dialog';
import { useDeleteProduct } from '@/features/product/useDeleteProduct';
import UpdateProductForm from './update-product-form';
import { formatPrice } from '@/lib/price';

function ProductDetails() {
  const { productId } = useParams();
  const { isDeleting, deleteProduct } = useDeleteProduct();
  const navigate = useNavigate();
  const { isLoading, error, products } = useProducts();
  const { isLoading: isLoading2, transactions } = useTransactions();

  if (isLoading || isLoading2) return <Loader />;

  if (error) return <ErrorMessage message={error.message} />;

  const product = products.find(product => product._id === productId);

  if (isLoading) return <Loader size="sm" text={false} />;

  const filteredTransactions = transactions?.filter((transaction: Transaction) =>
    transaction.products.some(product => product.product === productId)
  );

  const buyTransactions = filteredTransactions.filter(
    (transaction: Transaction) => 'expenses' in transaction
  );

  const currency = buyTransactions[0]?.currency ?? 'IQD';

  const sellTransactions = filteredTransactions.filter(
    (transaction: Transaction) => !('expenses' in transaction)
  );

  const buyQuantity = buyTransactions
    ?.map((transaction: Transaction) =>
      transaction.products.reduce((acc, cur) => (acc += cur.quantity), 0)
    )
    .reduce((acc: number, cur: number) => (acc += cur), 0);
  const sellQuantity = sellTransactions
    ?.map((transaction: Transaction) =>
      transaction.products.reduce((acc, cur) => (acc += cur.quantity), 0)
    )
    .reduce((acc: number, cur: number) => (acc += cur), 0);

  const stockQuantity = buyQuantity - sellQuantity;

  const totalPrice = buyTransactions
    ?.map((transaction: Transaction) =>
      transaction.products.reduce((acc, cur) => {
        if (transaction.currency === 'USD') {
          return acc + cur.quantity * cur.pricePerUnit * (cur.exchange?.rate ?? 1);
        } else {
          return acc + cur.quantity * cur.pricePerUnit;
        }
      }, 0)
    )
    .reduce((acc: number, cur: number) => acc + cur, 0);

  const totalRevenue = sellTransactions
    ?.map((transaction: Transaction) =>
      transaction.products.reduce((acc, cur) => {
        if (transaction.currency === currencyTypes.USD) {
          return acc + cur.quantity * cur.pricePerUnit * (cur.exchange?.rate ?? 1);
        } else {
          return acc + cur.quantity * cur.pricePerUnit;
        }
      }, 0)
    )
    .reduce((acc: number, cur: number) => acc + cur, 0);

  if (!product) return <ErrorMessage message="Product not found" />;

  return (
    <div>
      <div className="space-y-2 mb-2">
        <div className="flex gap-1 flex-wrap sm:flex-nowrap">
          <Card className="overflow-hidden w-full">
            <CardContent className="flex gap-10 flex-row flex-wrap p-4 ">
              <div className="flex flex-wrap flex-1 items-center justify-between gap-4">
                <p className="text-lg text-foreground/60 min-w-max">Product Name:</p>
                <p className="text-lg text-foreground min-w-max">{product.productName}</p>
              </div>
            </CardContent>

            <CardFooter className="flex-row p-4 items-center justify-between w-full">
              <p className="text-lg text-foreground/60">Stock Quantity: </p>
              <p className="text-lg text-foreground min-w-max">{stockQuantity}</p>
            </CardFooter>
          </Card>

          <Card className="w-full sm:w-max">
            <CardContent className="flex flex-col gap-1 pt-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" variant="outline">
                    <Pen />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update transaction</DialogTitle>
                  </DialogHeader>
                  <UpdateProductForm product={product} />
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full" variant="destructive">
                    <Trash />
                    Delete
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      All related sell transaction will be deleted as well. This action cannot be
                      undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="text-background hover:bg-destructive/80 bg-destructive dark:hover:bg-red-500/80 dark:text-foreground dark:bg-red-500"
                      onClick={() => {
                        deleteProduct(product._id);
                        navigate('/dashboard/products');
                      }}
                      disabled={isDeleting}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-1 flex-wrap sm:flex-nowrap">
          <Card className="overflow-hidden w-full">
            <CardContent className="flex gap-10 flex-row flex-wrap p-4 ">
              <div className="flex flex-wrap flex-1 items-center justify-between gap-4">
                <p className="text-lg text-foreground/60">Buy Transactions: </p>
                <p className="text-lg text-foreground min-w-max">{buyTransactions.length}</p>
              </div>
            </CardContent>

            <CardFooter className="flex-row p-4 items-center justify-between w-full">
              <p className="text-lg text-foreground/60">Sell Transactions: </p>
              <p className="text-lg text-foreground min-w-max">{sellTransactions.length}</p>
            </CardFooter>
          </Card>
        </div>

        <div className="flex gap-1 flex-wrap sm:flex-nowrap">
          <Card className="overflow-hidden w-full">
            <CardContent className="flex gap-10 flex-row flex-wrap p-4 ">
              <div className="flex flex-wrap flex-1 items-center justify-between gap-4">
                <p className="text-lg text-foreground/60">Total Price: </p>
                <p className="text-lg text-foreground min-w-max">
                  {formatPrice(totalPrice, currency)}
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex-row p-4 items-center justify-between w-full">
              <p className="text-lg text-foreground/60">Total Revenue: </p>
              <p className="text-lg text-foreground min-w-max">
                {formatPrice(totalRevenue, currency)}
              </p>
            </CardFooter>
          </Card>
        </div>

        <div className="flex gap-1 flex-col">
          <Card className="overflow-hidden w-full">
            <CardContent className="p-4">
              <CardTitle className="mb-4">Buy Transactions</CardTitle>

              <div className="space-y-1">
                {!buyTransactions.length ? (
                  <p>No transactions yet!</p>
                ) : (
                  buyTransactions?.map((transaction: Transaction) => (
                    <Link
                      to={`/dashboard/transactions/${transaction._id}`}
                      className="bg-foreground/10 p-2 rounded-sm flex justify-between hover:bg-foreground/20"
                    >
                      <div className="flex gap-2">
                        <p>Label:</p> <p>{transaction.label}</p>
                      </div>

                      <div className="flex gap-2">
                        <p>Products:</p> <p>{transaction.products.length}</p>
                      </div>

                      <div className="flex gap-2">
                        <p>Total:</p>{' '}
                        <p>
                          {formatPrice(
                            transaction.products?.reduce(
                              (acc, cur) => (acc += cur.pricePerUnit * cur.quantity),
                              0
                            ),
                            transaction.currency as currencyTypes
                          )}
                        </p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden w-full">
            <CardContent className="p-4">
              <CardTitle className="mb-4">Sell Transactions</CardTitle>

              <div className="space-y-1">
                {!sellTransactions.length ? (
                  <p>No transactions yet!</p>
                ) : (
                  sellTransactions?.map((transaction: Transaction) => (
                    <Link
                      to={`/dashboard/transactions/${transaction._id}`}
                      className="bg-foreground/10 p-2 rounded-sm flex justify-between hover:bg-foreground/20"
                    >
                      <div className="flex gap-2">
                        <p>Label:</p> <p>{transaction.label}</p>
                      </div>

                      <div className="flex gap-2">
                        <p>Products:</p> <p>{transaction.products.length}</p>
                      </div>

                      <div className="flex gap-2">
                        <p>Total:</p>{' '}
                        <p>
                          {formatPrice(
                            transaction.products?.reduce(
                              (acc, cur) => (acc += cur.pricePerUnit * cur.quantity),
                              0
                            ),
                            transaction.currency as currencyTypes
                          )}
                        </p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
