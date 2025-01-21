"use client";

import HomePageStats from "@/components/HomePageStats";
import { CombinedTable } from "@/components/HomePageTable";
import { useContext } from 'react';
import { IpoCommonDataContext } from '@/app/Context/IpoCommonDataContext';
import Image from "next/image";

export default function Home() {
  const ipoData = useContext(IpoCommonDataContext);
  
  return (
    <div className="h-[100vh] w-[80%] mx-auto flex-col justify-between items-center">
      <div className="flex justify-between items-center">
        <div className="pl-[1rem] w-[42%]">
          <CombinedTable ipoData={ipoData} />
        </div>

        <div className="translate-x-[2rem] w-[50%]">
          <Image
            src="/Assets/BB.png"
            width={2700}
            height={10}
            alt="Background"
            priority
          />
        </div>
      </div>
      <div>
        <HomePageStats ipoData={ipoData} />
      </div>
    </div>
  );
}