import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { Link } from 'react-router-dom';
import { useCompaniesView } from '@/contexts/companies-view-context';
import EditCompany from '@/components/company/edit-company';
import useIsMobile from '@/hooks/useIsMobile';
import { Company, listViewTypes } from '@/types/company';
import { getCompanyImgLocalPath } from '@/lib/getImgLocalPath';

interface CompanyCardProps {
  company: Company;
}

function CompanyCard({ company }: CompanyCardProps) {
  const { _id, companyName, address, logo } = company;
  const { setSelectedCompany, listView } = useCompaniesView();

  const isMobile = useIsMobile();

  if (!isMobile && listView === listViewTypes.ROW)
    return (
      <Card className="flex h-40 justify-between">
        <CardContent className="p-3 flex flex-1 gap-8">
          <div className="flex justify-center items-center px-4 py-2 h-full dark:bg-white w-32 rounded-md">
            <img src={getCompanyImgLocalPath(logo)} alt={companyName} />
          </div>

          <div className="bg-slate-100 dark:bg-primary/20 p-4 w-full flex flex-col justify-between rounded-lg max-w-[400px] md:max-w-none">
            <div className="flex gap-1 items-center">
              <p className="text-sm">Name:</p>
              <p className="font-semibold text-lg">{companyName}</p>
            </div>

            <div className="flex gap-1 items-start">
              <p className="text-sm">Address:</p>
              <p className="truncate text-wrap">{address}</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col justify-between p-3">
          <EditCompany dialog={false} company={company} />

          <Button
            variant="outline"
            asChild
            onClick={() => setSelectedCompany(company._id)}
            className="w-full"
          >
            <Link to="/dashboard">
              View Details <ArrowRight />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );

  return (
    <Card>
      <CardContent className="relative">
        <CardHeader className="space-y-8">
          <EditCompany dialog={listView === listViewTypes.GRID} company={company} />

          <AspectRatio
            ratio={16 / 9}
            className="flex justify-center dark:bg-white h-32 p-2 rounded-md  w-full"
          >
            <img src={getCompanyImgLocalPath(logo)} alt={companyName} />
          </AspectRatio>
        </CardHeader>

        <div className="bg-slate-100 dark:bg-primary/20 p-2 rounded-lg">
          <div className="flex gap-1 items-center">
            <p className="text-xs">Name:</p>
            <p className="font-semibold text-sm">{companyName}</p>
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
          onClick={() => setSelectedCompany(_id)}
          className="w-full"
        >
          <Link to="/dashboard">
            View Details <ArrowRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CompanyCard;
