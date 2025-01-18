import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ReceiptText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const invoices = [
  {
    id: 1,
    to: 'بورهان مەجید',
    type: 'Buy',
    quantity: 10,
    pricePerUniT: '10,000 IQD',
    totalCost: '100,000 IQD',
  },
  {
    id: 2,
    to: 'فارس محمد',
    type: 'Sell',
    quantity: 5,
    pricePerUniT: '15,000 IQD',
    totalCost: '75,000 IQD',
  },
  {
    id: 3,
    to: 'رامی حەسەن',
    type: 'Buy',
    quantity: 20,
    pricePerUniT: '8,500 IQD',
    totalCost: '170,000 IQD',
  },
  {
    id: 4,
    to: 'نادیە علی',
    type: 'Sell',
    quantity: 7,
    pricePerUniT: '12,000 IQD',
    totalCost: '84,000 IQD',
  },
  {
    id: 5,
    to: 'سەرەدەر قەدری',
    type: 'Buy',
    quantity: 15,
    pricePerUniT: '9,000 IQD',
    totalCost: '135,000 IQD',
  },
  {
    id: 6,
    to: 'هەفال حەسەنی',
    type: 'Sell',
    quantity: 12,
    pricePerUniT: '11,500 IQD',
    totalCost: '138,000 IQD',
  },
  {
    id: 7,
    to: 'جەمیل قەدری',
    type: 'Buy',
    quantity: 8,
    pricePerUniT: '13,000 IQD',
    totalCost: '104,000 IQD',
  },
  {
    id: 8,
    to: 'کریم جەبار',
    type: 'Sell',
    quantity: 3,
    pricePerUniT: '20,000 IQD',
    totalCost: '60,000 IQD',
  },
  {
    id: 9,
    to: 'شادیە هەریم',
    type: 'Buy',
    quantity: 25,
    pricePerUniT: '7,500 IQD',
    totalCost: '187,500 IQD',
  },
  {
    id: 10,
    to: 'نازیە توفیق',
    type: 'Sell',
    quantity: 10,
    pricePerUniT: '18,000 IQD',
    totalCost: '180,000 IQD',
  },
];

function Invoices() {
  return (
    <div className="flex flex-col gap-2">
      {invoices.map(invoice => (
        <Card key={invoice.id}>
          <CardContent className="flex flex-col">
            <p>{invoice.to}</p>
            <p>{invoice.type}</p>
            <p>{invoice.pricePerUniT}</p>
            <p>{invoice.quantity}</p>
            <p>{invoice.totalCost}</p>
          </CardContent>

          <CardFooter>
            <Button asChild>
              <Link to={`/pdf/invoice/${invoice.id}`}>
                <ReceiptText />
                View Details
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Invoices;
