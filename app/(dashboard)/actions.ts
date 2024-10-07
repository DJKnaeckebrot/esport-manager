"use server";

import { z } from "zod";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import {
  User,
  users,
  teams,
  teamMembers,
  activityLogs,
  type NewOrgMember,
  type NewActivityLog,
  ActivityType,
  invitations,
  orgMembers,
} from "@/lib/db/schema";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createCheckoutSession } from "@/lib/payments/stripe";
import { getUser, getUserWithTeam } from "@/lib/db/queries";
import {
  validatedAction,
  validatedActionWithUser,
} from "@/lib/auth/middleware";

async function logActivity(
  teamId: number | null | undefined,
  userId: number,
  type: ActivityType,
  ipAddress?: string
) {
  if (teamId === null || teamId === undefined) {
    return;
  }
  const newActivity: NewActivityLog = {
    teamId,
    userId,
    action: type,
    ipAddress: ipAddress || "",
  };
  await db.insert(activityLogs).values(newActivity);
}

export const getMembers = validatedActionWithUser(
  z.object({}),
  async (_, __, user) => {
    const userWithTeam = await getUserWithTeam(user.id);

    if (!userWithTeam?.teamId) {
      return { error: "User is not part of a team" };
    }

    const members = await db
      .select()
      .from(orgMembers)
      .where(eq(orgMembers.orgId, userWithTeam.teamId));

    return { members };
  }
);

const addOrgMemberSchema = z.object({
  userId: z.string(),
  userName: z.string(),
  epicId: z.string(),
  activityStatus: z.string(),
});

export const addOrgMember = validatedActionWithUser(
  addOrgMemberSchema,
  async (data, _, user) => {
    const { userId, userName, epicId, activityStatus } = data;

    console.log("Adding Member to Org: ", userName);

    const userWithTeam = await getUserWithTeam(user.id);

    if (!userWithTeam?.teamId) {
      return { error: "User is not part of a team" };
    }

    const newUser: NewOrgMember = {
      userName: userName,
      userId: userId,
      orgId: userWithTeam.teamId,
      epicId,
      activityStatus,
    };

    const [createdUser] = await db
      .insert(orgMembers)
      .values(newUser)
      .returning();

    if (!createdUser) {
      return { error: "Failed to create user. Please try again." };
    }

    await logActivity(
      userWithTeam.teamId,
      user.id,
      ActivityType.CREATE_ORG_MEMBER
    );

    return { success: "Member added successfully" };
  }
);
