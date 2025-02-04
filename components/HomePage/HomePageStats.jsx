"use client"
import React from "react";
import { useInView } from 'react-intersection-observer';
import CountUp from "react-countup";

function HomePageStats({ ipoData = [] }) {
  // Process listing gains from ipoData
  const listingGains = ipoData
    .map((item) => item.listingGain)
    .filter((gain) => gain !== null && gain !== undefined);

  // Count positive values
  const positiveCount = listingGains.filter((gain) => gain > 0).length;

  // Count negative values
  const negativeCount = listingGains.filter((gain) => gain < 0).length;

  // Calculate average of the array
  const average =
    listingGains.length > 0
      ? listingGains.reduce((acc, gain) => acc + gain, 0) / listingGains.length
      : 0;

  // Get total IPO count for 2025
  const totalIpos2025 = positiveCount+negativeCount;

  // IntersectionObserver hooks for each section
  const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: true });
  const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: true });
  const { ref: ref3, inView: inView3 } = useInView({ triggerOnce: true });
  const { ref: ref4, inView: inView4 } = useInView({ triggerOnce: true });

  return (
    <div className="darkModeNavyBg rounded-2xl sm:py-2 py-3 flex justify-around shadow-2xl text-white hover:scale-105 transition-all ease-in-out duration-700 mt-6 flex-wrap gap-3 px-3 sm:px-0 sm:gap-0">
      <div className="flex flex-col justify-between items-center" ref={ref1}>
        <p className="text-3xl text-[#FEBE10]">
          {inView1 ? <CountUp end={totalIpos2025} duration={1.5} /> : "0"}
        </p>
        <p className="text-sm">IPO's Listed in 2025</p>
      </div>
      <div className="flex flex-col justify-between items-center" ref={ref2}>
        <p className="text-3xl text-[#03c02c]">
          {inView2 ? (
            <CountUp 
              end={Number.isFinite(average) ? average : 0} 
              decimals={2} 
              duration={1.5} 
              suffix="%" 
            />
          ) : "0"}
        </p>
        <p className="text-sm">Average Listing Gains</p>
      </div>
      <div className="flex flex-col justify-between items-center" ref={ref3}>
        <p className="text-3xl text-[#03c02c]">
          {inView3 ? <CountUp end={positiveCount} duration={1.5} /> : "0"}
        </p>
        <p className="text-sm">IPO's Listed in Positive</p>
      </div>
      <div className="flex flex-col justify-between items-center" ref={ref4}>
        <p className="text-3xl text-[#EF0107]">
          {inView4 ? <CountUp end={negativeCount} duration={1.5} /> : "0"}
        </p>
        <p className="text-sm">IPO's Listed in Negative</p>
      </div>
    </div>
  );
}

export default HomePageStats;