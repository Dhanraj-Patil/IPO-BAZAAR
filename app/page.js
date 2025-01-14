import { TableDemo } from "@/components/HomePageTable";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-[100vh] w-[80%] mx-auto  justify-between items-center ">
      <div className="flex justify-between items-center ">
        <div className="pl-[4rem]">
          <TableDemo/>
        </div>
        
        <Image src="/Assets/BB.png" width={600} height={10} alt="Background" className="translate-x-[2rem]"  />
       
      
      </div>
    </div>
  );
}
