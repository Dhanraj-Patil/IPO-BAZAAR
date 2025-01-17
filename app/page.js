import { CombinedTable } from "@/components/HomePageTable";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-[100vh] w-[80%] mx-auto justify-between items-center">
      <div className="flex justify-between items-center">
        <div className="pl-[1rem] w-[44%]">
          <CombinedTable />
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
    </div>
  );
}
