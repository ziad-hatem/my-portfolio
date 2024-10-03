import { BookOpen, BriefcaseBusiness } from "lucide-react";
import React from "react";
import StepComponent from "./step-component";
import { WorkExperience } from "@prisma/client";

const Header = () => {
  return (
    <div className="flex gap-3">
      <div className="border p-[6px] rounded items-center justify-center border-gray-800">
        <BriefcaseBusiness className="h-5 w-5" color="#63E2B7" />
      </div>
      <h1 className="text-white text-xl">Experience</h1>
    </div>
  );
};

const ExperienceComponent = ({ data }: { data: WorkExperience[] }) => {
  return (
    <div className="mt-12">
      <header>
        <Header />
      </header>
      <div className="ml-3 flex flex-col">
        {data.map((e, i) => (
          <StepComponent key={i} data={e} showLine={i < data.length - 1} />
        ))}
      </div>
    </div>
  );
};

export default ExperienceComponent;
