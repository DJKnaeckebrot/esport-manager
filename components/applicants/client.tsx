"use client";
import { ApplicantDataTable } from "@/components/applicants/data-table";
//import { User } from "@/constants/data";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { OrgApplicant } from "@/lib/db/schema";

interface ProductsClientProps {
  data: OrgApplicant[];
}

export const ApplicantTableClient: React.FC<ProductsClientProps> = ({
  data,
}) => {
  return (
    <>
      <ApplicantDataTable columns={columns} data={data} />
    </>
  );
};
