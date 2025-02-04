"use client";

import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
} from "@/components/ui/table2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { IpoCommonDataContext } from "@/app/Context/IpoCommonDataContext";

// Enhanced date parsing function
const parseFullDate = (dateStr) => {
  if (!dateStr) return null;

  try {
    // Split the date range
    const [startStr, endStr] = dateStr.split("–").map((d) => d.trim());

    // Months mapping
    const monthMap = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };

    // Extract day and month from end date
    const endMatch = endStr.match(/(\d+)(?:st|nd|rd|th)?\s+([A-Za-z]+)/);
    if (!endMatch) return null;

    const [, endDay, endMonthStr] = endMatch;
    const currentYear = new Date().getFullYear();
    const endMonth = monthMap[endMonthStr];

    return new Date(currentYear, endMonth, parseInt(endDay));
  } catch (error) {
    console.error("Error parsing date:", error);
    return null;
  }
};

// Helper functions for status determination
const parseDate = (dateStr) => {
  if (!dateStr) return null;

  const match = dateStr.match(/(\d+)(?:st|nd|rd|th)?\s+([A-Za-z]+)/);
  if (!match) return null;

  const [, day, month] = match;
  const currentYear = new Date().getFullYear();
  const monthIndex = new Date(`${month} 1, ${currentYear}`).getMonth();

  return new Date(currentYear, monthIndex, parseInt(day));
};

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

    return {
      openDate: `${parseInt(startDay)} ${month}`,
      closeDate: `${parseInt(endDay)} ${month}`,
    };
  } catch (error) {
    console.error("Error splitting date range:", error);
    return { openDate: dateStr, closeDate: dateStr };
  }
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
  Closed: "bg-[#EF0107] text-white",
  Upcoming: "bg-[#FEBE10] text-black",
  Open: "bg-[#03c02c] text-white",
};

