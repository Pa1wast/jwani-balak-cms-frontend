import { ArrowRight, Ellipsis } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent, CardFooter, CardHeader } from './card';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { Link } from 'react-router-dom';

interface CompanyCardProps {
  company: { id: number; name: string; address: string; logo?: string };
}

function CompanyCard({ company }: CompanyCardProps) {
  const { id, name, address, logo } = company;
  return (
    <Card>
      <CardHeader className="relative space-y-8">
        <Button variant="ghost" size="icon" className="ml-auto absolute right-1 top-1 z-10">
          <Ellipsis />
        </Button>

        <AspectRatio
          ratio={16 / 9}
          className="flex justify-center dark:bg-white h-32 p-2 rounded-md  w-full"
        >
          <img src={logo} alt={name} />
        </AspectRatio>
      </CardHeader>

      <CardContent>
        <div className="bg-slate-100 dark:bg-primary/20 p-2 rounded-lg">
          <div className="flex gap-1 items-center">
            <p className="text-xs">Name:</p>
            <p className="font-semibold text-sm">{name}</p>
          </div>

          <div className="flex gap-1 items-center ">
            <p className="text-xs">Address:</p>
            <p className="text-sm truncate">{address}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="outline" asChild>
          <Link to={`/dashboard?id=${id}`}>
            View Details <ArrowRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CompanyCard;
