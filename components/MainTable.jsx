"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const splitDateRange = (dateStr) => {
  if (!dateStr) return { openDate: "", closeDate: "" };

  try {
    const [startStr, endStr] = dateStr.split("–").map((d) => d.trim());

    const startMatch = startStr.match(/(\d+)(?:st|nd|rd|th)?/);
    const endMatch = endStr.match(/(\d+)(?:st|nd|rd|th)?\s+([A-Za-z]+)/);

    if (!startMatch || !endMatch) {
      return { openDate: dateStr, closeDate: dateStr };
    }

    const [, startDay] = startMatch;
    const [, endDay, month] = endMatch;

    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const formattedStartDay = `${parseInt(startDay)}${getOrdinalSuffix(
      parseInt(startDay)
    )}`;
    const formattedEndDay = `${parseInt(endDay)}${getOrdinalSuffix(
      parseInt(endDay)
    )}`;

    return {
      openDate: `${formattedStartDay} ${month}`,
      closeDate: `${formattedEndDay} ${month}`,
    };
  } catch (error) {
    console.error("Error splitting date range:", error);
    return { openDate: dateStr, closeDate: dateStr };
  }
};

const columns = [
  {
    accessorKey: "IPOName",
    header: "IPO Name",
    cell: ({ row }) => <div>{row.getValue("IPOName")}</div>,
  },
  {
    accessorKey: "openDate",
    header: "Open Date",
    cell: ({ row }) => <div className="text-center">{splitDateRange(row.original.ipoDate).openDate}</div>,
  },
  {
    accessorKey: "closeDate",
    header: "Close Date",
    cell: ({ row }) => <div className="text-center">{splitDateRange(row.original.ipoDate).closeDate}</div>,
  },
  {
    accessorKey: "priceRange",
    header: "Price Range",
    cell: ({ row }) => <div className="text-center">{row.getValue("priceRange")}</div>,
  },
  {
    accessorKey: "lotSize",
    header: "Lot Size",
    cell: ({ row }) => <div className="text-center">{row.getValue("lotSize")}</div>,
  },
  {
    accessorKey: "allotmentLink",
    header: "Allotment Link",
    cell: ({ row }) => (
      <a href={row.getValue("allotmentLink")} target="_blank" rel="noopener noreferrer" className="text-center">
        Allotment Link
      </a>
    ),
  },
  {
    accessorKey: "listingGain",
    header: "Listing Gain",
    cell: ({ row }) => <div className="text-center">{row.getValue("listingGain") ?? "N/A"}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const ipo = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View More Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableDemo({ data }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter IPOs..."
          value={table.getColumn("IPOName")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("IPOName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className={header.column.id !== "IPOName" ? "text-center" : ""}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={cell.column.id !== "IPOName" ? "text-center" : ""}>
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