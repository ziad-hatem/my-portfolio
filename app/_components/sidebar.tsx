"use client";

import { User } from "@prisma/client";
import {
  Download,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  RocketIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const Contact = ({ phoneNumber = "", email = "", location = "" }) => {
  const href = phoneNumber
    ? `tel:${phoneNumber}`
    : email
    ? `mailto:${email}`
    : location
    ? `https://maps.google.com/?q=${location}`
    : "";

  return (
    <Link href={href} className="flex items-center gap-2 group">
      <div className="border-[#19191A] border-[2px] rounded-[10px] p-2">
        {phoneNumber != "" && <PhoneIcon className="w-6 h-6 text-white" />}
        {email != "" && <MailIcon className="w-6 h-6 text-white" />}
        {location != "" && <MapPinIcon className="w-6 h-6 text-white" />}
      </div>
      <div>
        <p className="text-[#64646A] text-[12px] text-start">
          {phoneNumber && "Phone"}
          {email && "Email"}
          {location && "Location"}
        </p>
        <p className="text-white text-[15px] text-start">
          {phoneNumber || email || location}
        </p>
      </div>
    </Link>
  );
};

const Sidebar = ({ data }: { data: User | null }) => {
  return (
    <div className="bg-[#1E1E1F] md:w-[280px] md:h-[550px] rounded-[20px] pt-[25px]">
      <div className="image md:w-[130px] md:h-[130px] rounded-[15px] overflow-hidden mx-auto">
        <Image
          src={data?.image || ""}
          width={100}
          height={100}
          alt="Profile Img"
          unoptimized
          className="w-full"
        />
      </div>
      <div className="name mt-[20px]">
        <h1 className="text-white text-[20px] text-center">{data?.name}</h1>
      </div>
      <div className="position  mt-[20px] w-[160px] h-[40px] rounded-[10px] bg-[#2A2A2C] flex items-center justify-center mx-auto">
        <p className="text-white text-[15px] text-center">{data?.position}</p>
      </div>

      <div className="w-[90%] mx-auto bg-[#2A2A2C] h-[1px] mt-[20px] mb-[20px]" />
      <div className="flex flex-col gap-4 mx-auto w-[90%]">
        <Contact email={data?.email || ""} />
        <Contact phoneNumber={data?.phoneNumber || ""} />
        <Contact location={data?.location || ""} />
      </div>
      <div className="flex w-[80%] mx-auto justify-around">
        <Link
          href={`${data?.linkedinUrl}`}
          target="_blank"
          className="flex items-center group gap-2 mt-[30px] text-white text-[15px] font-bold mx-auto"
        >
          Follow Me
          <RocketIcon className="w-5 h-5 text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
        </Link>
        <Link
          href={"/Ziad Hatem - CV.pdf"}
          className="flex items-center group gap-2 mt-[30px] text-white text-[15px] font-bold mx-auto"
        >
          CV
          <Download className="w-5 h-5 text-white group-hover:translate-y-1 transition-all duration-300" />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
