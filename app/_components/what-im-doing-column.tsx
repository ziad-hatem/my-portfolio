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
import { useContextProvider } from "./providers/context-provider";

interface ColumnsProps {
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
  setDetailData: (detailData: WhatIDo) => void;
  data: Education[];
}

export const getColumns = ({
  isEdit,
  setIsEdit,
  setDetailData,
  data,
}: any): ColumnDef<any>[] => [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <Button variant="ghost">title</Button>;
    },
    cell: ({ row }) => (
      <div className="lowercase">
        {String(row.getValue("title")).substring(0, 30) + "..."}
      </div>
    ),
  },
  {
    accessorKey: "text",
    header: () => <div className="text-left">Text</div>,
    cell: ({ row }) => {
      return (
        <p className="text-right font-medium">
          {String(row.getValue("text")).substring(0, 120) + "..."}
        </p>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { userData } = useContextProvider();
      const router = useRouter();
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
                  (item: any) => item.id === row.original.id
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
                  await axios.delete("/api/user/whatimdoing", {
                    data: {
                      id: row.original.id,
                      email: userData?.email,
                    },
                  });
                  toast.success("Data deleted successfully");
                  router.refresh();
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
