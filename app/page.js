import Image from "next/image";

export default function Home() {
  return (
    <div className="h-[100vh] w-[80%] mx-auto  justify-between items-center ">
      <div className="flex justify-between">
        <div>
          <div className="text-white text-2xl font-bold">Home</div>
        </div>
        <Image src="/Assets/BB.png" width={700} height={10} alt="Background" />
      </div>
    </div>
  );
}
