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
import { currencyTypes, transactionTypes, Transaction } from '@/types/transaction';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectGroup, SelectItem } from '../ui/select';
import { SelectTrigger } from '@radix-ui/react-select';
import { useTransactions } from '@/features/transaction/useTransactions';
import Loader from '../ui/loader';
import { formatDate } from '@/lib/date';
import { ComposedProduct } from '@/types/product';
import TransactionRowActions from './transaction-row-actions';

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: '_id',
    enableHiding: false,
    header: () => <div className="text-left">#ID</div>,
    cell: ({ row }) => <div className="text-left font-medium">#{row?.getValue('_id')}</div>,
  },
  {
    accessorKey: 'type',
    header: () => {
      return <div className="capitalize font-bold truncate max-w-[200px]">Type</div>;
    },
    cell: ({ row }) => {
      const transactionType =
        'expenses' in row.original ? transactionTypes.BUY : transactionTypes.SELL;

      return (
        <Badge
          className={cn(
            'text-left font-bold flex justify-center items-center rounded-md px-2 w-max uppercase',
            transactionType === transactionTypes.SELL
              ? 'bg-green-500 dark:bg-green-500/20 dark:text-green-500 hover:bg-green-500/80 dark:hover:bg-green-500/60'
              : 'bg-blue-500 dark:bg-blue-500/20 dark:text-blue-500 hover:bg-blue-500/80 dark:hover:bg-blue-500/60'
          )}
        >
          {transactionType}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'currency',
    header: ({ column }) => {
      const handleFilterChange = (value: currencyTypes) => {
        column.setFilterValue(value === currencyTypes.ALL ? undefined : value);
      };

      return (
        <Select onValueChange={handleFilterChange}>
          <SelectTrigger className="hiddem sm:flex w-max" asChild>
            <Button variant="ghost">
              Currency
              <ChevronDown />
            </Button>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={currencyTypes.ALL}>ALL</SelectItem>
              <SelectItem value={currencyTypes.IQD}>IQD</SelectItem>
              <SelectItem value={currencyTypes.USD}>USD</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
    cell: ({ row }) => {
      const currency = row.getValue('currency') as string;
      return (
        <Badge
          variant="outline"
          className={cn(
            'text-left font-bold flex justify-center items-center rounded-md px-2 w-max',
            currency === currencyTypes.IQD
              ? 'border-orange-500  text-orange-500 dark:border-orange-500/20 dark:text-orange-500 hover:border-orange-500/80 dark:hover:border-orange-500/60'
              : 'border-cyan-500  text-cyan-500 dark:border-cyan-500/20 dark:text-cyan-500 hover:border-cyan-500/80 dark:hover:border-cyan-500/60'
          )}
        >
          {currency}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'label',
    enableHiding: false,
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Label
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <div className="capitalize font-bold truncate max-w-[200px]">{row.getValue('label')}</div>
      );
    },
  },
  {
    accessorKey: 'products',
    enableHiding: false,
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Total Price
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const products = row.getValue('products') as ComposedProduct[];

      const totalPrice = products.reduce((acc, cur) => {
        return acc + cur.quantity * cur.pricePerUnit;
      }, 0);

      const currency = row._valuesCache.currency;

      const formattedPriceValue = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(totalPrice);

      const formattedPrice =
        currency === currencyTypes.IQD ? `${formattedPriceValue} IQD` : `$${formattedPriceValue}`;

      return (
        <div
          className={cn(
            'font-semibold',
            currency === currencyTypes.IQD
              ? 'text-orange-500  dark:text-orange-500'
              : 'text-cyan-500  dark:text-cyan-500'
          )}
        >
          {formattedPrice}
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Date
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as string;
      return <div className="capitalize truncate">{formatDate(date)}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <>
          <TransactionRowActions transaction={transaction} />
        </>
      );
    },
  },
];

export default function TransactionDataTable() {
  const { isLoading, transactions } = useTransactions();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: transactions,
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
          placeholder="Filter transactions by label..."
          value={(table.getColumn('label')?.getFilterValue() as string) ?? ''}
          onChange={event => {
            table.getColumn('label')?.setFilterValue(event.target.value);
          }}
          className="md:max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hidden md:flex">
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
                    className={cn('capitalize', column.id === 'currency' && 'hidden lg:flex')}
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id === 'createdAt'
                      ? 'Date'
                      : column.id === 'type'
                      ? 'Type'
                      : column.id === 'pricePerUnit'
                      ? 'Price / Unit'
                      : column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="hidden md:table-header-group">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        header.id === 'currency' ? 'hidden lg:table-cell' : '',
                        header.id === '_id' && 'hidden'
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} className="grid w-full flex-wrap relative md:table-row">
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        'flex-1 md:flex-none',
                        cell.id.includes('currency') && 'hidden lg:table-cell',
                        cell.id.includes('_id') && 'hidden',
                        cell.id.includes('action') && ''
                      )}
                    >
                      <div
                        className={cn(
                          'flex gap-2 p-2 rounded-lg md:hidden',
                          !cell.id.includes('actions') && 'bg-secondary/20'
                        )}
                      >
                        {cell.id.includes('type') && (
                          <p className="md:hidden font-medium opacity-60">Type: </p>
                        )}
                        {cell.id.includes('products') && (
                          <p className="md:hidden font-medium opacity-60">Total Price: </p>
                        )}
                        {cell.id.includes('createdAt') && (
                          <p className="md:hidden font-medium opacity-60">Date: </p>
                        )}
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>

                      <div className="md:table-cell hidden">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
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
        <div className="space-x-2">
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
    </div>
  );
}
