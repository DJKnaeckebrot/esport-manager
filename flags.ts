import { unstable_flag as flag } from "@vercel/flags/next";
import { getTeamForUser, getUser } from "@/lib/db/queries";

const user = await getUser();

let showApplicantMangement: boolean = false;

if (user) {
  const teamData = await getTeamForUser(user.id);

  if (teamData) {
    if (teamData.planName === "Plus") showApplicantMangement = true;
  }
} else {
  showApplicantMangement = false;
}

export const showBanner = flag({
  key: "banner",
  decide: () => false,
});

export const accessApplicantManagement = flag({
  key: "applicant_management",
  async decide() {
    return showApplicantMangement;
  },
});
