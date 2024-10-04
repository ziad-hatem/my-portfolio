"use client";
import { db } from "@/utils/db";
import { WhatIDo } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const icons = {
  experience: "/work-experience.png",
  projects: "/idea.png",
  training: "/programming.png",
  certification: "/certificate.png",
};

export const Box = ({
  icon,
  text,
  header,
}: {
  icon: string;
  text: string;
  header: number;
}) => {
  return (
    <div className="w-[calc(50%-10px)] lg:w-[calc(25%-10px)] h-fit py-3 flex items-start gap-3">
      <Image
        src={icon}
        alt="icon"
        width={100}
        quality={100}
        loading="lazy"
        height={100}
        className="w-[50px] h-[50px]"
      />
      <div>
        <h1 className="text-white text-sm md:text-md">{header}+</h1>
        <p className="text-[#bfbfbf] text-xs md:text-sm">{text}</p>
      </div>
    </div>
  );
};

export const WhatImDoing = ({ data }: any) => {
  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom right, hsl(0, 0%, 25%) 0%, hsla(0, 0%, 25%, 0) 50%)",
      }}
      className="w-full lg:w-[calc(50%-10px)] min-h-[100px] rounded-lg flex items-start gap-3 justify-start p-3"
    >
      <Image
        src="/programming.png"
        loading="lazy"
        alt="react"
        width={100}
        height={100}
        className="w-[50px] h-[50px] object-contain mt-2"
      />
      <div className="flex flex-col items-start justify-center">
        <h1 className="text-white text-md font-bold">{data.title}</h1>
        <p className="text-[#bfbfbf] text-sm">{data.text}</p>
      </div>
    </div>
  );
};

const About = ({ data }: { data: any }) => {
  return (
    <div className="w-full h-fit relative flex flex-col max-lg:mt-12 pl-[15px] md:pl-[25px] pb-4">
      <div className="w-fit absolute top-[-30px] left-[25px]">
        <h1 className="text-white text-4xl mb-1">About</h1>
        <div
          className={`h-[2px] w-[35%] bg-[#63E2B7] transition-all duration-300`}
        />
      </div>
      <p
        className="text-white text-lg pr-3 mt-10 line"
        style={{
          lineBreak: "anywhere",
        }}
      >
        {data?.aboutMe?.description}
      </p>
      <div className="flex flex-row flex-wrap justify-between gap-2 pr-3 w-[90%] mt-1 md:mt-6">
        <Box
          icon={icons.experience}
          header={data?.aboutMe?.yearsOfExperience || 0}
          text="Years Of Experience"
        />

        <Box
          icon={icons.projects}
          header={data?.projects.length || 0}
          text="Projects Completed"
        />
        <Box
          icon={icons.training}
          header={data?.aboutMe?.trainingCourses || 0}
          text="Training & Courses"
        />
        <Box
          icon={icons.certification}
          header={data?.aboutMe?.awardsCertificates || 0}
          text="Awards & Certificates"
        />
      </div>

      <div className="w-full h-full flex flex-col items-start justify-center mt-3">
        <h1 className="text-white text-2xl mb-1 font-semibold">
          What i'm doing
        </h1>
        <div className="flex w-full flex-wrap gap-2 mt-4 pr-4">
          {data?.whatIDo?.map((e: WhatIDo) => {
            return <WhatImDoing data={e} key={e.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
