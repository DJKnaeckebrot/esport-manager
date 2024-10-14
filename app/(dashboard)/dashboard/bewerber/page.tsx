import { redirect } from "next/navigation";
import {
  getOrgApplicantsForTeam,
  getTeamForUser,
  getUser,
} from "@/lib/db/queries";
import TestComponent from "@/components/applicants/test";
import { User, TeamDataWithMembers } from "@/lib/db/schema";
import { ApplicantTableClient } from "@/components/applicants/client";
import AddApplicantModal from "@/components/applicants/add-applicant-modal";

const getApplicantManagementFlag = async (
  user: User,
  teamData: TeamDataWithMembers
) => {
  let showApplicantManagement = false;

  if (user && teamData && teamData.planName === "Plus") {
    showApplicantManagement = true;
  }

  return showApplicantManagement;
};

export default async function ApplicantPage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const teamData = await getTeamForUser(user.id);

  if (!teamData) {
    throw new Error("Team not found");
  }

  if (!teamData) {
    throw new Error("Members not found");
  }

  const isApplicantManagementEnabled = await getApplicantManagementFlag(
    user,
    teamData
  );

  const data = await getOrgApplicantsForTeam(teamData.id);

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 dark:text-gray-100 mb-6">
        Deine Bewerber
      </h1>

      {isApplicantManagementEnabled ? (
        <>
          <AddApplicantModal />
          <div className="mt-8">
            <ApplicantTableClient data={data} />
          </div>
        </>
      ) : (
        <p className="text-red-500">
          Update zum Pro Plan um dieses Feature frei zu schalten
        </p>
      )}
    </section>
  );
}
