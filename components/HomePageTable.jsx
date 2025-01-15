import Link from "next/link";
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

// Data for IPO companies
const IPO = [
  {
    companyName: "Stallion India Fluorochemicals Limited",
    openDate: "2025-01-16",
    closeDate: "2025-01-20",
    status: "Upcoming",
  },
  {
    companyName: "Laxmi Dental Limited",
    openDate: "2025-01-13",
    closeDate: "2025-01-15",
    status: "Current",
  },
  {
    companyName: "Capital Infra Trust",
    openDate: "2025-01-07",
    closeDate: "2025-01-09",
    status: "Closed",
  },
  {
    companyName: "Quadrant Future Tek Limited",
    openDate: "2025-01-07",
    closeDate: "2025-01-09",
    status: "Closed",
  },
  {
    companyName: "Standard Glass Lining Technology Limited",
    openDate: "2025-01-06",
    closeDate: "2025-01-08",
    status: "Closed",
  },
  {
    companyName: "Indo Farm Equipment Limited",
    openDate: "2024-12-31",
    closeDate: "2025-01-02",
    status: "Closed",
  },
  {
    companyName: "Unimech Aerospace and Manufacturing",
    openDate: "2024-12-23",
    closeDate: "2024-12-26",
    status: "Closed",
  },
  {
    companyName: "Carraro India Limited",
    openDate: "2024-12-20",
    closeDate: "2024-12-24",
    status: "Closed",
  },
];

// Data for SME companies
const SME = [
  {
    companyName: "CapitalNumbers Infotech Limited",
    openDate: "2025-01-20",
    closeDate: "2025-01-22",
    status: "Upcoming",
  },
  {
    companyName: "EMA Partners India Limited",
    openDate: "2025-01-17",
    closeDate: "2025-01-21",
    status: "Upcoming",
  },
  {
    companyName: "Landmark Immigration Consultants",
    openDate: "2025-01-16",
    closeDate: "2025-01-20",
    status: "Upcoming",
  },
  {
    companyName: "Rikhav Securities Limited",
    openDate: "2025-01-15",
    closeDate: "2025-01-17",
    status: "Current",
  },
  {
    companyName: "Kabra Jewels Limited",
    openDate: "2025-01-15",
    closeDate: "2025-01-17",
    status: "Current",
  },
  {
    companyName: "Barflex Polyfilms Limited",
    openDate: "2025-01-10",
    closeDate: "2025-01-15",
    status: "Current",
  },
  {
    companyName: "Sat Kartar Shopping Limited",
    openDate: "2025-01-10",
    closeDate: "2025-01-14",
    status: "Closed",
  },
  {
    companyName: "B.R.Goyal Infrastructure Limited",
    openDate: "2025-01-07",
    closeDate: "2025-01-09",
    status: "Closed",
  },
];

// Helper function to format the date
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const suffix = ['th', 'st', 'nd', 'rd'][(day % 10) > 3 ? 0 : (day % 100 - day % 10 != 10) * (day % 10)];
  return `${day}${suffix} ${month}`;
};

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

// Status color mapping
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

// Helper function to render tables with dynamic links
const renderTable = (data, type) => (
  <Table>
    <TableCaption>{data === IPO ? "IPO Companies" : "SME IPO Companies"}</TableCaption>
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
        const { companyName, openDate, closeDate } = company;
        const companyLink = type === "ipo" ? `/IPO/${companyName}` : `/SME/${companyName}`;
        return (
          <TableRow key={companyName} className="cursor-pointer hover:bg-gray-700">
            <TableCell>
              <Link href={companyLink} >
                {companyName}
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
  return (
    <Tabs defaultValue="IPO" className="w-full hover:scale-105 transition-all ease-in-out duration-700">
      <TabsList className="grid w-[50%] mx-auto shadow-2xl grid-cols-2">
        <TabsTrigger value="IPO">IPO</TabsTrigger>
        <TabsTrigger value="SME-IPO">SME IPO</TabsTrigger>
      </TabsList>

      {/* IPO table */}
      <TabsContent value="IPO">
        {renderTable(IPO, "ipo")}
      </TabsContent>

      {/* SME table */}
      <TabsContent value="SME-IPO">
        {renderTable(SME, "sme")}
      </TabsContent>
    </Tabs>
  );
}
