"use client";
import React from "react";
import { TableProjects } from "./_components/projects-table";
import { useContextProvider } from "@/app/_components/providers/context-provider";

const page = () => {
  const { userData } = useContextProvider();
  return (
    <div className="p-5">
      <TableProjects data={userData.projects} />
    </div>
  );
};

export default page;
