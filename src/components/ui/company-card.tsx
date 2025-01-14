import { ArrowRight } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent, CardFooter, CardHeader } from './card';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { Link } from 'react-router-dom';
import { useSelectedCompany } from '@/contexts/selected-company-context';
import EditCompany from '@/components/ui/edit-company';

interface CompanyCardProps {
  company: { id: number; name: string; address: string; logo?: string };
}

function CompanyCard({ company }: CompanyCardProps) {
  const { id, name, address, logo } = company;
  const { setSelectedCompany } = useSelectedCompany();

  return (
    <Card>
      <CardContent className="relative">
        <CardHeader className="space-y-8">
          <EditCompany />

          <AspectRatio
            ratio={16 / 9}
            className="flex justify-center dark:bg-white h-32 p-2 rounded-md  w-full"
          >
            <img src={logo} alt={name} />
          </AspectRatio>
        </CardHeader>

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
        <Button
          variant="outline"
          asChild
          onClick={() => setSelectedCompany(id.toString())}
          className="w-full"
        >
          <Link to={`/dashboard?id=${id}`}>
            View Details <ArrowRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CompanyCard;
