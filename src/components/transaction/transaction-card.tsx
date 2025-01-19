import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { currencyTypes, Transaction, transactionTypes } from '@/types/transaction';
import { formatDate } from '@/lib/date';
import { formatPrice } from '@/lib/price';

interface TransactionCardProps {
  transaction: Transaction;
}

function TransactionCard({ transaction }: TransactionCardProps) {
  return (
    <Link to={`/dashboard/transactions/${transaction._id}`} className="block">
      <Card className="p-2 relative  hover:border-foreground/50 dark:border-foreground/50 dark:hover:border-border">
        <CardHeader className="p-2 flex-row items-center space-y-0 gap-2">
          <div
            className={cn(
              'w-2 h-2  rounded-full',
              transaction.transactionType === transactionTypes.SELL ? 'bg-green-700' : 'bg-blue-500'
            )}
          />
          <p className="text-foreground/60 text-sm font-medium">
            {transaction.transactionType === transactionTypes.BUY ? 'Buy' : 'Sell'} Transaction
          </p>
        </CardHeader>

        <CardContent className="p-2 bg-secondary/30 rounded-lg grid grid-cols-2 gap-y-4 truncate">
          <p className="text-xs col-span-2 ">
            Product Name:
            {transaction.product ? (
              <span className="font-bold inline-block ml-2">{transaction.product.productName}</span>
            ) : (
              <span className="font-medium inline-block ml-2 bg-red-200 text-red-500 px-1 rounded-lg">
                Unavailable
              </span>
            )}
          </p>

          <p className="text-xs">
            Price / Unit:
            <span className="font-bold inline-block ml-2">
              {formatPrice(transaction.pricePerUnit, transaction.currency as currencyTypes)}
            </span>
          </p>

          <p className="text-xs">
            Quantity:
            <span className="font-bold inline-block ml-2">{transaction.quantity}</span>
          </p>
        </CardContent>

        <Separator className="my-2" />

        <CardFooter className="p-2 flex items-center justify-between gap-4">
          <p className="col-span-2 text-xs">
            Total Cost:
            <span className="inline-block ml-2 font-bold">
              {formatPrice(
                transaction.pricePerUnit * transaction.quantity,
                transaction.currency as currencyTypes
              )}
            </span>
          </p>

          <p className="col-span-2 ml-auto text-xs font-light">
            {formatDate(transaction.createdAt)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default TransactionCard;
