import { redirect } from "next/navigation";
import { MemberTableClient } from "@/components/member/client";
import { getOrgApplicant, getUser } from "@/lib/db/queries";
import { EditMemberForm } from "@/components/member/edit-member-form";
import { EditApplicantForm } from "@/components/applicants/edit-applicant-form";

export default async function SingleMemberPage({
  params,
}: {
  params: { userId: number };
}) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const userData = await getOrgApplicant(params.userId);

  if (!userData) {
    throw new Error("Applicant not found");
  }

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 dark:text-gray-100 mb-6">
        Bewerber Details für {userData.userName}
      </h1>

      <div className="mt-8">
        <EditApplicantForm user={userData} />
      </div>
    </section>
  );
}
