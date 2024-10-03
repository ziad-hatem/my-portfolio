"use client";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import React, { useState } from "react";
import { useContextProvider } from "./providers/context-provider";

const ShowContacts = () => {
  const { showContacts, setShowContacts } = useContextProvider();
  const handleShowContacts = () => {
    setShowContacts(!showContacts);
    console.log(showContacts);
  };
  return (
    <div
      onClick={handleShowContacts}
      className="w-[40%] max-w-[180px] h-[40px] text-muted-foreground border flex items-center justify-center gap-1 border-muted-foreground absolute right-0 top-0 rounded-tr-[20px] rounded-bl-[20px]"
    >
      <p className="text-white max-sm:text-[10px] text-[15px] md:text-[16px] text-center">
        Show Contacts
      </p>
      <ChevronDownIcon
        className={cn(
          `w-3 lg:w-7 h-3 lg:h-7 text-white transition-all duration-300`,
          showContacts ? "rotate-180" : ""
        )}
      />
    </div>
  );
};

export default ShowContacts;
