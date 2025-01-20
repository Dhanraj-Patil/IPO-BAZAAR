export async function fetchAndProcessIPOData() {
    const response = await fetch("http://localhost:3000/api/homePageDataRoute", {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const rawData = await response.json();
  
    // Convert date string to comparable number for sorting
    const dateToNumber = (dateStr) => {
      const [day, month, year] = dateStr.split("-");
      const monthMap = {
        Jan: "01", Feb: "02", Mar: "03", Apr: "04",
        May: "05", Jun: "06", Jul: "07", Aug: "08",
        Sep: "09", Oct: "10", Nov: "11", Dec: "12",
      };
      return parseInt(`${year}${monthMap[month]}${day.padStart(2, "0")}`);
    };
  
    // Sort by closing date (latest first)
    const sortedData = [...rawData].sort((a, b) => {
      const [, closeDateA] = a.issuePeriod.split(" to ");
      const [, closeDateB] = b.issuePeriod.split(" to ");
      return dateToNumber(closeDateB) - dateToNumber(closeDateA);
    });
  
    // Filter IPOs and SME-IPOs, limit to 7 each
    const transformData = (data, type) =>
      data
        .filter((item) => item.IPOType === type)
        .map(({ IPOName, IPOType, issuePeriod, symbol, listingGain }) => ({
          IPOName,
          IPOType,
          issuePeriod,
          symbol,
          listingGain,
        }))
        .slice(0, 7);
  
    const ipoData = transformData(sortedData, "IPO");
    const smeData = transformData(sortedData, "SME-IPO");
  
    // Collect all listing gains without null values
    const listingGains = sortedData
      .map((item) => item.listingGain)
      .filter((gain) => gain !== null && gain !== undefined);
  
    return { ipoData, smeData, listingGains };
  }
  