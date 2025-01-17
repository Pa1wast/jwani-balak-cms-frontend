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
import { AlertTriangle, ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';

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
import { Transaction } from '@/types/transaction';

export const data: Transaction[] = [
  {
    id: '530347e8-6881-46cd-a261-c9b2469a2817',
    type: 'SELL',
    currency: 'USD',
    pricePerUnit: 348.42,
    quantity: 21,
    productName: 'Product A',
    expenses: [{ name: 'Tax', amount: 32.36 }],
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
  },
  {
    id: '1ae24c97-d2c9-452d-b868-974014a497ae',
    type: 'SELL',
    currency: 'USD',
    pricePerUnit: 96.21,
    quantity: 98,
    productName: 'Product A',
    expenses: [
      { name: 'Packaging', amount: 29.6 },
      { name: 'Packaging', amount: 49.24 },
    ],
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
  },
  {
    id: 'cc660537-fd20-4376-8f5e-2d7e5ca00661',
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
  },
  {
    id: 'f9d35df6-0c29-4639-96e0-86f30f215e14',
    type: 'BUY',
    currency: 'USD',
    pricePerUnit: 198.96,
    quantity: 4,
    productName: 'Product B',
    expenses: [
      { name: 'Packaging', amount: 43.28 },
      { name: 'Shipping', amount: 32.54 },
    ],
  },
  {
    id: '357b7aaa-3ba6-4700-b5db-d3177c8c4f56',
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
  },
  {
    id: 'f2cdac78-e70f-4f61-b3fb-0322ace6386b',
    type: 'BUY',
    currency: 'IQD',
    pricePerUnit: 318.43,
    quantity: 32,
    productName: 'Product B',
    expenses: [{ name: 'Shipping', amount: 9.79 }],
  },
  {
    id: 'a45dcdb2-b84a-4d53-bcd0-d32aea5991bd',
    type: 'BUY',
    currency: 'IQD',
    pricePerUnit: 350.76,
    quantity: 91,
    productName: 'Product B',
    expenses: [
      { name: 'Packaging', amount: 8.99 },
      { name: 'Packaging', amount: 22.78 },
    ],
  },
  {
    id: '556a8c23-010b-42b9-9409-adfc951a90e2',
    type: 'BUY',
    currency: 'USD',
    pricePerUnit: 361.38,
    quantity: 57,
    productName: 'Product A',
    expenses: [
      { name: 'Packaging', amount: 8.48 },
      { name: 'Packaging', amount: 30.37 },
      { name: 'Packaging', amount: 28.88 },
    ],
  },
  {
    id: '7dfbc5fc-3bda-409e-8a95-08de75e2687f',
    type: 'BUY',
    currency: 'USD',
    pricePerUnit: 63.9,
    quantity: 45,
    productName: 'Product B',
    expenses: [
      { name: 'Shipping', amount: 11.51 },
      { name: 'Packaging', amount: 26.4 },
    ],
  },
  {
    id: 'cfc7f2b5-9a59-40fa-8144-f27f7ace4358',
    type: 'BUY',
    currency: 'USD',
    pricePerUnit: 32.86,
    quantity: 8,
    productName: 'Product A',
    expenses: [
      { name: 'Shipping', amount: 49.2 },
      { name: 'Tax', amount: 45.98 },
      { name: 'Shipping', amount: 13.68 },
    ],
  },
  {
    id: '19134c6f-1407-4a35-a3bb-305e743c67c6',
    type: 'SELL',
    currency: 'IQD',
    pricePerUnit: 231.54,
    quantity: 58,
    productName: 'Product B',
    expenses: [
      { name: 'Shipping', amount: 47.92 },
      { name: 'Tax', amount: 29.24 },
    ],
  },
  {
    id: 'a725fd71-01f6-4b21-bf03-8372eacde4a5',
    type: 'BUY',
    currency: 'USD',
    pricePerUnit: 121.62,
    quantity: 61,
    productName: 'Product C',
    expenses: [{ name: 'Packaging', amount: 42.87 }],
  },
  {
    id: '7b2a8bf3-88a2-41ce-ac4d-96dcc6e1362c',
    type: 'BUY',
    currency: 'IQD',
    pricePerUnit: 398.5,
    quantity: 69,
    productName: 'Product A',
    expenses: [
      { name: 'Shipping', amount: 44.31 },
      { name: 'Shipping', amount: 38.29 },
      { name: 'Tax', amount: 8.36 },
    ],
  },
  {
    id: '4e84d4ed-4d64-4ca1-8184-e6aec46852b0',
    type: 'BUY',
    currency: 'USD',
    pricePerUnit: 456.88,
    quantity: 78,
    productName: 'Product C',
    expenses: [
      { name: 'Tax', amount: 11.32 },
      { name: 'Shipping', amount: 25.79 },
    ],
  },
  {
    id: '862e0a4b-90ab-4026-af4b-3543c3b1c7f4',
    type: 'SELL',
    currency: 'IQD',
    pricePerUnit: 20.88,
    quantity: 58,
    productName: 'Product D',
    expenses: [
      { name: 'Packaging', amount: 36.49 },
      { name: 'Packaging', amount: 9.69 },
    ],
  },
  {
    id: 'be1a7d14-dd8d-4823-93a2-9bee0b7a86b8',
    type: 'BUY',
    currency: 'IQD',
    pricePerUnit: 401.85,
    quantity: 43,
    productName: 'Product A',
    expenses: [
      { name: 'Shipping', amount: 31.71 },
      { name: 'Shipping', amount: 6.58 },
    ],
  },
  {
    id: '821a30c3-69c9-43e7-9bb0-1253bb14a8de',
    type: 'BUY',
    currency: 'IQD',
    pricePerUnit: 351.24,
    quantity: 85,
    productName: 'Product B',
    expenses: [{ name: 'Shipping', amount: 45.36 }],
  },
  {
    id: 'a0239969-c615-40e3-ab8e-dddbc56b959c',
    type: 'BUY',
    currency: 'IQD',
    pricePerUnit: 270.63,
    quantity: 98,
    productName: 'Product A',
    expenses: [
      { name: 'Packaging', amount: 10.1 },
      { name: 'Tax', amount: 32.73 },
    ],
  },
  {
    id: 'e9b29e2c-d6a9-4eff-a2d3-e349f72a8612',
    type: 'SELL',
    currency: 'IQD',
    pricePerUnit: 467.03,
    quantity: 82,
    productName: 'Product D',
    expenses: [
      { name: 'Tax', amount: 37.36 },
      { name: 'Shipping', amount: 42.72 },
    ],
  },
  {
    id: 'ec937ebe-3753-44ac-a788-8b4bcf02c157',
    type: 'BUY',
    currency: 'USD',
    pricePerUnit: 227.13,
    quantity: 73,
    productName: 'Product D',
    expenses: [
      { name: 'Packaging', amount: 45.51 },
      { name: 'Shipping', amount: 12.74 },
    ],
  },
  {
    id: 'af5ef89f-2f7c-4a3b-8db6-1150e909dc22',
    type: 'SELL',
    currency: 'IQD',
    pricePerUnit: 164.78,
    quantity: 29,
    productName: 'Product C',
    expenses: [
      { name: 'Tax', amount: 6.57 },
      { name: 'Shipping', amount: 42.53 },
      { name: 'Tax', amount: 7.92 },
    ],
  },
  {
    id: 'afd7cdeb-2029-4eb9-9bc0-5e7af16c0d2d',
    type: 'BUY',
    currency: 'USD',
    pricePerUnit: 310.02,
    quantity: 38,
    productName: 'Product A',
    expenses: [
      { name: 'Packaging', amount: 44.77 },
      { name: 'Shipping', amount: 18.54 },
    ],
  },
  {
    id: '9712d4fd-4298-4e0e-b6a9-b8ec6262a4cb',
    type: 'BUY',
    currency: 'USD',
    pricePerUnit: 125.66,
    quantity: 51,
    productName: 'Product C',
    expenses: [{ name: 'Tax', amount: 7.4 }],
  },
  {
    id: '368daafa-26c7-461f-81bb-27314ab3b657',
    type: 'BUY',
    currency: 'IQD',
    pricePerUnit: 345.67,
    quantity: 27,
    productName: 'Product A',
    expenses: [
      { name: 'Tax', amount: 5.83 },
      { name: 'Shipping', amount: 20.84 },
      { name: 'Shipping', amount: 27.08 },
    ],
  },
  {
    id: '5ad1a94f-bbc0-4e15-b765-ae376f75667a',
    type: 'BUY',
    currency: 'IQD',
    pricePerUnit: 215.24,
    quantity: 7,
    productName: 'Product C',
    expenses: [
      { name: 'Tax', amount: 18.27 },
      { name: 'Packaging', amount: 36.97 },
    ],
  },
  {
    id: '81c91992-48b6-40d2-b098-c4b1fe1fbb6b',
    type: 'SELL',
    currency: 'USD',
    pricePerUnit: 200.32,
    quantity: 46,
    productName: 'Product D',
    expenses: [
      { name: 'Tax', amount: 21.02 },
      { name: 'Shipping', amount: 23.73 },
      { name: 'Shipping', amount: 38.04 },
    ],
  },
  {
    id: 'ab65905c-f351-4dec-84d4-fb449aefc88c',
    type: 'BUY',
    currency: 'USD',
    pricePerUnit: 471.1,
    quantity: 46,
    productName: 'Product C',
    expenses: [{ name: 'Tax', amount: 26.45 }],
  },
  {
    id: '6de57426-3568-40d1-aa45-711663a1fa81',
    type: 'SELL',
    currency: 'IQD',
    pricePerUnit: 452.68,
    quantity: 29,
    productName: 'Product B',
    expenses: [
      { name: 'Tax', amount: 32.72 },
      { name: 'Tax', amount: 8.12 },
      { name: 'Shipping', amount: 24.97 },
    ],
  },
  {
    id: 'd3c7add5-8c15-4c3f-9b0d-a69ff01a0b03',
    type: 'BUY',
    currency: 'IQD',
    pricePerUnit: 370.96,
    quantity: 14,
    productName: 'Product B',
    expenses: [{ name: 'Packaging', amount: 25.41 }],
  },
  {
    id: '58e2ac93-be59-47b7-b6b1-5fc63a1eb123',
    type: 'SELL',
    currency: 'USD',
    pricePerUnit: 271.31,
    quantity: 55,
    productName: 'Product D',
    expenses: [
      { name: 'Packaging', amount: 17.9 },
      { name: 'Tax', amount: 16.79 },
      { name: 'Packaging', amount: 36.65 },
    ],
  },
  {
    id: 'e8a5bee6-66d0-4866-b6ee-3bf01b06da4b',
    type: 'BUY',
    currency: 'USD',
    pricePerUnit: 417.07,
    quantity: 29,
    productName: 'Product D',
    expenses: [
      { name: 'Shipping', amount: 23.04 },
      { name: 'Tax', amount: 13.55 },
      { name: 'Packaging', amount: 24.28 },
    ],
  },
  {
    id: '9758328e-4f00-402c-a7bc-68686d79083e',
    type: 'BUY',
    currency: 'IQD',
    pricePerUnit: 326.47,
    quantity: 43,
    productName: 'Product A',
    expenses: [
      { name: 'Shipping', amount: 19.59 },
      { name: 'Tax', amount: 9.01 },
      { name: 'Packaging', amount: 43.93 },
    ],
  },
  {
    id: 'ef78ad2f-a4be-4d4d-aa64-819f39de8008',
    type: 'BUY',
    currency: 'IQD',
    pricePerUnit: 214.54,
    quantity: 60,
    productName: 'Product D',
    expenses: [
      { name: 'Shipping', amount: 39.64 },
      { name: 'Tax', amount: 6.53 },
    ],
  },
  {
    id: '9aee7acb-9917-449d-9442-0bc2a4237231',
    type: 'SELL',
    currency: 'IQD',
    pricePerUnit: 153.44,
    quantity: 98,
    productName: 'Product B',
    expenses: [
      { name: 'Packaging', amount: 14.89 },
      { name: 'Packaging', amount: 6.74 },
      { name: 'Packaging', amount: 29.96 },
    ],
  },
  {
    id: 'a1b7b5d8-314e-45d9-9912-585816bbce6c',
    type: 'BUY',
    currency: 'USD',
    pricePerUnit: 205.3,
    quantity: 91,
    productName: 'Product B',
    expenses: [
      { name: 'Tax', amount: 45.92 },
      { name: 'Shipping', amount: 10.74 },
    ],
  },
  {
    id: '8b5857d0-190e-4ce7-bdc5-58b13dedec5c',
    type: 'BUY',
    currency: 'USD',
    pricePerUnit: 357.26,
    quantity: 9,
    productName: 'Product D',
    expenses: [
      { name: 'Packaging', amount: 18.07 },
      { name: 'Tax', amount: 47.17 },
    ],
  },
  {
    id: '14b205d4-39f2-4834-adf7-eab64e9f1a32',
    type: 'BUY',
    currency: 'IQD',
    pricePerUnit: 200.77,
    quantity: 71,
    productName: 'Product D',
    expenses: [
      { name: 'Tax', amount: 27.63 },
      { name: 'Tax', amount: 47.52 },
    ],
  },
  {
    id: '5890204f-f14a-4d7b-b521-1ec8d40a8e82',
    type: 'BUY',
    currency: 'USD',
    pricePerUnit: 342.69,
    quantity: 92,
    productName: 'Product A',
    expenses: [
      { name: 'Shipping', amount: 10.84 },
      { name: 'Tax', amount: 23.19 },
      { name: 'Shipping', amount: 28.69 },
    ],
  },
  {
    id: '9328c935-f181-4ff1-b9f5-da76ba8a13d3',
    type: 'BUY',
    currency: 'USD',
    pricePerUnit: 438.6,
    quantity: 77,
    productName: 'Product A',
    expenses: [{ name: 'Shipping', amount: 7.86 }],
  },
  {
    id: '525d2b2c-455a-49f9-861a-23d9e634b4dc',
    type: 'BUY',
    currency: 'USD',
    pricePerUnit: 310.37,
    quantity: 61,
    productName: 'Product D',
    expenses: [
      { name: 'Packaging', amount: 49.54 },
      { name: 'Packaging', amount: 30.83 },
      { name: 'Tax', amount: 37.46 },
    ],
  },
  {
    id: 'ab1d2160-2ccd-43c4-908a-b1c8092b5b04',
    type: 'SELL',
    currency: 'USD',
    pricePerUnit: 377.02,
    quantity: 34,
    productName: 'Product C',
    expenses: [
      { name: 'Shipping', amount: 5.24 },
      { name: 'Packaging', amount: 12.56 },
      { name: 'Shipping', amount: 32.71 },
    ],
  },
  {
    id: '17f2455b-e0d7-4059-b8fc-73979c437b9c',
    type: 'SELL',
    currency: 'IQD',
    pricePerUnit: 198.95,
    quantity: 89,
    productName: 'Product D',
    expenses: [
      { name: 'Packaging', amount: 7.1 },
      { name: 'Packaging', amount: 23.47 },
    ],
  },
  {
    id: '3dc2d5ff-b474-4d2f-be68-45843e25e656',
    type: 'SELL',
    currency: 'USD',
    pricePerUnit: 53.8,
    quantity: 84,
    productName: 'Product D',
    expenses: [
      { name: 'Packaging', amount: 5.34 },
      { name: 'Tax', amount: 22.56 },
      { name: 'Packaging', amount: 20.84 },
    ],
  },
  {
    id: '5b4a0439-f90f-4729-a51f-538bdb8df6e6',
    type: 'BUY',
    currency: 'IQD',
    pricePerUnit: 321.16,
    quantity: 69,
    productName: 'Product A',
    expenses: [{ name: 'Packaging', amount: 25.11 }],
  },
  {
    id: '31a10f5c-3a67-47a0-b20c-39bab7755fd4',
    type: 'BUY',
    currency: 'IQD',
    pricePerUnit: 128.5,
    quantity: 38,
    productName: 'Product D',
    expenses: [
      { name: 'Packaging', amount: 45.25 },
      { name: 'Shipping', amount: 8.81 },
      { name: 'Packaging', amount: 16.48 },
    ],
  },
];

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'id',
    header: () => <div className="text-left">#ID</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium hidden sm:block">#{row.getValue('id')}</div>
    ),
  },
  {
    accessorKey: 'productName',
    enableHiding: false,
    header: 'Name',
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
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
      return <div>{price}</div>;
    },
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Stock Quantity
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{Number(row.getValue('quantity'))}</div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.id)}>
              Copy transaction ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Delete transaction
              <AlertTriangle className="ml-auto dark:text-red-500 text-destructive" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
          placeholder="Filter products..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={event => table.getColumn('name')?.setFilterValue(event.target.value)}
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
                    className={cn('capitalize', column.id === 'id' && 'hidden sm:flex')}
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id === 'id'
                      ? 'ID'
                      : column.id === 'quantity'
                      ? 'Stock Quantity'
                      : column.id}
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
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead
                      key={header.id}
                      className={header.id === 'id' ? 'hidden sm:table-cell' : ''}
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
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      className={cell.id.includes('id') ? 'hidden sm:table-cell' : ''}
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
