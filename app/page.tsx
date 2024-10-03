"use client";
import Info from "./_components/info";
import MobileSidebar from "./_components/mobile-sidebar";
import Sidebar from "./_components/sidebar";
import HashLoader from "react-spinners/HashLoader";
import ParticlesBackground from "./_components/ParticlesBackground";
import InfoNavigationMobile from "./_components/info-navigation-mobile";
import { useContext, useEffect, useState } from "react";
import {
  ContextProvider,
  useContextProvider,
} from "./_components/providers/context-provider";
import axios from "axios";

export default function Home() {
  const { userData } = useContextProvider();
  console.log(userData);

  return (
    <div className="relative bg-black flex flex-col max-lg:flex-col-reverse max-lg:gap-5 justify-center min-h-full pb-[100px] pt-[100px]">
      <div className="absolute top-0 left-0 w-full h-full z-[1]">
        <ParticlesBackground />
      </div>
      <div className="flex flex-row justify-center relative z-10 w-full h-full">
        <Info data={userData!} />
        <div className="hidden lg:block sticky h-full top-[20px]">
          <Sidebar data={userData!} />
        </div>
      </div>
      <div className="block relative z-10 lg:hidden w-full">
        <MobileSidebar data={userData!} />
      </div>

      <InfoNavigationMobile />
    </div>
  );
}
