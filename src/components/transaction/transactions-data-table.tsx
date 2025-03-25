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
import { ArrowUpDown, ChevronDown, FilePlus } from 'lucide-react';

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
import { currencyTypes, BuyTransaction } from '@/types/transaction';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectGroup, SelectItem } from '../ui/select';
import { SelectTrigger } from '@radix-ui/react-select';
import { useBuyTransactions } from '@/features/transaction/useTransactions';
import Loader from '../ui/loader';
import { formatDate } from '@/lib/date';
import { Product } from '@/types/product';
import TransactionRowActions from './transaction-row-actions';
import { Checkbox } from '../ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import AddInvoiceForm from '../invoice/add-invoice-form';

export const columns: ColumnDef<BuyTransaction>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: '_id',
    enableHiding: false,
    header: () => <div className="text-left">#ID</div>,
    cell: ({ row }) => <div className="text-left font-medium">#{row.getValue('_id')}</div>,
  },
  {
    accessorKey: 'transactionType',
    header: ({ column }) => {
      const handleFilterChange = (value: string) => {
        column.setFilterValue(value === 'ALL' ? undefined : value);
      };

      return (
        <Select onValueChange={handleFilterChange}>
          <SelectTrigger className="w-[180px]" asChild>
            <Button className="justify-start w-max" variant="ghost">
              Type
              <ChevronDown />
            </Button>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={'ALL'}>ALL</SelectItem>
              <SelectItem value={'BUY'}>BUY</SelectItem>
              <SelectItem value={'SELL'}>SELL</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
    cell: ({ row }) => {
      const type = row.getValue('transactionType') as string;

      return (
        <Badge
          className={cn(
            'text-left font-bold flex justify-center items-center rounded-md px-2 w-max uppercase',
            type.toUpperCase() === 'SELL'
              ? 'bg-green-500 dark:bg-green-500/20 dark:text-green-500 hover:bg-green-500/80 dark:hover:bg-green-500/60'
              : 'bg-blue-500 dark:bg-blue-500/20 dark:text-blue-500 hover:bg-blue-500/80 dark:hover:bg-blue-500/60'
          )}
        >
          {type}
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
    accessorKey: 'product',
    enableHiding: false,
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Product
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const product = row.getValue('product') as Product;
      return (
        <div className="capitalize font-bold truncate max-w-[200px]">
          {product?.productName ? (
            product.productName
          ) : (
            <p className="bg-red-500/20 font-medium text-red-500 px-2 rounded-lg w-max">
              Unavailable
            </p>
          )}
        </div>
      );
    },
    filterFn: (row, _, filterValue) => {
      const product = row.getValue('product') as Product;
      return product?.productName.toLowerCase().includes(filterValue.toLowerCase());
    },
  },
  {
    accessorKey: 'pricePerUnit',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Price / Unit
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('pricePerUnit'));
      const currency = row._valuesCache.currency;

      const formattedPriceValue = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price);

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
    accessorKey: 'quantity',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Quantity
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="font-bold">{row.getValue('quantity')}</div>,
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
  const { isLoading, transactions } = useBuyTransactions();

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
          placeholder="Filter transactions by product name..."
          value={(table.getColumn('product')?.getFilterValue() as string) ?? ''}
          onChange={event => table.getColumn('product')?.setFilterValue(event.target.value)}
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
                      : column.id === 'transactionType'
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
                        {cell.id.includes('product') && (
                          <p className="md:hidden font-medium opacity-60">Product name: </p>
                        )}
                        {cell.id.includes('pricePerUnit') && (
                          <p className="md:hidden font-medium opacity-60">Price / Unit: </p>
                        )}
                        {cell.id.includes('quantity') && (
                          <p className="md:hidden font-medium opacity-60">Quantity: </p>
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
