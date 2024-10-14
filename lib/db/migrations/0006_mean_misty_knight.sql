CREATE TABLE IF NOT EXISTS "org_applicants" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(20) NOT NULL,
	"user_name" varchar(100) NOT NULL,
	"team_id" integer NOT NULL,
	"epic_id" varchar(50) NOT NULL,
	"name" varchar(100) NOT NULL,
	"play_style" varchar(50) NOT NULL,
	"birthday" timestamp NOT NULL,
	"origin" varchar(50) NOT NULL,
	"about" varchar(255) NOT NULL,
	"comment" varchar(255),
	"rank" varchar(50) NOT NULL,
	"status" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_applicants" ADD CONSTRAINT "org_applicants_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
