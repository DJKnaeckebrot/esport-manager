import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { object } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: varchar("role", { length: 20 }).notNull().default("member"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  stripeCustomerId: text("stripe_customer_id").unique(),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
  stripeProductId: text("stripe_product_id"),
  planName: varchar("plan_name", { length: 50 }),
  subscriptionStatus: varchar("subscription_status", { length: 20 }),
  customBranding: boolean("custom_branding").notNull().default(false),
  customBrandingLogo: text("custom_branding_logo"),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  role: varchar("role", { length: 50 }).notNull(),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
});

export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  userId: integer("user_id").references(() => users.id),
  action: text("action").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  targetName: varchar("target_name", { length: 100 }),
  ipAddress: varchar("ip_address", { length: 45 }),
});

export const invitations = pgTable("invitations", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  email: varchar("email", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull(),
  invitedBy: integer("invited_by")
    .notNull()
    .references(() => users.id),
  invitedAt: timestamp("invited_at").notNull().defaultNow(),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
});

export const orgMembers = pgTable("org_members", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 20 }).notNull(),
  userName: varchar("user_name", { length: 100 }).notNull(),
  orgId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  epicId: varchar("epic_id", { length: 50 }).notNull(),
  activityStatus: varchar("activity_status", { length: 50 }).notNull(),
  comment: varchar("comment", { length: 255 }),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
});

export const orgTeams = pgTable("org_teams", {
  id: serial("id").primaryKey(),
  orgId: integer("org_id")
    .notNull()
    .references(() => teams.id),
  teamName: integer("teamName").notNull(),
});

export const orgApplicants = pgTable("org_applicants", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 20 }).notNull(),
  userName: varchar("user_name", { length: 100 }).notNull(),
  orgId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  epicId: varchar("epic_id", { length: 50 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  playStyle: varchar("play_style", { length: 50 }).notNull(),
  birthday: timestamp("birthday").notNull(),
  origin: varchar("origin", { length: 50 }).notNull(),
  about: varchar("about", { length: 255 }).notNull(),
  comment: varchar("comment", { length: 255 }),
  rank: varchar("rank", { length: 50 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orgTeamMembers = pgTable("org_team_members", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  role: varchar("role", { length: 50 }).notNull(),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
});

export const teamsRelations = relations(teams, ({ many }) => ({
  teamMembers: many(teamMembers),
  activityLogs: many(activityLogs),
  invitations: many(invitations),
}));

export const orgTeamsRelations = relations(orgTeams, ({ many }) => ({
  orgTeamMembers: many(orgTeamMembers),
}));

export const usersRelations = relations(users, ({ many }) => ({
  teamMembers: many(teamMembers),
  invitationsSent: many(invitations),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
  team: one(teams, {
    fields: [invitations.teamId],
    references: [teams.id],
  }),
  invitedBy: one(users, {
    fields: [invitations.invitedBy],
    references: [users.id],
  }),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  team: one(teams, {
    fields: [activityLogs.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type OrgMember = typeof orgMembers.$inferSelect;
export type NewOrgMember = typeof orgMembers.$inferInsert;
export type OrgTeam = typeof orgTeams.$inferSelect;
export type NewOrgTeam = typeof orgTeams.$inferInsert;
export type OrgApplicant = typeof orgApplicants.$inferSelect;
export type NewOrgApplicant = typeof orgApplicants.$inferInsert;
export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
export type Invitation = typeof invitations.$inferSelect;
export type NewInvitation = typeof invitations.$inferInsert;
export type TeamDataWithMembers = Team & {
  teamMembers: (TeamMember & {
    user: Pick<User, "id" | "name" | "email">;
  })[];
};

export enum ActivityType {
  SIGN_UP = "SIGN_UP",
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
  UPDATE_PASSWORD = "UPDATE_PASSWORD",
  DELETE_ACCOUNT = "DELETE_ACCOUNT",
  UPDATE_ACCOUNT = "UPDATE_ACCOUNT",
  CREATE_TEAM = "CREATE_TEAM",
  UPDATE_TEAM = "UPDATE_TEAM",
  REMOVE_TEAM_MEMBER = "REMOVE_TEAM_MEMBER",
  INVITE_TEAM_MEMBER = "INVITE_TEAM_MEMBER",
  ACCEPT_INVITATION = "ACCEPT_INVITATION",
  CREATE_ORG_MEMBER = "CREATE_ORG_MEMBER",
  DELETE_ORG_MEMBER = "DELETE_ORG_MEMBER",
  UPDATE_ORG_MEMBER = "UPDATE_ORG_MEMBER",
  CREATE_ORG_TEAM = "CREATE_ORG_TEAM",
  DELETE_ORG_TEAM = "DELETE_ORG_TEAM",
  UPDATE_ORG_TEAM = "UPDATE_ORG_TEAM",
  CREATE_ORG_APPLICANT = "CREATE_ORG_APPLICANT",
  DELETE_ORG_APPLICANT = "DELETE_ORG_APPLICANT",
  UPDATE_ORG_APPLICANT = "UPDATE_ORG_APPLICANT",
}
