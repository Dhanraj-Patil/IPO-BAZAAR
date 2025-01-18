"use client"
import { useEffect, useState } from 'react';
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
        const { IPOName, IPOType, issuePeriod } = company;
        const [openDate, closeDate] = issuePeriod.split(' to ');
        const companyLink = type === "IPO" ? `/IPO/${IPOName}` : `/SME/${IPOName}`;
        
        return (
          <TableRow key={IPOName} className="cursor-pointer hover:bg-gray-700">
            <TableCell>
              <Link href={companyLink}>
                {IPOName}
              </Link>
            </TableCell>
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

export function CombinedTable() {
  const [ipoData, setIpoData] = useState([]);
  const [smeData, setSmeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/homePageTable');
        const data = await response.json();

        // Convert date string to comparable number for sorting
        const dateToNumber = (dateStr) => {
          const [day, month, year] = dateStr.split('-');
          const monthMap = {
            'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
            'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
            'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
          };
          return parseInt(`${year}${monthMap[month]}${day.padStart(2, '0')}`);
        };

        // Sort by closing date (latest first)
        const sortedData = [...data].sort((a, b) => {
          const [, closeDateA] = a.issuePeriod.split(' to ');
          const [, closeDateB] = b.issuePeriod.split(' to ');
          return dateToNumber(closeDateB) - dateToNumber(closeDateA);
        });

        setIpoData(sortedData.filter(item => item.IPOType === 'IPO'));
        setSmeData(sortedData.filter(item => item.IPOType === 'SME-IPO'));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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