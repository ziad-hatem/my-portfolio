import { BookOpen } from "lucide-react";
import React from "react";
import StepComponent from "./step-component";
import { Education } from "@prisma/client";

const Header = () => {
  return (
    <div className="flex gap-3">
      <div className="border p-[6px] rounded items-center justify-center border-gray-800">
        <BookOpen className="h-5 w-5" color="#63E2B7" />
      </div>
      <h1 className="text-white text-xl">Education</h1>
    </div>
  );
};

const EducationComponent = ({ data }: { data: Education[] }) => {
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

export default EducationComponent;
