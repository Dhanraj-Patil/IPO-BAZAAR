import { CombinedTable } from "./HomePageTable";

async function fetchIPOData() {
  const response = await fetch('http://localhost:3000/api/homePageTable', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

export default async function IPODataFetcher() {
  const data = await fetchIPOData();

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

  const ipoData = sortedData.filter(item => item.IPOType === 'IPO');
  const smeData = sortedData.filter(item => item.IPOType === 'SME-IPO');

  return <CombinedTable ipoData={ipoData} smeData={smeData} />;
}

