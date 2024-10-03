import { MySkills as SkillsProps } from "@prisma/client";
import Image from "next/image";
import React from "react";

const Header = () => {
  return <h1 className="mx-auto w-fit text-2xl">My Skills</h1>;
};

const Skill = ({ skill }: { skill: SkillsProps }) => {
  return (
    <div className="flex flex-col gap-2 w-[80px]">
      <div className="w-[30px] h-[30px] mx-auto">
        <Image
          width={100}
          height={100}
          loading="lazy"
          unoptimized
          alt="skill img"
          src={skill.icon}
        />
      </div>
      <h1 className="text-white tracking-[0.5px] text-center text-xs">
        {skill.name}
      </h1>
    </div>
  );
};

const MySkills = ({ data }: { data: SkillsProps[] }) => {
  return (
    <div className="mt-8 text-white pb-5">
      <Header />

      <div className="mt-8 pr-4 w-full max-lg:justify-center flex gap-x-2 gap-y-[40px] flex-wrap">
        {data.map((skill, index) => (
          <Skill key={index} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default MySkills;
