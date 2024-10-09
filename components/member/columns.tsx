"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { CellAction } from "./cell-actions";
import { OrgMember } from "@/lib/db/schema";

const statuses = {
  active: "text-green-400 bg-green-400/10",
  inactive: "text-rose-400 bg-rose-400/10",
};

export const columns: ColumnDef<OrgMember>[] = [
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
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
  {
    id: "track",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Link
              href={`https://rocketleague.tracker.network/rocket-league/profile/epic/${row.original.epicId}/overview`}
            >
              <Search className="h-4 w-4" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Tracken</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
];
