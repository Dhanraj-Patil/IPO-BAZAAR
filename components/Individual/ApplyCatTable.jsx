import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
  function ApplyCatTable({ lotSize, Price }) {
    const calculateRows = () => {
      const rows = [];
      const baseAmount = lotSize * Price;
      
      // Calculate Retail (Min) - Always first lot
      rows.push({
        application: "Retail (Min)",
        lots: 1,
        shares: 1 * lotSize,
        amount: `₹${(1 * baseAmount).toLocaleString()}`
      });
      
      // Calculate Retail (Max) - Maximum lots under 2,00,000
      const maxRetailLots = Math.floor(200000 / baseAmount);
      rows.push({
        application: "Retail (Max)",
        lots: maxRetailLots,
        shares: maxRetailLots * lotSize,
        amount: `₹${(maxRetailLots * baseAmount).toLocaleString()}`
      });
      
      // Calculate S-HNI (Min) - First lot above 2,00,000
      const minSHNILots = Math.ceil(200000 / baseAmount);
      rows.push({
        application: "S-HNI (Min)",
        lots: minSHNILots,
        shares: minSHNILots * lotSize,
        amount: `₹${(minSHNILots * baseAmount).toLocaleString()}`
      });
      
      // Calculate S-HNI (Max) - Maximum lots under 10,00,000
      const maxSHNILots = Math.floor(1000000 / baseAmount);
      rows.push({
        application: "S-HNI (Max)",
        lots: maxSHNILots,
        shares: maxSHNILots * lotSize,
        amount: `₹${(maxSHNILots * baseAmount).toLocaleString()}`
      });
      
      // Calculate B-HNI (Min) - First lot above 10,00,000
      const minBHNILots = Math.ceil(1000000 / baseAmount);
      rows.push({
        application: "B-HNI (Min)",
        lots: minBHNILots,
        shares: minBHNILots * lotSize,
        amount: `₹${(minBHNILots * baseAmount).toLocaleString()}`
      });
  
      return rows;
    };
  
    const tableData = calculateRows();
  
    return (
      <div className="rounded-2xl mt-3 hover:scale-105 transition-all ease-in-out duration-700 shadow-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application</TableHead>
              <TableHead>Lots</TableHead>
              <TableHead>Shares</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{row.application}</TableCell>
                <TableCell>{row.lots}</TableCell>
                <TableCell>{row.shares}</TableCell>
                <TableCell>{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
  
  export default ApplyCatTable;