import HomePageStats from "@/components/HomePageStats";
import { CombinedTable } from "@/components/HomePageTable";
import { fetchAndProcessIPOData } from "@/utils/HomePageData";
import Image from "next/image";
export default async function Home() {
  const { ipoData, smeData, listingGains } = await fetchAndProcessIPOData();

  return (
    <div className="h-[100vh] w-[80%] mx-auto flex-col justify-between items-center ">
      {/* hero section */}
      <div className="flex justify-between items-center">
        <div className="pl-[1rem] w-[42%]">
          <CombinedTable ipoData={ipoData} smeData={smeData} />
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
      {/* stats section */}
      <div>
         <HomePageStats listingGains={listingGains} />
      </div>
     
    </div>
  );
}
