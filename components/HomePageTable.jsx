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

// Data for MainBoardcompanies
const MainBoardcompanies = [
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

// Data for SME
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
  const today = new Date(); // Get today's date
  const openDateObj = new Date(openDate);
  const closeDateObj = new Date(closeDate);

  // Remove the time portion by setting the time to midnight (00:00:00)
  openDateObj.setHours(0, 0, 0, 0);
  closeDateObj.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  // If today's date is between the open date and close date (inclusive), mark as "Current"
  if (today >= openDateObj && today <= closeDateObj) {
    return "Current";
  }

  // If today's date is after the close date, mark as "Closed"
  if (today > closeDateObj) {
    return "Closed";
  }

  // If today is before the open date, mark as "Upcoming"
  return "Upcoming";
};




export function CombinedTable() {
  return (
    <Tabs defaultValue="IPO" className="w-full">
      <TabsList className="grid w-[50%] mx-auto grid-cols-2">
        <TabsTrigger value="IPO">IPO</TabsTrigger>
        <TabsTrigger value="SME-IPO">SME IPO</TabsTrigger>
      </TabsList>

      {/* MainBoardcompanies table */}
      <TabsContent value="IPO">
        <Table>
          <TableCaption>Main Board Companies</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Company Name</TableHead>
              <TableHead>Open Date</TableHead>
              <TableHead>Close Date</TableHead>
              <TableHead className="text-right w-[10px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-white">
            {MainBoardcompanies.map((cN) => (
              <TableRow key={cN.companyName}>
                <TableCell className="font-medium">{cN.companyName}</TableCell>
                <TableCell>{formatDate(cN.openDate)}</TableCell>
                <TableCell>{formatDate(cN.closeDate)}</TableCell>
                <TableCell className="text-right">
                  <span className={`px-2 py-1 rounded ${
                    getStatus(cN.openDate, cN.closeDate) === 'Closed' ? 'bg-[#EF0107]' :
                    getStatus(cN.openDate, cN.closeDate) === 'Upcoming' ? 'bg-[#FEBE10]' :
                    getStatus(cN.openDate, cN.closeDate) === 'Current' ? 'bg-[#03c02c]' :
                    ''}`}>
                    {getStatus(cN.openDate, cN.closeDate)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </TabsContent>

      {/* SME table */}
      <TabsContent value="SME-IPO">
        <Table>
          <TableCaption>SME IPO Companies</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Company Name</TableHead>
              <TableHead>Open Date</TableHead>
              <TableHead>Close Date</TableHead>
              <TableHead className="text-right w-[10px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-white">
            {SME.map((cN) => (
              <TableRow key={cN.companyName}>
                <TableCell className="font-medium">{cN.companyName}</TableCell>
                <TableCell>{formatDate(cN.openDate)}</TableCell>
                <TableCell>{formatDate(cN.closeDate)}</TableCell>
                <TableCell className="text-right">
                  <span className={`px-2 py-1 rounded ${
                    getStatus(cN.openDate, cN.closeDate) === 'Closed' ? 'bg-[#EF0107]' :
                    getStatus(cN.openDate, cN.closeDate) === 'Upcoming' ? 'bg-[#FEBE10]' :
                    getStatus(cN.openDate, cN.closeDate) === 'Current' ? 'bg-[#03c02c]' :
                    ''}`}>
                    {getStatus(cN.openDate, cN.closeDate)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </TabsContent>
    </Tabs>
  );
}
