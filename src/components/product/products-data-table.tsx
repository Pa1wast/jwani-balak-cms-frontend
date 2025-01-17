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
import { Product } from '@/types/product';

export const data: Product[] = [
  { id: 'asasdfsdag353425b34b53s', name: 'Product 1', quantity: 1001 },
  { id: '2', name: 'Product 2', quantity: 1002 },
  { id: '3', name: 'Product 3', quantity: 1003 },
  { id: '4', name: 'Product 4', quantity: 1004 },
  { id: '5', name: 'Product 5', quantity: 1005 },
  { id: '6', name: 'Product 6', quantity: 1006 },
  { id: '7', name: 'Product 7', quantity: 1007 },
  { id: '8', name: 'Product 8', quantity: 1008 },
  { id: '9', name: 'Product 9', quantity: 1009 },
  { id: '10', name: 'Product 10', quantity: 1010 },
  { id: '11', name: 'Product 11', quantity: 1011 },
  { id: '12', name: 'Product 12', quantity: 1012 },
  { id: '13', name: 'Product 13', quantity: 1013 },
  { id: '14', name: 'Product 14', quantity: 1014 },
  { id: '15', name: 'Product 15', quantity: 1015 },
  { id: '16', name: 'Product 16', quantity: 1016 },
  { id: '17', name: 'Product 17', quantity: 1017 },
  { id: '18', name: 'Product 18', quantity: 1018 },
  { id: '19', name: 'Product 19', quantity: 1019 },
  { id: '20', name: 'Product 20', quantity: 1020 },
  { id: '21', name: 'Product 21', quantity: 1021 },
  { id: '22', name: 'Product 22', quantity: 1022 },
  { id: '23', name: 'Product 23', quantity: 1023 },
  { id: '24', name: 'Product 24', quantity: 1024 },
  {
    id: '25',
    name: 'Product 25 sdjgfhsdja gjhsdak ghkdjs hgkasd hg dasf sdag sg sdag sda gsdag dsag ds dsgsdgdsgsdg dsg dsg s',
    quantity: 1025,
  },
  { id: '26', name: 'Product 26', quantity: 1026 },
  { id: '27', name: 'Product 27', quantity: 1027 },
  { id: '28', name: 'Product 28', quantity: 1028 },
  { id: '29', name: 'Product 29', quantity: 1029 },
  { id: '30', name: 'Product 30', quantity: 1030 },
  { id: '31', name: 'Product 31', quantity: 1031 },
  { id: '32', name: 'Product 32', quantity: 1032 },
  { id: '33', name: 'Product 33', quantity: 1033 },
  { id: '34', name: 'Product 34', quantity: 1034 },
  { id: '35', name: 'Product 35', quantity: 1035 },
  { id: '36', name: 'Product 36', quantity: 1036 },
  { id: '37', name: 'Product 37', quantity: 1037 },
  { id: '38', name: 'Product 38', quantity: 1038 },
  { id: '39', name: 'Product 39', quantity: 1039 },
  { id: '40', name: 'Product 40', quantity: 1040 },
  { id: '41', name: 'Product 41', quantity: 1041 },
  { id: '42', name: 'Product 42', quantity: 1042 },
  { id: '43', name: 'Product 43', quantity: 1043 },
  { id: '44', name: 'Product 44', quantity: 1044 },
  { id: '45', name: 'Product 45', quantity: 1045 },
  { id: '46', name: 'Product 46', quantity: 1046 },
  { id: '47', name: 'Product 47', quantity: 1047 },
  { id: '48', name: 'Product 48', quantity: 1048 },
  { id: '49', name: 'Product 49', quantity: 1049 },
  { id: '50', name: 'Product 50', quantity: 1050 },
];

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'id',
    header: () => <div className="text-left">#ID</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium hidden sm:block">#{row.getValue('id')}</div>
    ),
  },
  {
    accessorKey: 'name',
    enableHiding: false,
    header: 'Name',
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Stock Quantity
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('quantity')}</div>,
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
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Delete product
              <AlertTriangle className="ml-auto dark:text-red-500 text-destructive" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function ProductsDataTable() {
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
          placeholder="Filter products by name..."
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
