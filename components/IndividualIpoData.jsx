import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faDownload, faFile } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./ui/button";
import CountUp from "react-countup";
import SubTable from "./SubTable";
import { FaArrowRight } from "react-icons/fa";
import ApplyCatTable from "./ApplyCatTable";
export default function IndividualIpoData({ ipoData }) {
  // Extract Open Date and Close Date from ipoData.ipoDate
  const [openPart, closePart] = ipoData.ipoDate
    ?.replace("–", "-") // Standardize the separator
    .split("-")
    .map((part) => part.trim()); // Split into open and close parts and trim extra spaces

  // Extract the month and year only once from the original string
  const monthYearMatch = ipoData.ipoDate.match(
    /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}\b/
  );
  const monthYear = monthYearMatch ? monthYearMatch[0] : "";

  // Ensure openPart and closePart are properly formatted
  const openDate = openPart.includes(monthYear)
    ? openPart
    : `${openPart} ${monthYear}`;
  const closeDate = closePart.includes(monthYear)
    ? closePart
    : `${closePart} ${monthYear}`;

  // Utility function to add suffix to day
  const addSuffixToDay = (dateString) => {
    const match = dateString.match(/(\d+)\s/); // Extract day number
    if (!match) return dateString; // If no day found, return original string
    const day = parseInt(match[1], 10); // Parse the day number
    let suffix = "th";
    if (day % 10 === 1 && day !== 11) suffix = "st";
    else if (day % 10 === 2 && day !== 12) suffix = "nd";
    else if (day % 10 === 3 && day !== 13) suffix = "rd";
    return dateString.replace(/\d+/, `${day}${suffix}`); // Replace the day with suffixed version
  };

  // Format listing date with suffix
  const formattedListingDate = ipoData.listingDate
    ? addSuffixToDay(ipoData.listingDate)
    : "";

  // Convert issueSize and lotSize to numbers
  const issueSizeNumber = parseFloat(ipoData.issueSize.replace("cr", "")); // Convert crores to number
  const lotSizeNumber = parseFloat(ipoData.lotSize);

  // Extract upper bound of price range
  const priceRangeUpperBound = parseFloat(
    ipoData.priceRange.split("–")[1].trim().replace("₹", "")
  );

  // Calculate approximate value per lot
  const approxValuePerLot = lotSizeNumber * priceRangeUpperBound;

  return (
    <div className="w-[80%] mx-auto flex-col  ">
      <div className="flex justify-self-center gap-8 m-4 p-3 ">
        {ipoData.logoBase64 && (
          <img
            src={`data:image/png;base64,${ipoData.logoBase64}`}
            alt={`${ipoData.IPOName} Logo`}
            className="rounded-xl max-w-[30%] max-h-[30%] shadow-2xl "
          />
        )}
        <div>
          <h1 className="text-3xl font-bold underline underline-offset-8">
            {ipoData.IPOName}
          </h1>
          <div className="grid grid-rows-2 grid-cols-2 gap-1 p-4 m-4 mt-6 bg-[#111822] rounded-2xl shadow-2xl font-medium hover:scale-105 transition-all ease-in-out duration-700 ">
            <div className="flex items-center justify-center text-gray-200 h-20">
              OPEN DATE:{" "}
              <p className="text-[#B0FA04] font-semibold ml-2">{openDate}</p>
            </div>
            <div className="flex items-center justify-center text-gray-200 h-20">
              CLOSE DATE:{" "}
              <p className="text-[#B0FA04] font-semibold ml-2">{closeDate}</p>
            </div>
            <div className="flex items-center justify-center text-gray-200 h-20">
              PRICE RANGE:&nbsp;
              <p className="text-[#B0FA04] font-semibold">
                {ipoData.priceRange}
              </p>
            </div>
            <div className="flex items-center justify-center text-gray-200 h-20">
              LISTING DATE:&nbsp;
              <p className="text-[#B0FA04] font-semibold">
                {formattedListingDate}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="darkModeNavyBg rounded-2xl py-4 flex justify-around items-center shadow-2xl text-white hover:scale-105 transition-all ease-in-out duration-700 mt-6">
        <div className="flex flex-col justify-center items-center">
          <p className="text-3xl text-[#03c02c]">
            <CountUp end={issueSizeNumber} duration={2} suffix="cr" />
          </p>
          <p>Issue Size</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-4xl text-[#03c02c]">
            <CountUp end={lotSizeNumber} duration={2} />
          </p>

          <p>
            Lot Size{" "}
            <span className="text-[0.8rem] text-[#03c02c]">
              (₹
              <CountUp end={approxValuePerLot} duration={2} /> per lot approx.)
            </span>
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <a
            href={ipoData.allotmentLink}
            className="flex items-center text-xl text-blue-500 hover:underline"
          >
            Allotment link
            <FontAwesomeIcon
              icon={faLink}
              style={{ color: "#babdbf" }}
              className="ml-2"
            />
          </a>
        </div>
        <div className="flex flex-col justify-center gap-1 items-center">
          <a href={ipoData.prospectusLink} className="flex items-center">
            <Button className="bg-[#B0FA04]">
              Download
              <FontAwesomeIcon icon={faDownload} />
            </Button>
          </a>
          <p>
            Download Prospectus <FontAwesomeIcon icon={faFile} />
          </p>
        </div>
      </div>
      <div className="flex mt-10 w-[100%] justify-evenly items-center">
        <div className="">
          <p className="flex items-center text-xl uppercase rounded-xl underline underline-offset-8 p-3">
            Ipo Subscription Figures
            <span className="ml-2">
              <FaArrowRight className="text-[#B0FA04] text-xl" />
            </span>
          </p>
          <SubTable link={ipoData.IPOLink} />
        </div>
        <div className="">
          <p className="flex items-center text-xl uppercase rounded-xl underline underline-offset-8 p-3">
            Application Categories
            <span className="ml-2">
              <FaArrowRight className="text-[#B0FA04] text-xl" />
            </span>
          </p>
          <ApplyCatTable lotSize={lotSizeNumber} Price={priceRangeUpperBound} />
        </div>
      </div>
    </div>
  );
}
