"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    return "Current";
  }
  if (currentDate > closeDateObj) {
    return "Closed";
  }
  return "Upcoming";
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

const getCurrentCount = (data, type) => {
  return (
    data
      ?.filter((item) => item.ipoType === type)
      ?.map((item) => {
        const { openDate, closeDate } = splitDateRange(item.ipoDate);
        return getStatus(openDate, closeDate);
      })
      ?.filter((status) => status === "Current")?.length || 0
  );
};

export const getTotalCurrentCount = (ipoData) => {
  const ipoCount = getCurrentCount(ipoData, "IPO");
  const smeCount = getCurrentCount(ipoData, "SME-IPO");
  return ipoCount + smeCount;
};

const statusColors = {
  Closed: "bg-[#EF0107]",
  Upcoming: "bg-[#FEBE10]",
  Current: "bg-[#03c02c]",
};

const StatusCell = ({ openDate, closeDate }) => {
  const status = getStatus(openDate, closeDate);
  return (
    <TableCell className="text-right">
      <span className={`px-2 py-1 rounded ${statusColors[status] || ""}`}>
        {status}
      </span>
    </TableCell>
  );
};

const renderTable = (data, type, rowLimit) => {
  const filteredData =
    data
      ?.filter((item) => item.ipoType === type)
      ?.map((company) => {
        const { ipoDate } = company;
        const { openDate, closeDate } = splitDateRange(ipoDate);
        return { ...company, openDate, closeDate };
      })
      ?.sort((a, b) => {
        const closeDateA = parseDate(a.closeDate);
        const closeDateB = parseDate(b.closeDate);
        return closeDateB - closeDateA;
      })
      ?.slice(0, rowLimit) || [];

  return (
    <Table >
      <TableCaption>
        {type === "IPO" ? "IPO Companies" : "SME IPO Companies"}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="lg:w-[210px]">Company Name</TableHead>
          <TableHead>Open Date</TableHead>
          <TableHead>Close Date</TableHead>
          <TableHead className="text-center">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-white">
        {filteredData.map((company) => {
          const { _id, symbol, IPOName, openDate, closeDate } = company;
          const companyLink = type === "IPO" ? `/IPO/${_id}` : `/SME/${_id}`;

          return (
            <TableRow
              key={symbol || Math.random().toString()}
              className="cursor-pointer hover:bg-gray-700"
              onClick={() =>
                window.open(companyLink, "_blank", "noopener noreferrer")
              }
            >
              <TableCell>{IPOName}</TableCell>
              <TableCell>{openDate}</TableCell>
              <TableCell>{closeDate}</TableCell>
              <StatusCell openDate={openDate} closeDate={closeDate} />
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};

export function CombinedTable({ ipoData = [] }) {
  const [rowLimit, setRowLimit] = useState(7);

  useEffect(() => {
    const handleResize = () => {
      setRowLimit(
        window.innerWidth >= 768 && window.innerWidth < 1024 ? 14 : 7
      );
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Tabs
      defaultValue="IPO"
      className="w-full hover:scale-105 transition-all ease-in-out duration-700"
    >
      <TabsList className="grid w-[50%] mx-auto shadow-2xl grid-cols-2">
        <TabsTrigger value="IPO">IPO</TabsTrigger>
        <TabsTrigger value="SME-IPO">SME IPO</TabsTrigger>
      </TabsList>
      <TabsContent value="IPO">
        {renderTable(ipoData, "IPO", rowLimit)}
      </TabsContent>
      <TabsContent value="SME-IPO">
        {renderTable(ipoData, "SME-IPO", rowLimit)}
      </TabsContent>
    </Tabs>
  );
}