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
import {
  ChevronDown,
  MoreHorizontal,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
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
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };

    const formattedStartDay = `${parseInt(startDay)}${getOrdinalSuffix(parseInt(startDay))}`;
    const formattedEndDay = `${parseInt(endDay)}${getOrdinalSuffix(parseInt(endDay))}`;

    return {
      openDate: `${formattedStartDay} ${month}`,
      closeDate: `${formattedEndDay} ${month}`,
    };
  } catch (error) {
    console.error("Error splitting date range:", error);
    return { openDate: dateStr, closeDate: dateStr };
  }
};

const parseDate = (dateStr) => {
  if (!dateStr) return null;

  const match = dateStr.match(/(\d+)(?:st|nd|rd|th)?\s+([A-Za-z]+)/);
  if (!match) return null;

  const [, day, month] = match;
  const currentYear = new Date().getFullYear();
  const monthIndex = new Date(`${month} 1, ${currentYear}`).getMonth();

  return new Date(currentYear, monthIndex, parseInt(day));
};

const getStatus = (openDateStr, closeDateStr) => {
  const openDateObj = parseDate(openDateStr);
  const closeDateObj = parseDate(closeDateStr);

  if (!openDateObj || !closeDateObj) {
    return "Upcoming";
  }

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  if (currentDate >= openDateObj && currentDate <= closeDateObj) {
    return "Open";
  }
  if (currentDate > closeDateObj) {
    return "Closed";
  }
  return "Upcoming";
};

const statusColors = {
  Closed: "bg-[#EF0107]",
  Upcoming: "bg-[#FEBE10]",
  Open: "bg-[#03c02c]",
};

const columns = [
  {
    accessorKey: "IPOName",
    header: "IPO Name",
    cell: ({ row }) => {
      const { openDate, closeDate } = splitDateRange(row.original.ipoDate);
      const status = getStatus(openDate, closeDate);
      return (
        <div>
          {row.getValue("IPOName")}
          <span
            className={`ml-2 text-[0.65rem] p-1 rounded ${statusColors[status]}`}
          >
            {status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "ipoDate",
    header: "IPO Date Range",
    cell: ({ row }) => {
      const { openDate, closeDate } = splitDateRange(row.original.ipoDate);
      return (
        <div className="text-center">
          {openDate} - {closeDate}
        </div>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      const dateA = parseDate(splitDateRange(rowA.original.ipoDate).closeDate);
      const dateB = parseDate(splitDateRange(rowB.original.ipoDate).closeDate);

      if (!dateA) return -1;
      if (!dateB) return 1;

      return dateA.getTime() - dateB.getTime();
    },
  },
  {
    accessorKey: "priceRange",
    header: "Price Range",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("priceRange")}</div>
    ),
  },
  {
    accessorKey: "lotSize",
    header: "Lot Size",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("lotSize")}</div>
    ),
  },
  {
    accessorKey: "allotmentLink",
    header: "Allotment Link",
    cell: ({ row }) => (
      <a
        href={row.getValue("allotmentLink")}
        target="_blank"
        rel="noopener noreferrer"
        className="text-center hover:text-[#03c02c] hover:underline"
      >
        Allotment Link
      </a>
    ),
  },
  {
    accessorKey: "listingGain",
    header: "Listing Gain",
    cell: ({ row }) => {
      const listingGain = row.getValue("listingGain");

      if (listingGain === null) {
        return (
          <div className="text-center text-[#FEBE10]">Yet To Be Listed</div>
        );
      }

      const numericGain = parseFloat(listingGain);
      const isPositive = numericGain > 0;
      const isNegative = numericGain < 0;
      const isZero = numericGain === 0;
      return (
        <div className="text-center flex items-center justify-center">
          {isPositive && <ArrowUp className="mr-1" color="#03c02c" size={13} />}
          {isNegative && (
            <ArrowDown className="mr-1" color="#EF0107" size={13} />
          )}
          <span
            style={{
              color: isPositive
                ? "#03c02c"
                : isNegative
                ? "#EF0107"
                : isZero
                ? "#FEBE10"
                : "inherit",
            }}
          >
            {listingGain}%
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "CMP",
    cell: ({ row }) => {
      const price = row.original.price || 'N/A';
      const priceRange = row.original.priceRange || '';
      
      const calculateGain = () => {
        if (price === 'N/A' || !priceRange) return null;
        
        const cleanRange = priceRange.replace(/₹/g, '').split('–').map(p => p.trim());
        
        const upperBand = cleanRange.length > 1 
          ? parseFloat(cleanRange[1]) 
          : parseFloat(cleanRange[0]);
        
        const currentPrice = parseFloat(price);
        
        if (isNaN(upperBand) || isNaN(currentPrice)) return null;
        
        const gainAmount = currentPrice - upperBand;
        const gainPercentage = (gainAmount / upperBand) * 100;
        
        return {
          amount: gainAmount.toFixed(2),
          percentage: gainPercentage.toFixed(2)
        };
      };
      
      const gain = calculateGain();
      
      return (
        <div className="text-center">
          {price === 'N/A' ? (
            <span className="text-yellow-500">N/A</span>
          ) : (
            <div>
              <span className="font-medium">₹{price}</span>
              {gain && (
                <span
                  className={`ml-2 text-xs ${
                    gain.amount > 0 
                      ? 'text-green-600' 
                      : gain.amount < 0 
                        ? 'text-red-600' 
                        : 'text-yellow-500'
                  }`}
                >
                  ( {gain.percentage}%)
                </span>
              )}
            </div>
          )}
        </div>
      );
    },
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
  const [sorting, setSorting] = React.useState([
    { id: 'ipoDate', desc: true } // Default sorting by closing date descending
  ]);
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
          className="max-w-sm bg-[#111822]"
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
                    <TableHead
                      key={header.id}
                      className={
                        header.column.id !== "IPOName" ? "text-center" : ""
                      }
                    >
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
                    <TableCell
                      key={cell.id}
                      className={
                        cell.column.id !== "IPOName" ? "text-center" : ""
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
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