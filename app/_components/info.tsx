"use client";
import React from "react";
import InfoNavigation from "./info-navigation";
import { useContextProvider } from "./providers/context-provider";
import About from "./about";
import Resume from "./resume";
import Animation from "./animation/animation";
import Portfolio from "./portfolio";
import InfoNavigationMobile from "./info-navigation-mobile";
import ContactPage from "./contact";

const Info = ({ data }: { data: any }) => {
  const { active } = useContextProvider();

  return (
    <main className="overflow-hidden relative min-h-[600px] h-fit lg:mr-5 max-sm:w-[90%] max-lg:w-[80%] w-[90%] lg:max-w-[700px] rounded-[20px] bg-[#1E1E1F]">
      <InfoNavigation />

      <Animation>
        {active === "about" && <About data={data} />}
        {active === "resume" && <Resume />}
        {active === "projects" && <Portfolio data={data.projects} />}
        {active === "contact" && <ContactPage />}
      </Animation>
    </main>
  );
};

export default Info;
