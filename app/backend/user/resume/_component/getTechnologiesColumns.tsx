import React from "react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Education, WhatIDo } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useContextProvider } from "@/app/_components/providers/context-provider";
import { format } from "date-fns";
import Image from "next/image";

interface ColumnsProps {
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
  setDetailData: (detailData: any) => void;
  data: Education[];
}

export const getColumns = ({
  isEdit,
  setIsEdit,
  setDetailData,
  data,
}: ColumnsProps): ColumnDef<Education>[] => [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "icon",
    header: ({ column }) => {
      return <Button variant="ghost">Icon</Button>;
    },
    cell: ({ row }) => (
      <div className="lowercase">
        <Image
          src={row.getValue("icon")}
          width={100}
          height={100}
          alt="Tech Logo"
          unoptimized
          className="w-[35px] h-auto object-contain mx-auto"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <Button variant="ghost">Name</Button>;
    },
    cell: ({ row }) => (
      <div className="flex justify-center">
        {String(row.getValue("name")).substring(0, 30)}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { userData, refreshData } = useContextProvider();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                const detailData = data.filter(
                  (item) => item.id === row.original.id
                );
                setDetailData(detailData[0]);
                setIsEdit(true);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                try {
                  await axios.delete(
                    "/api/user/myskills?email=ziadhatem2022@gmail.com",
                    {
                      data: {
                        id: row.original.id,
                        email: userData?.email,
                      },
                    }
                  );
                  toast.success("Data deleted successfully");
                  refreshData();
                } catch (error) {
                  toast.error("Error deleting data");
                  console.log("Error deleting data", error);
                }
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
