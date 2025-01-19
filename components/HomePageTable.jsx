"use client"
import { useState } from 'react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const today = new Date();

const getStatus = (openDate, closeDate) => {
  const openDateObj = new Date(openDate);
  const closeDateObj = new Date(closeDate);

  openDateObj.setHours(0, 0, 0, 0);
  closeDateObj.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (today >= openDateObj && today <= closeDateObj) return "Current";
  if (today > closeDateObj) return "Closed";
  return "Upcoming";
};

const formatDate = (dateStr) => {
  const [day, month] = dateStr.split('-');
  return `${parseInt(day)}${getSuffix(parseInt(day))} ${month}`;
};

const getSuffix = (day) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
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
      <span className={`px-2 py-1 rounded ${statusColors[status] || ''}`}>
        {status}
      </span>
    </TableCell>
  );
};

const renderTable = (data, type) => (
  <Table>
    <TableCaption>{type === "IPO" ? "IPO Companies" : "SME IPO Companies"}</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[200px]">Company Name</TableHead>
        <TableHead>Open Date</TableHead>
        <TableHead>Close Date</TableHead>
        <TableHead className="text-right w-[10px]">Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody className="text-white">
      {data.map((company) => {
        const { symbol, IPOType, issuePeriod, IPOName } = company;
        const [openDate, closeDate] = issuePeriod.split(' to ');
        const companyLink = type === "IPO" ? `/IPO/${symbol}` : `/SME/${symbol}`;

        return (
          <TableRow
            key={symbol}
            className="cursor-pointer hover:bg-gray-700"
            onClick={() => window.open(companyLink, '_blank', 'noopener noreferrer')}
          >
            <TableCell>{IPOName}</TableCell>
            <TableCell>{formatDate(openDate)}</TableCell>
            <TableCell>{formatDate(closeDate)}</TableCell>
            <StatusCell openDate={openDate} closeDate={closeDate} />
          </TableRow>
        );
      })}
    </TableBody>
    <TableFooter></TableFooter>
  </Table>
);

export function CombinedTable({ ipoData, smeData }) {
  return (
    <Tabs defaultValue="IPO" className="w-full hover:scale-105 transition-all ease-in-out duration-700">
      <TabsList className="grid w-[50%] mx-auto shadow-2xl grid-cols-2">
        <TabsTrigger value="IPO">IPO</TabsTrigger>
        <TabsTrigger value="SME-IPO">SME IPO</TabsTrigger>
      </TabsList>
      <TabsContent value="IPO">
        {renderTable(ipoData, "IPO")}
      </TabsContent>
      <TabsContent value="SME-IPO">
        {renderTable(smeData, "SME-IPO")}
      </TabsContent>
    </Tabs>
  );
}

