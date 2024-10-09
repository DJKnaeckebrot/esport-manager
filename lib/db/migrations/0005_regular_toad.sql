CREATE TABLE IF NOT EXISTS "org_team_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"team_id" integer NOT NULL,
	"role" varchar(50) NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_teams" (
	"id" serial PRIMARY KEY NOT NULL,
	"org_id" integer NOT NULL,
	"teamName" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "activity_logs" ADD COLUMN "target_name" varchar(100);--> statement-breakpoint
ALTER TABLE "org_members" ADD COLUMN "comment" varchar(255);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_team_members" ADD CONSTRAINT "org_team_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_team_members" ADD CONSTRAINT "org_team_members_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_teams" ADD CONSTRAINT "org_teams_org_id_teams_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
