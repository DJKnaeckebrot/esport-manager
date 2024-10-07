import { redirect } from "next/navigation";
import { MemberTableClient } from "@/components/member/client";
import {
  getOrgMembersForTeam,
  getTeamForUser,
  getUser,
} from "@/lib/db/queries";
import { Button } from "@/components/ui/button";
import AddMemberModal from "@/components/member/add-member-modal";

export default async function MembersPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const teamData = await getTeamForUser(user.id);

  if (!teamData) {
    throw new Error("Team not found");
  }

  const data = await getOrgMembersForTeam(teamData.id);

  if (!teamData) {
    throw new Error("Members not found");
  }

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 dark:text-gray-100 mb-6">
        Deine Member
      </h1>

      <AddMemberModal />

      <div className="mt-8">
        <MemberTableClient data={data} />
      </div>
    </section>
  );
}
