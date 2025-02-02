"use client";
import HomePageStats from "@/components/HomePage/HomePageStats";
import { CombinedTable } from "@/components/HomePage/HomePageTable";
import { useContext } from 'react';
import { IpoCommonDataContext } from '@/app/Context/IpoCommonDataContext';
import Image from "next/image";
import { getTotalCurrentCount } from "@/components/HomePage/HomePageTable";
import ViewCounter from "@/components/Individual/ping";

export default function Home() {
  const { data: ipoData } = useContext(IpoCommonDataContext);
  const liveCount = getTotalCurrentCount(ipoData);
  
  return (
    <div className="w-[80%] mx-auto flex flex-col">
      <div className="w-full mx-auto relative z-10">
        <HomePageStats ipoData={ipoData} />
      </div>
      <div className="flex justify-between items-center mb-4 mt-[-3rem]">
        <div className="pl-[1rem] w-[45%] relative z-0">
          <CombinedTable ipoData={ipoData} />
        </div>
        <div className="translate-x-[2rem] w-[55%] relative z-0">
          <Image
            src="/Assets/BB.png"
            width={2700}
            height={10}
            alt="Background"
            priority
          />
        </div>
      </div>
      <div className="fixed bottom-4 right-4 z-50">
        <ViewCounter label={"LIVE IPOs :"} data={liveCount}/>
      </div>
    </div>
  );
}