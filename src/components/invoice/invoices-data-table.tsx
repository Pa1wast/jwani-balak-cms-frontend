/* eslint-disable react-refresh/only-export-components */
import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import Loader from '../ui/loader';
import { useInvoices } from '@/features/invoice.ts/useInvoices';
import { Invoice } from '@/types/invoice';
import InvoiceRowActions from './invoice-row-actions';
import { currencyTypes, Transaction, transactionTypes } from '@/types/transaction';
import { formatPrice } from '@/lib/price';

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: '_id',
    header: () => <div className="text-left">#ID</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium hidden sm:block">#{row.getValue('_id')}</div>
    ),
  },

  {
    accessorKey: 'addressedTo',
    enableHiding: false,
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Addressed To
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue('addressedTo')}</div>,
  },
  {
    accessorKey: 'buyer',
    enableHiding: false,
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Buyer
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue('buyer')}</div>,
  },
  {
    accessorKey: 'seller',
    enableHiding: false,
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Seller
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue('seller')}</div>,
  },
  {
    accessorKey: 'transactions',
    enableHiding: false,
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Transactions
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const transactions = row.getValue('transactions') as Transaction[];
      return <div className="capitalize">{transactions?.length}</div>;
    },
  },
  {
    accessorKey: 'transactions',
    enableHiding: false,
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Total
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const transactions = row.getValue('transactions') as Transaction[];
      const transactionsWithTotal = transactions?.map(transaction => {
        let total = transaction.pricePerUnit * transaction.quantity;

        if (
          transaction.transactionType.toUpperCase() === transactionTypes.BUY &&
          transaction.expenses?.length
        ) {
          total += transaction.expenses.reduce((acc, expense) => acc + expense.amount, 0);
        }

        return {
          ...transaction,
          total,
        };
      });

      const totalAmount = transactionsWithTotal?.reduce((acc, cur) => acc + cur.total, 0);
      return (
        <div className="capitalize font-semibold">
          {formatPrice(totalAmount, transactions[0]?.currency as currencyTypes)}
        </div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const invoice = row.original;
      const invoiceId = invoice._id;

      return <InvoiceRowActions invoiceId={invoiceId} />;
    },
  },
];

export default function InvoicesDataTable() {
  const { isLoading, invoices } = useInvoices();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState(''); // Added state for global filter

  const table = useReactTable({
    data: invoices,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    filterFns: {
      globalFilterFn: (row, filterValue) => {
        const idMatch = (row.getValue('_id') as string)
          .toLowerCase()
          .includes(filterValue.toLowerCase());
        const addressedToMatch = (row.getValue('addressedTo') as string)
          .toLowerCase()
          .includes(filterValue.toLowerCase());
        return idMatch || addressedToMatch;
      },
    },
  });

  if (isLoading)
    return (
      <div className="h-full w-full grid items-center">
        <Loader className="mt-20" />
      </div>
    );

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="Filter invoice by ID or addressed to..."
          value={globalFilter}
          onChange={e => {
            setGlobalFilter(e.target.value);
            table.setGlobalFilter(e.target.value);
          }}
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className={cn('capitalize', column.id === '_id' && 'hidden sm:flex')}
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id === '_id' ? 'ID' : column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    className={header.id === '_id' ? 'hidden sm:table-cell' : ''}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      className={cell.id.includes('_id') ? 'hidden sm:table-cell' : ''}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
