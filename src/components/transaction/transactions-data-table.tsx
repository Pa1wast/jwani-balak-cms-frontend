/* eslint-disable react-refresh/only-export-components */
'use client';

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
import {
  AlertCircle,
  ArrowUpDown,
  ChevronDown,
  Copy,
  FilePlus,
  MoreHorizontal,
  Trash,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { currencyTypes, Transaction, transactionTypes } from '@/types/transaction';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectGroup, SelectItem } from '../ui/select';
import { SelectTrigger } from '@radix-ui/react-select';
import { Link } from 'react-router-dom';

export const data: Transaction[] = [
  {
    id: '530347e8-6881-46cd-a261-c9b2469a2817',
    type: 'SELL',
    currency: 'USD',
    pricePerUnit: 34834346.42,
    quantity: 21,
    productName: 'Product A sgdf dsgd gdf gdf gdfsg d',
    expenses: [{ name: 'Tax', amount: 32.36 }],
    createdAt: new Date('2023-01-15T10:30:00Z'),
  },
  {
    id: '410b54ae-987a-4813-92c2-b91c87c00752',
    type: 'SELL',
    currency: 'IQD',
    pricePerUnit: 260.07,
    quantity: 60,
    productName: 'Product C',
    expenses: [
      { name: 'Shipping', amount: 24.03 },
      { name: 'Tax', amount: 44.87 },
    ],
    createdAt: new Date('2023-02-18T14:15:00Z'),
  },
  {
    id: '6b5e692f-c125-4256-8102-7939f4e4500e',
    type: 'SELL',
    currency: 'USD',
    pricePerUnit: 466.15,
    quantity: 52,
    productName: 'Product A',
    expenses: [
      { name: 'Packaging', amount: 34.08 },
      { name: 'Tax', amount: 35.01 },
    ],
    createdAt: new Date('2023-03-22T08:45:00Z'),
  },
  {
    id: '0d3d7b79-6279-4548-9a2a-731960b75d64',
    type: 'SELL',
    currency: 'USD',
    pricePerUnit: 132.17,
    quantity: 13,
    productName: 'Product C',
    expenses: [
      { name: 'Shipping', amount: 7.52 },
      { name: 'Packaging', amount: 11.57 },
      { name: 'Shipping', amount: 11.98 },
    ],
    createdAt: new Date('2023-03-22T08:45:00Z'),
  },
  {
    id: '926a5d05-c616-4650-a574-ee956970384f',
    type: 'SELL',
    currency: 'IQD',
    pricePerUnit: 25.48,
    quantity: 30,
    productName: 'Product A',
    expenses: [
      { name: 'Shipping', amount: 39.01 },
      { name: 'Tax', amount: 10.02 },
    ],
    createdAt: new Date('2023-05-10T09:20:00Z'),
  },
  {
    id: '1ae24c97-d2c9-452d-3b868-974014a497ae',
    type: 'SELL',
    currency: 'USD',
    pricePerUnit: 96.21,
    quantity: 98,
    productName: 'Product A',
    expenses: [
      { name: 'Packaging', amount: 29.6 },
      { name: 'Packaging', amount: 49.24 },
    ],
    createdAt: new Date('2023-06-25T16:40:00Z'),
  },
  {
    id: 'a2b11eaf-f00a-427f-9e53-68f7978d11d3',
    type: 'SELL',
    currency: 'IQD',
    pricePerUnit: 253.79,
    quantity: 1,
    productName: 'Product D',
    expenses: [
      { name: 'Packaging', amount: 21.23 },
      { name: 'Tax', amount: 40.14 },
    ],
    createdAt: new Date('2023-07-07T19:15:00Z'),
  },
  {
    id: 'cc660537-fd20-4376-8f5e-2d7e5ca006661',
    type: 'BUY',
    currency: 'IQD',
    pricePerUnit: 472.45,
    quantity: 95,
    productName: 'Product A',
    expenses: [
      { name: 'Shipping', amount: 29.93 },
      { name: 'Tax', amount: 30.68 },
      { name: 'Packaging', amount: 15.27 },
    ],
    createdAt: new Date('2023-08-12T13:30:00Z'),
  },
  {
    id: 'f9d35d3f6-0c29-4639-96e0-86f30f215e14',
    type: 'BUY',
    currency: 'USD',
    pricePerUnit: 198.96,
    quantity: 4,
    productName: 'Product B',
    expenses: [
      { name: 'Packaging', amount: 43.28 },
      { name: 'Shipping', amount: 32.54 },
    ],
    createdAt: new Date('2023-09-05T15:45:00Z'),
  },
  {
    id: '357b7aaa-3ba6-4700-b5db-d36177c8c4f56',
    type: 'SELL',
    currency: 'USD',
    pricePerUnit: 144.39,
    quantity: 59,
    productName: 'Product A',
    expenses: [
      { name: 'Shipping', amount: 49.98 },
      { name: 'Shipping', amount: 28.46 },
      { name: 'Shipping', amount: 48.24 },
    ],
    createdAt: new Date('2023-09-15T11:10:00Z'),
  },
  {
    id: '357b7aaa-3ba6-4700-b5db-d3177cvv8c4f56',
    type: 'SELL',
    currency: 'USD',
    pricePerUnit: 144.39,
    quantity: 59,
    productName: 'Product A',
    expenses: [
      { name: 'Shipping', amount: 49.98 },
      { name: 'Shipping', amount: 28.46 },
      { name: 'Shipping', amount: 48.24 },
    ],
    createdAt: new Date('2023-09-15T11:10:00Z'),
  },
  {
    id: '357b7aaa-3ba6-4700-b5db-d3177dfc8c4f56',
    type: 'SELL',
    currency: 'USD',
    pricePerUnit: 144.39,
    quantity: 59,
    productName: 'Product A',
    expenses: [
      { name: 'Shipping', amount: 49.98 },
      { name: 'Shipping', amount: 28.46 },
      { name: 'Shipping', amount: 48.24 },
    ],
    createdAt: new Date('2023-09-15T11:10:00Z'),
  },
  {
    id: '357b7dfaaa-3ba6-4700-b5db-d3177c8c4f56',
    type: 'SELL',
    currency: 'USD',
    pricePerUnit: 144.39,
    quantity: 46,
    productName: 'Product A',
    expenses: [
      { name: 'Shipping', amount: 498.98 },
      { name: 'Shipping', amount: 28.46 },
      { name: 'Shipping', amount: 48.24 },
    ],
    createdAt: new Date('2023-09-15T11:10:00Z'),
  },
  {
    id: '357b7aaa-3ba6-43700-b5db-d3177c8c4f56',
    type: 'SELL',
    currency: 'USD',
    pricePerUnit: 144.39,
    quantity: 59,
    productName: 'Product A',
    expenses: [
      { name: 'Shipping', amount: 49.98 },
      { name: 'Shipping', amount: 28.46 },
      { name: 'Shipping', amount: 48.24 },
    ],
    createdAt: new Date('2023-09-15T11:10:00Z'),
  },
];

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'id',
    header: () => <div className="text-left">#ID</div>,
    cell: ({ row }) => <div className="text-left font-medium">#{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      const handleFilterChange = (value: transactionTypes) => {
        column.setFilterValue(value === transactionTypes.ALL ? undefined : value);
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
              <SelectItem value={transactionTypes.ALL}>ALL</SelectItem>
              <SelectItem value={transactionTypes.SELL}>SELL</SelectItem>
              <SelectItem value={transactionTypes.BUY}>BUY</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
    cell: ({ row }) => {
      const type = row.getValue('type') as string;
      return (
        <Badge
          className={cn(
            'text-left font-bold flex justify-center items-center rounded-md px-2 w-max',
            type === transactionTypes.SELL
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
    accessorKey: 'productName',
    enableHiding: false,
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Product
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      return <div className="capitalize font-bold truncate">{row.getValue('productName')}</div>;
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
      const date = row.getValue('createdAt') as Date;
      console.log({ date, id: row.id });
      return (
        <div className="capitalize truncate">{date ? date.toLocaleDateString('en-GB') : '_'}</div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 hidden md:flex">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem>
                <Link to={`/dashboard/transactions/${row.getValue('id')}`}>View details</Link>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.id)}>
                Copy transaction ID
              </DropdownMenuItem>

              <DropdownMenuItem>Generate invoice</DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                Delete transaction
                <AlertCircle className="ml-auto dark:text-red-500 text-destructive" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="md:hidden flex justify-between w-full">
            <div className="flex gap-2 items-center">
              <Button variant="outline" size="icon">
                <Copy />
              </Button>

              <Button variant="outline" size="icon">
                <FilePlus />
              </Button>
            </div>

            <Button variant="destructive" size="icon" className="">
              <Trash />
            </Button>
          </div>
        </>
      );
    },
  },
];

export default function TransactionDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
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

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="Filter transactions by product name..."
          value={(table.getColumn('productName')?.getFilterValue() as string) ?? ''}
          onChange={event => table.getColumn('productName')?.setFilterValue(event.target.value)}
          className="md:max-w-sm "
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
                    className={cn(
                      'capitalize',
                      column.id === 'currency' && 'hidden lg:flex',
                      column.id === 'id' && 'hidden lg:flex'
                    )}
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id === 'id' ? 'ID' : column.id}
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
                        header.id === 'id' && 'hidden'
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
                        cell.id.includes('id') && 'hidden',
                        cell.id.includes('action') && ''
                      )}
                    >
                      <div
                        className={cn(
                          'flex justify-between p-2 rounded-lg md:hidden',
                          !cell.id.includes('actions') && 'bg-secondary/20'
                        )}
                      >
                        {cell.id.includes('type') && (
                          <p className="md:hidden font-medium opacity-60">Type: </p>
                        )}
                        {cell.id.includes('productName') && (
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
