import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from './card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { transactionTypes } from './company-line-chart';

interface TransactionCardProps {
  transaction: {
    type: string;
    totalCost: string;
    date: Date;
    productName: string;
    pricePerUnit: string;
    quantity: number;
  };
}

function TransactionCard({ transaction }: TransactionCardProps) {
  return (
    <Link to="/dashboard/transactions" className="block">
      <Card className="p-2 relative  hover:border-foreground/50">
        <CardHeader className="p-2 flex-row items-center space-y-0 gap-2">
          <div
            className={cn(
              'w-2 h-2  rounded-full',
              transaction.type === transactionTypes.SELL ? 'bg-green-700' : 'bg-blue-500'
            )}
          />
          <p className="text-foreground/60 text-sm font-medium">
            {transaction.type === transactionTypes.BUY ? 'Buy' : 'Sell'} Transaction
          </p>
        </CardHeader>

        <CardContent className="p-2 bg-secondary/30 rounded-lg grid grid-cols-2 gap-y-4 truncate">
          <p className="text-xs col-span-2 ">
            Product Name:
            <span className="font-bold inline-block ml-2">{transaction.productName}</span>
          </p>

          <p className="text-xs">
            Price/Unit:
            <span className="font-bold inline-block ml-2">{transaction.pricePerUnit}</span>
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
            <span className="inline-block ml-2 font-bold">{transaction.totalCost}</span>
          </p>

          <p className="col-span-2 ml-auto text-xs font-light">{`${transaction.date.getDay()}/${
            transaction.date.getMonth() + 1
          }/${transaction.date.getFullYear()}`}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default TransactionCard;
