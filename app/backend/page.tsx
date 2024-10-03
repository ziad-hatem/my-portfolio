import React from "react";
import { DataTableDemo } from "../_components/data-table";
import { db } from "@/utils/db";

const page = async () => {
  const data = await db.user.findMany();
  return (
    <div className="py-5 px-5 w-full h-full">
      <DataTableDemo data={data} />
    </div>
  );
};

export default page;
