"use client";
import HomePageStats from "@/components/HomePage/HomePageStats";
import { CombinedTable } from "@/components/HomePage/HomePageTable";
import { useContext } from "react";
import { IpoCommonDataContext } from "@/app/Context/IpoCommonDataContext";
import Image from "next/image";
import { getTotalCurrentCount } from "@/components/HomePage/HomePageTable";
import ViewCounter from "@/components/Individual/ping";

export default function Home() {
  const { data: ipoData } = useContext(IpoCommonDataContext);
  const liveCount = getTotalCurrentCount(ipoData);

  return (
    <div className="w-[90%] md:w-[80%] lg:w-[80%] lg:gap-0 gap-16 mx-auto flex flex-col">
      <div className="w-full mx-auto relative z-10 md:mt-5 lg:mt-0">
        <HomePageStats ipoData={ipoData} />
      </div>
      <div className="flex justify-between items-center mb-4 lg:mt-[-3rem] ">
        <div className="lg:pl-[1rem] w-full lg:w-[45%] mx-auto relative z-0  mb-6 lg:mb-0">
          <CombinedTable ipoData={ipoData} />
        </div>
        <div className="translate-x-[2rem] w-[55%] relative z-0 hidden lg:block">
          <Image
            src="/Assets/BB.png"
            width={2700}
            height={10}
            alt="Background"
            priority
          />
        </div>
      </div>

      <div className="fixed lg:bottom-4 bottom-4 md:bottom-48 right-4 z-50">
  <ViewCounter label={"LIVE IPOs :"} data={liveCount} />
</div>
    </div>
  );
}