const getColumns = () => [
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
    sortingFn: (rowA, rowB) => {
      const dateA = parseFullDate(rowA.original.ipoDate);
      const dateB = parseFullDate(rowB.original.ipoDate);

      if (!dateA) return 1;
      if (!dateB) return -1;

      return dateB.getTime() - dateA.getTime();
    },
  },
  {
    accessorKey: "ipoDate",
    header: "IPO Date Range",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("ipoDate")}</div>
    ),
  },
  {
    accessorKey: "priceRange",
    header: "Price Range",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("priceRange")}</div>
    ),
  },
  {
    accessorKey: "institutionalSubscription",
    header: "Institutional",
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue("institutionalSubscription")}x
      </div>
    ),
  },
  {
    accessorKey: "hniSubscription",
    header: "HNI (₹2L+)",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("hniSubscription")}x</div>
    ),
  },
  {
    accessorKey: "retailSubscription",
    header: "Retail (upto ₹2L)",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("retailSubscription")}x</div>
    ),
  },
  {
    accessorKey: "totalSubscription",
    header: "Total",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("totalSubscription")}x</div>
    ),
  },
];
const getSubscriptionData = async (ipo) => {
  const { openDate, closeDate } = splitDateRange(ipo.ipoDate);
  const openDateObj = parseDate(openDate);
  const closeDateObj = parseDate(closeDate);

  if (!openDateObj || !closeDateObj) return null;

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Check if current date is within IPO period
  if (currentDate >= openDateObj && currentDate <= closeDateObj) {
    try {
      const encodedUrl = encodeURIComponent(ipo.IPOLink);
      // Include the IPO ID in the API call
      const response = await fetch(
        `/api/scrapSubTable?url=${encodedUrl}&id=${ipo._id}`
      );
      return await response.json();
    } catch (error) {
      console.error(`Error fetching live data for ${ipo.IPOName}:`, error);
      // Fall back to stored subscription data if live fetch fails
      return ipo.SubscriptionStatus || null;
    }
  }

  // Return existing subscription data if outside IPO period
  return ipo.SubscriptionStatus || null;
};
export default function Page() {
  const router = useRouter();
  const { data: ipoData } = useContext(IpoCommonDataContext);
  const [enhancedIpoData, setEnhancedIpoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      setIsLoading(true);
      try {
        const updatedIpoData = await Promise.all(
          ipoData.map(async (ipo) => {
            const response = await getSubscriptionData(ipo);

            // Handle the new response format that includes both message and data
            const subscriptionData = response?.data || response;

            if (!subscriptionData) {
              return {
                ...ipo,
                institutionalSubscription: "N/A",
                hniSubscription: "N/A",
                retailSubscription: "N/A",
                totalSubscription: "N/A",
              };
            }

            // Find subscription data for each category
            const institutional = subscriptionData.find(
              (item) => item.Category === "Institutional"
            );
            const hni = subscriptionData.find(
              (item) => item.Category === "HNI (₹2L+)"
            );
            const retail = subscriptionData.find(
              (item) => item.Category === "Retail (upto ₹2L)"
            );
            const total = subscriptionData.find(
              (item) => item.Category === "Total"
            );

            return {
              ...ipo,
              institutionalSubscription: institutional
                ? institutional["Subscription (X times)"]
                : "N/A",
              hniSubscription: hni ? hni["Subscription (X times)"] : "N/A",
              retailSubscription: retail
                ? retail["Subscription (X times)"]
                : "N/A",
              totalSubscription: total
                ? total["Subscription (X times)"]
                : "N/A",
            };
          })
        );

        setEnhancedIpoData(updatedIpoData);
      } catch (error) {
        console.error("Error in fetchSubscriptionData:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (ipoData && ipoData.length > 0) {
      fetchSubscriptionData();
    }
  }, [ipoData]);

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const columns = React.useMemo(() => getColumns(), []);

  const createTable = (data) => {
    return useReactTable({
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
        sorting: [{ id: "IPOName", desc: false }],
        columnFilters,
        columnVisibility,
      },
    });
  };

  const ipoTableData =
    enhancedIpoData?.filter((item) => item.ipoType === "IPO") || [];
  const smeIpoTableData =
    enhancedIpoData?.filter((item) => item.ipoType === "SME-IPO") || [];

  const ipoTable = createTable(ipoTableData);
  const smeIpoTable = createTable(smeIpoTableData);
  const renderSkeletonRows = (columnCount) => {
    return Array.from({ length: 5 }).map((_, rowIndex) => (
      <TableRow key={`skeleton-row-${rowIndex}`}>
        {Array.from({ length: columnCount }).map((_, cellIndex) => (
          <TableCell
            key={`skeleton-cell-${rowIndex}-${cellIndex}`}
            className="text-center"
          >
            <Skeleton className="h-4 w-full" />
          </TableCell>
        ))}
      </TableRow>
    ));
  };
  const handleRowClick = (row) => {
    const ipoType = row.original.ipoType;
    const ipoId = row.original._id;
    const route = `/${ipoType === "IPO" ? "IPO" : "SME"}/${ipoId}`;
    router.push(route);
  };

  const renderTableContent = (table) => (
    <>
      <div className="rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={
                      header.column.id !== "IPOName" ? "text-center" : ""
                    }
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getIsSorted() &&
                      (header.column.getIsSorted() === "desc" ? " ↓" : " ↑")}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-white">
            {isLoading ? (
              renderSkeletonRows(columns.length)
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleRowClick(row)}
                  className="cursor-pointer hover:bg-muted/50"
                >
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
      {!isLoading && (
        <div className="flex items-center justify-end space-x-2 py-4 text-white">
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
      )}
    </>
  );

  return (
    <div className="max-w-[90%] sm:max-w-[80%] mx-auto justify-center items-center m-9 ">
      <Tabs defaultValue="IPO" className="w-full">
        <TabsList className="grid sm:w-[30%] w-[70%] mx-auto  grid-cols-2">
          <TabsTrigger value="IPO">IPO</TabsTrigger>
          <TabsTrigger value="SME-IPO">SME IPO</TabsTrigger>
        </TabsList>
        <TabsContent value="IPO">
          <div className="w-full">
            <div className="flex items-center py-4 gap-4 sm:gap-0">
              <Input
                placeholder="Filter IPOs..."
                value={ipoTable.getColumn("IPOName")?.getFilterValue() ?? ""}
                onChange={(event) =>
                  ipoTable
                    .getColumn("IPOName")
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm bg-[#111822] border-none shadow-lg text-white"
              />

              <DropdownMenu className="!text-white">
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto !text-white">
                    Columns <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {ipoTable
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
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
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {renderTableContent(ipoTable)}
          </div>
        </TabsContent>
        <TabsContent value="SME-IPO">
          <div className="w-full">
            <div className="flex items-center py-4 gap-4 sm:gap-0">
              <Input
                placeholder="Filter SME IPOs..."
                value={smeIpoTable.getColumn("IPOName")?.getFilterValue() ?? ""}
                onChange={(event) =>
                  smeIpoTable
                    .getColumn("IPOName")
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm bg-[#111822] border-none shadow-lg text-white" // Remove the explicit background color
              />
              <DropdownMenu className="!text-white">
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto !text-white">
                    Columns <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {smeIpoTable
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
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
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {renderTableContent(smeIpoTable)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
