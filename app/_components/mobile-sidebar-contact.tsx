"use client";
import React from "react";
import { useContextProvider } from "./providers/context-provider";
import { Contact } from "./sidebar";
import Link from "next/link";
import { Download, RocketIcon } from "lucide-react";
import { User } from "@prisma/client";
import { motion } from "framer-motion";

const MobileSidebarContacts = ({ data }: { data: User }) => {
  const { showContacts } = useContextProvider();

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: showContacts ? "auto" : 0,
        opacity: showContacts ? 1 : 0,
      }}
      transition={{ duration: 0.4, ease: "linear" }}
      className="overflow-hidden pb-4 w-full"
    >
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
          href={"/Ziad Hatem - Resume.pdf"}
          className="flex items-center group gap-2 mt-[30px] text-white text-[15px] font-bold mx-auto"
        >
          CV
          <Download className="w-5 h-5 text-white group-hover:translate-y-1 transition-all duration-300" />
        </Link>
      </div>
    </motion.div>
  );
};

export default MobileSidebarContacts;
