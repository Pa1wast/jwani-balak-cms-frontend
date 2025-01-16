import { Card, CardContent } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Download, Eye, FilePlus, Files, Image, Pen, Trash, View } from 'lucide-react';
import { cn } from '@/lib/utils';

function CompanyDetails({ company }) {
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
            <img src={company.logo} alt={company.name} className="max-w-56 max-h-32" />
          ) : (
            <Image className="size-24 text-secondary" />
          )}
        </CardContent>
      </Card>

      <Card className="p-2 flex items-center gap-6 justify-center flex-1 flex-col">
        <div className="flex gap-1 items-center bg-secondary/40 p-2 rounded-lg w-full">
          <p className="text-lg">Company:</p>
          <p className="font-semibold text-xl">{company.name}</p>
        </div>
        <div className="flex gap-1 items-center bg-secondary/40 p-2 rounded-lg w-full">
          <p className="text-sm">Address:</p>
          <p className="truncate text-wrap">{company.address}</p>
        </div>
      </Card>

      <Card className="sm:col-span-2 md:col-span-1">
        <CardContent className="p-2 grid grid-cols-1 sm:grid-cols-[1fr_max-content_1fr] gap-2 md:flex md:flex-col">
          <div className="space-y-1">
            <Button size="sm" variant="ghost" className="w-full h-8">
              <FilePlus /> Generate Full Report
            </Button>
            <Button size="sm" variant="ghost" className="w-full h-8">
              <Files /> View Klesh Notes
            </Button>
          </div>

          <div className="w-full h-[1px] sm:h-full sm:w-[1px] bg-foreground/20 md:w-full md:h-[1px]" />

          <div className="space-y-1">
            <Button size="sm" variant="ghost" className="w-full h-8">
              <Pen />
              Edit
            </Button>
            <Button size="sm" variant="destructive" className="w-full h-8">
              <Trash /> Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CompanyDetails;
