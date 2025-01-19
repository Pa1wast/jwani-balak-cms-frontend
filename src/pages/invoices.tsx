import InvoicesDataTable from '@/components/invoice/invoices-data-table';

function Invoices() {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <h1 className="font-semibold text-lg md:text-xl">Invoices</h1>
        <p className="text-xs md:text-sm">View, and download invoices here.</p>
      </div>

      <InvoicesDataTable />
    </div>
  );
}

export default Invoices;
