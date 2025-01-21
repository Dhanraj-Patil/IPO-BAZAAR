"use client";

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

const parseDate = (dateStr) => {
  if (!dateStr) return null;
  
  // Extract date components
  const match = dateStr.match(/(\d+)(?:st|nd|rd|th)?\s+([A-Za-z]+)\s+(\d{4})/);
  if (!match) return null;
  
  const [, day, month, year] = match;
  const monthIndex = new Date(`${month} 1, 2000`).getMonth();
  return new Date(parseInt(year), monthIndex, parseInt(day));
};

const getStatus = (openDateStr, closeDateStr) => {
  const openDateObj = parseDate(openDateStr);
  const closeDateObj = parseDate(closeDateStr);
  
  if (!openDateObj || !closeDateObj) return "Upcoming";

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  if (currentDate >= openDateObj && currentDate <= closeDateObj) return "Current";
  if (currentDate > closeDateObj) return "Closed";
  return "Upcoming";
};

const splitDateRange = (dateStr) => {
  if (!dateStr) return { openDate: '', closeDate: '' };

  try {
    // Split the date range
    const [startStr, endStr] = dateStr.split('–').map(d => d.trim());
    
    // Parse start date
    const startMatch = startStr.match(/(\d+)(?:st|nd|rd|th)?/);
    if (!startMatch) return { openDate: dateStr, closeDate: dateStr };
    
    // Parse end date and extract month/year
    const endMatch = endStr.match(/(\d+)(?:st|nd|rd|th)?\s+([A-Za-z]+)\s+(\d{4})/);
    if (!endMatch) return { openDate: dateStr, closeDate: dateStr };

    const [, startDay] = startMatch;
    const [, endDay, month, year] = endMatch;

    // Add ordinal suffix
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    const formattedStartDay = `${parseInt(startDay)}${getOrdinalSuffix(parseInt(startDay))}`;
    const formattedEndDay = `${parseInt(endDay)}${getOrdinalSuffix(parseInt(endDay))}`;

    return {
      openDate: `${formattedStartDay} ${month} ${year}`,
      closeDate: `${formattedEndDay} ${month} ${year}`
    };
  } catch (error) {
    console.error('Error splitting date range:', error);
    return { openDate: dateStr, closeDate: dateStr };
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

const renderTable = (data, type) => {
  const filteredData = data?.filter(item => item.ipoType === type) || [];

  return (
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
        {filteredData.map((company) => {
          const { symbol, IPOName, ipoDate } = company;
          const companyLink = type === "IPO" ? `/IPO/${symbol}` : `/SME/${symbol}`;
          const { openDate, closeDate } = splitDateRange(ipoDate);

          return (
            <TableRow
              key={symbol || Math.random().toString()}
              className="cursor-pointer hover:bg-gray-700"
              onClick={() => window.open(companyLink, '_blank', 'noopener noreferrer')}
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
        {renderTable(ipoData, "SME-IPO")}
      </TabsContent>
    </Tabs>
  );
}