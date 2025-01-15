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

const companies = [
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

// Helper function to format the date
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const suffix = ['th', 'st', 'nd', 'rd'][(day % 10) > 3 ? 0 : (day % 100 - day % 10 != 10) * (day % 10)];
  return `${day}${suffix} ${month}`;
};

export function TableDemo() {
  return (
    <Table >
      <TableCaption>DashBoard</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Company Name</TableHead>
          <TableHead>Open Date</TableHead>
          <TableHead>Close Date</TableHead>
          <TableHead className="text-right w-[10px]">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-white">
        {companies.map((cN) => (
          <TableRow key={cN.companyName}>
            <TableCell className="font-medium">{cN.companyName}</TableCell>
            <TableCell>{formatDate(cN.openDate)}</TableCell>
            <TableCell>{formatDate(cN.closeDate)}</TableCell>
            <TableCell className="text-right">{cN.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
}
