"use client";
import { MemberDataTable } from "@/components/member/data-table";
//import { User } from "@/constants/data";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { OrgMember } from "@/lib/db/schema";

interface ProductsClientProps {
  data: OrgMember[];
}

export const MemberTableClient: React.FC<ProductsClientProps> = ({ data }) => {
  return (
    <>
      <MemberDataTable columns={columns} data={data} />
    </>
  );
};
