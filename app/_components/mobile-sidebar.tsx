import { db } from "@/utils/db";
import Image from "next/image";
import ShowContacts from "./show-contacts";
import MobileSidebarContacts from "./mobile-sidebar-contact";

const MobileSidebar = ({ data }: { data: any }) => {
  if (!data) return null;

  return (
    <div className="sm:w-[80%] w-[90%] relative min-h-[150px] transition-all duration-300 flex flex-col gap-5 pt-8 md:pt-5 items-center mx-auto bg-[#1E1E1F] rounded-[20px]">
      <div className="flex items-center gap-3 w-full">
        <div className="image w-[130px] h-[130px] rounded-[15px] overflow-hidden ml-[15px] md:ml-[30px]">
          <Image
            src={data?.image || ""}
            width={100}
            height={100}
            alt="Profile Img"
            unoptimized
            className="w-full"
          />
        </div>

        <div className="data flex flex-col gap-5">
          <h1 className="text-white text-[calc(1.2rem+0.5vw)]">{data?.name}</h1>
          <div className="position w-[120px] md:w-[160px] px-3 h-[35px] rounded-[10px] bg-[#2A2A2C] flex items-center justify-center">
            <p className="text-white text-[10px] md:text-[15px] text-center">
              {data?.position}
            </p>
          </div>
          <ShowContacts />
        </div>
      </div>

      <MobileSidebarContacts data={data} />
    </div>
  );
};

export default MobileSidebar;
