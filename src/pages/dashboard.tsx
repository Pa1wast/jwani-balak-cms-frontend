import { useCompanies } from '@/contexts/companies-context';
import { companies } from '@/pages/home';
import CompanyDetails from '@/components/ui/company-details';
import CompanyBarChart from '@/components/ui/company-bar-chart';
import { Card } from '@/components/ui/card';
import { Banknote, SquareArrowDown, SquareArrowUp } from 'lucide-react';
import CompanyLineChart from '@/components/ui/company-line-chart';

function Dashboard() {
  const { selectedCompanyId } = useCompanies();
  const company = companies.find(company => company.id === Number(selectedCompanyId));

  if (!company) return <p>Could not load company data!</p>;

  return (
    <div>
      <CompanyDetails company={company} />

      <div className="space-y-2 mt-10">
        <div className="flex gap-1 flex-col md:flex-row">
          <Card className="flex gap-1 items-center  p-3 h-max flex-1 flex-wrap">
            <SquareArrowDown className="text-destructive" />
            <span className="text-sm text-foreground/60">Total Expenses</span>
            <p className="ml-auto text-lg font-semibold ">$400.90</p>
          </Card>

          <Card className="flex gap-1 items-center  p-3 h-max flex-1 flex-wrap">
            <Banknote className="text-primary" />
            <span className="text-sm text-foreground/60">Total Revenue</span>
            <p className="ml-auto text-lg font-semibold">$400.90</p>
          </Card>

          <Card className="flex gap-1 items-center  p-3 h-max flex-1 flex-wrap">
            <SquareArrowUp className="text-green-500" />
            <span className="text-sm text-foreground/60">Total Profits</span>
            <p className="ml-auto text-lg font-semibold">$400.90</p>
          </Card>
        </div>

        <CompanyBarChart />

        <CompanyLineChart />
      </div>
    </div>
  );
}

export default Dashboard;
