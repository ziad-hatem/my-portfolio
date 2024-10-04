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
    accessorKey: "title",
    header: ({ column }) => {
      return <Button variant="ghost">Title</Button>;
    },
    cell: ({ row }) => (
      <div className="lowercase">
        {String(row.getValue("title")).substring(0, 30) + "..."}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: () => <div className="text-left">Description</div>,
    cell: ({ row }) => {
      return (
        <p className="text-right font-medium">
          {String(row.getValue("description")).substring(0, 120) + "..."}
        </p>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: () => <div className="text-left">Start Date</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("startDate"));
      const formattedDate = format(date, "MM/dd/yyyy");
      return <p className="text-right font-medium">{formattedDate}</p>;
    },
  },
  {
    accessorKey: "endDate",
    header: () => <div className="text-left">End Date</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("endDate"));
      const formattedDate = format(date, "MM/dd/yyyy");
      return <p className="text-right font-medium">{formattedDate}</p>;
    },
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
                    "/api/user/addeducation?email=ziadhatemdev@gmail.com",
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
