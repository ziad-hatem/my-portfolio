"use client";
import React from "react";
import { navData } from "./info-navigation";
import { cn } from "@/lib/utils";
import { useContextProvider } from "./providers/context-provider";

const NavItem = ({
  name,
  data,
  active,
  setActive,
}: {
  name: string;
  data: string;
  active: string;
  setActive: (data: string) => void;
}) => {
  return (
    <li
      className={`text-white text-[15px] cursor-pointer relative`}
      onClick={() => setActive(data)}
    >
      {name}
      <div
        className={cn(
          `h-[2px] w-[0] bg-[#63E2B7] transition-all duration-300`,
          active === data ? "w-[80%]" : "w-[0%]"
        )}
      />
    </li>
  );
};

const InfoNavigationMobile = () => {
  const { active, setActive } = useContextProvider();

  return (
    <nav className="fixed bottom-0 right-0 z-10 items-center bg-[#4B4B4E] text-white h-[55px] w-full ml-auto rounded-tr-[20px] rounded-tl-[20px] max-lg:flex hidden">
      <ul className="flex items-center justify-evenly w-full">
        {navData.map((item) => (
          <NavItem
            key={item.data}
            name={item.name}
            data={item.data}
            active={active}
            setActive={setActive}
          />
        ))}
      </ul>
    </nav>
  );
};

export default InfoNavigationMobile;
