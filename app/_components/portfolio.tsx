import React from "react";
import ProjectComponent from "./ProjectComponent";
import { Projects } from "@prisma/client";

const Portfolio = ({ data }: { data: Projects[] }) => {
  return (
    <div className="w-full h-full max-lg:mt-12 relative flex flex-col px-[25px]">
      <div className="w-fit absolute top-[-30px] left-[25px]">
        <h1 className="text-white text-4xl mb-1">Projects</h1>
        <div
          className={`h-[2px] w-[35%] bg-[#63E2B7] transition-all duration-300`}
        />
      </div>

      <div className="mt-16 flex max-md:justify-center gap-x-4 gap-y-6 flex-wrap">
        {data.map((e, index) => {
          return <ProjectComponent key={index} data={e} />;
        })}
      </div>
    </div>
  );
};

export default Portfolio;
