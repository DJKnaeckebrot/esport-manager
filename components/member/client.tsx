"use client";
import { MemberDataTable } from "@/components/member/data-table";
//import { User } from "@/constants/data";
import { Member } from "@/types";
import { useRouter } from "next/navigation";
import { columns } from "./columns";

interface ProductsClientProps {
  data: Member[];
}

export const MemberTableClient: React.FC<ProductsClientProps> = ({ data }) => {
  return (
    <>
      <MemberDataTable columns={columns} data={data} />
    </>
  );
};
