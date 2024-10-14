"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash, X } from "lucide-react";
import { OrgApplicant } from "@/lib/db/schema";
import { useRouter } from "next/navigation";
import { AlertModal } from "@/components/delete-popover";
import React, { useState } from "react";
import { DeleteApplicantModal } from "./delete-applicant-popover";

interface CellActionProps {
  data: OrgApplicant;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <DeleteApplicantModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={loading}
        userId={data.id}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Menü</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/bewerber/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Bearbeiten
          </DropdownMenuItem>
          <DropdownMenuItem
            className="focus:bg-red-500/50 bg-red-500/10"
            onClick={() => setOpen(true)}
          >
            <Trash className="text-red-500 mr-2 h-4 w-4" /> Löschen
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
