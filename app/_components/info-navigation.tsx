"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useContextProvider } from "./providers/context-provider";

export const navData = [
  {
    id: 1,
    name: "About",
    data: "about",
  },
  {
    id: 2,
    name: "Resume",
    data: "resume",
  },
  {
    id: 3,
    name: "Projects",
    data: "projects",
  },
  {
    id: 4,
    name: "Contact",
    data: "contact",
  },
];

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

const InfoNavigation = () => {
  const { active, setActive } = useContextProvider();
  return (
    <div>
      <nav className=" relative z-10 items-center bg-[#4B4B4E] text-white h-[55px] w-[60%] ml-auto rounded-tr-[20px] rounded-bl-[20px] max-lg:hidden flex">
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
    </div>
  );
};

export default InfoNavigation;
