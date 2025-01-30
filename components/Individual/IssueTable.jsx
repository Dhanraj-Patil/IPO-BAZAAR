import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaArrowRight } from "react-icons/fa";

const IssueTables = ({ issueSizeDetails }) => {
  if (!issueSizeDetails) return null;

  const issueSizeKeys = ["overall", "fresh issue", "offer for sale"];

  const filteredIssueSizeKeys = Object.keys(issueSizeDetails).filter(
    (key) => issueSizeKeys.includes(key.toLowerCase())
  );

  const utilizationKeys = Object.keys(issueSizeDetails).filter(
    (key) => !filteredIssueSizeKeys.includes(key)
  );

  return (
    <div className="w-full flex gap-6 ">
      {/* Issue Size Details Table */}
      <div className="w-1/2">
        <p className="flex items-center text-xl font-medium uppercase rounded-xl underline underline-offset-8 p-3 mb-4">
          Issue Size Details
          <span className="ml-2">
            <FaArrowRight className="text-[#B0FA04] text-xl" />
          </span>
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Funds Raised in the IPO</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIssueSizeKeys.map((key) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{issueSizeDetails[key]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Utilization of Proceeds Table */}
      <div className="w-1/2">
        <p className="flex items-center text-xl  font-medium uppercase rounded-xl underline underline-offset-8 p-3 mb-4">
          Utilisation of Proceeds
          <span className="ml-2">
            <FaArrowRight className="text-[#B0FA04] text-xl" />
          </span>
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Purpose</TableHead>
              <TableHead>INR crores (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {utilizationKeys.map((key) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{issueSizeDetails[key]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default IssueTables;