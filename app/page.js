import { TableDemo } from "@/components/HomePageTable";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-[100vh] w-[80%] mx-auto  justify-between items-center ">
      <div className="flex justify-between items-center translate-y-[-2rem] ">
        <div className="pl-[1rem]  w-[45%]">
          <TableDemo/>
        </div>
        
        <Image src="/Assets/BB.png" width={700} height={10} alt="Background" className="translate-x-[2rem]  pt-2"  />
       
      
      </div>
    </div>
  );
}
