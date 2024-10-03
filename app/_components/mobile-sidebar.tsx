import { db } from "@/utils/db";
import Image from "next/image";
import ShowContacts from "./show-contacts";
import MobileSidebarContacts from "./mobile-sidebar-contact";
import ImageLoader from "./image-loader";

const MobileSidebar = ({ data }: { data: any }) => {
  if (!data) return null;

  return (
    <div className="sm:w-[80%] w-[90%] relative min-h-[180px] transition-all duration-300 flex flex-col gap-5 pt-5 items-center mx-auto bg-[#1E1E1F] rounded-[20px]">
      <div className="flex items-center gap-3 w-full">
        <div className="image w-[130px] h-[130px] rounded-[15px] overflow-hidden ml-[30px]">
          <ImageLoader src={data?.image || ""} />
        </div>

        <div className="data flex flex-col gap-5">
          <h1 className="text-white text-[calc(1.5rem+0.5vw)]">{data?.name}</h1>
          <div className="position w-[160px] h-[35px] rounded-[10px] bg-[#2A2A2C] flex items-center justify-center">
            <p className="text-white text-[15px] text-center">
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
