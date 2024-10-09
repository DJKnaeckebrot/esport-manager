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
  ipAddress?: string,
  targetName?: string
) {
  if (teamId === null || teamId === undefined) {
    return;
  }
  const newActivity: NewActivityLog = {
    teamId,
    userId,
    action: type,
    ipAddress: ipAddress || "",
    targetName: targetName || "",
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
      ActivityType.CREATE_ORG_MEMBER,
      undefined,
      newUser.userName
    );

    return { success: "Member added successfully" };
  }
);

const deleteOrgMemberSchema = z.object({
  id: z.string(),
});

export const deleteOrgMember = validatedActionWithUser(
  deleteOrgMemberSchema,
  async (data, _, user) => {
    //const { id } = data;
    const id = Number(data.id);

    if (isNaN(id)) {
      return { error: "Invalid ID" };
    }

    const userWithTeam = await getUserWithTeam(user.id);

    if (!userWithTeam?.teamId) {
      return { error: "User is not part of a team" };
    }

    await db
      .delete(orgMembers)
      .where(
        and(
          eq(orgMembers.id, id),
          eq(orgMembers.orgId, userWithTeam?.teamId ?? 0)
        )
      );

    await logActivity(
      userWithTeam.teamId,
      user.id,
      ActivityType.DELETE_ORG_MEMBER,
      undefined,
      id.toString()
    );

    return { success: "Member has been deleted" };
  }
);

const updateOrgMemberSchema = z.object({
  id: z.string(),
  activityStatus: z.string(),
  userName: z.string(),
  epicId: z.string(),
  userId: z.string(),
  comment: z.string(),
});

export const updateOrgMember = validatedActionWithUser(
  updateOrgMemberSchema,
  async (data, _, user) => {
    //const { id } = data;
    const id = Number(data.id);

    if (isNaN(id)) {
      return { error: "Invalid ID" };
    }

    const userWithTeam = await getUserWithTeam(user.id);

    if (!userWithTeam?.teamId) {
      return { error: "User is not part of a team" };
    }

    const updatedData = {
      ...data,
      id,
    };

    await db
      .update(orgMembers)
      .set(updatedData)
      .where(
        and(
          eq(orgMembers.id, id),
          eq(orgMembers.orgId, userWithTeam?.teamId ?? 0)
        )
      );

    await logActivity(
      userWithTeam.teamId,
      user.id,
      ActivityType.UPDATE_ORG_MEMBER,
      undefined,
      updatedData.userName
    );

    return { success: "Member has been updated" };
  }
);
