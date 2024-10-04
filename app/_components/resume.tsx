import React from "react";
import EducationComponent from "./education-component";
import ExperienceComponent from "./experience-component";
import MySkills from "./my-skills";
import { useContextProvider } from "./providers/context-provider";

const Resume = () => {
  const { userData } = useContextProvider();
  return (
    <div className="w-full h-full max-lg:mt-12 relative flex flex-col pl-[25px]">
      {" "}
      <div className="w-fit absolute top-[-30px] left-[25px]">
        <h1 className="text-white text-4xl mb-1">Resume</h1>
        <div
          className={`h-[2px] w-[35%] bg-[#63E2B7] transition-all duration-300`}
        />
      </div>
      <div>
        <EducationComponent data={userData.education} />
      </div>
      <div className="">
        <ExperienceComponent data={userData.workExperience} />
      </div>
      <div className="pb-5">
        <MySkills data={userData.mySkills} />
      </div>
    </div>
  );
};

export default Resume;
