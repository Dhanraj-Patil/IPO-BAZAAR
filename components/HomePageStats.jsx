"use client"
import React from "react";
import CountUp from "react-countup";

function HomePageStats({ listingGains }) {
  // Count positive values
  const positiveCount = listingGains.filter((gain) => gain > 0).length;

  // Count negative values
  const negativeCount = listingGains.filter((gain) => gain < 0).length;

  // Calculate average of the array
  const average =
    listingGains.length > 0
      ? listingGains.reduce((acc, gain) => acc + gain, 0) / listingGains.length
      : 0;

  return (
    <div className="darkModeNavyBg rounded-2xl p-5 flex justify-around shadow-2xl">
      <div className="flex flex-col justify-between items-center">
        <p className="text-6xl text-[#FEBE10]">
          <CountUp end={listingGains.length} duration={1.5} />
        </p>
        <p className="text-lg">IPO'S Listed in 2025</p>
      </div>
      <div className="flex flex-col justify-between items-center">
        <p className="text-6xl text-[#03c02c]">
          <CountUp end={average} decimals={2} duration={1.5} suffix="%" />
        </p>
        <p className="text-lg">Average Listing Gains</p>
      </div>
      <div className="flex flex-col justify-between items-center">
        <p className="text-6xl text-[#03c02c]">
          <CountUp end={positiveCount} duration={1.5} />
        </p>
        <p className="text-lg">IPO'S Listed in Positive</p>
      </div>
      <div className="flex flex-col justify-between items-center">
        <p className="text-6xl text-[#EF0107]">
          <CountUp end={negativeCount} duration={1.5} />
        </p>
        <p className="text-lg">IPO'S Listed in Negative</p>
      </div>
    </div>
  );
}

export default HomePageStats;
