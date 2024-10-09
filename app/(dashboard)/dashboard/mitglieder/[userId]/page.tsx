import { redirect } from "next/navigation";
import { MemberTableClient } from "@/components/member/client";
import { getOrgMember, getUser } from "@/lib/db/queries";
import { EditMemberForm } from "@/components/member/edit-member-form";

export default async function SingleMemberPage({
  params,
}: {
  params: { userId: number };
}) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const userData = await getOrgMember(params.userId);

  if (!userData) {
    throw new Error("Member not found");
  }

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 dark:text-gray-100 mb-6">
        Member Details für {userData.userName}
      </h1>

      <div className="mt-8">
        <EditMemberForm user={userData} />
      </div>
    </section>
  );
}
