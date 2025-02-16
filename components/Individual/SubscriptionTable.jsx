"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

function SubTable({
  openDate,
  closeDate,
  ipoLink,
  currentDate,
  SubscriptionStatusdata,
  id
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Convert dates to Date objects for comparison
        const open = new Date(openDate);
        const close = new Date(closeDate);
        const current = new Date(currentDate);

        // Check if current date is within IPO open and close dates
        if (current >= open && current <= close) {
          // Fetch fresh data from the link
          const encodedUrl = encodeURIComponent(ipoLink); 
          const response = await fetch(`/api/scrapSubTable?url=${encodedUrl}&id=${id}`);

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch data");
          }

          const tableData = await response.json();
          setData(tableData);
        } else {
          // Use provided subscription status data
          setData(SubscriptionStatusdata || []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [openDate, closeDate, ipoLink, currentDate, SubscriptionStatusdata]);

  if (loading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Error: {error}</AlertDescription>
      </Alert>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Alert>
        <AlertDescription>No subscription data available</AlertDescription>
      </Alert>
    );
  }

  const formatCellValue = (value, header) => {
    if (typeof value === "number" && header.includes("times")) {
      return `${value.toFixed(2)}x`;
    }
    if (typeof value === "number" && header.includes("lakhs")) {
      return value.toFixed(2);
    }
    return value;
  };

  return (
    <div className="rounded-2xl mt-3 hover:scale-105 transition-all ease-in-out duration-700 shadow-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            {Object.keys(data[0]).map((header) => (
              <TableHead key={header} className="whitespace-nowrap">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {Object.entries(row).map(([header, value], colIndex) => (
                <TableCell key={colIndex}>
                  {formatCellValue(value, header)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default SubTable;
