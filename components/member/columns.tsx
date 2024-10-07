"use client";

import { Member } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

const statuses = {
  active: "text-green-400 bg-green-400/10",
  inactive: "text-rose-400 bg-rose-400/10",
};

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "userId",
    header: "User ID",
  },
  {
    accessorKey: "userName",
    header: "Benutzername",
  },
  {
    accessorKey: "epicId",
    header: "Epic ID",
  },
  {
    accessorKey: "activityStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Aktivitätsstatus
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      // @ts-ignore
      <Badge
        variant={
          row.original.activityStatus === "inactive" ? "destructive" : "default"
        }
      >
        {row.original.activityStatus}
      </Badge>
    ),
  },
];
