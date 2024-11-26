CREATE TABLE IF NOT EXISTS "organizations"(
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text,
  "address" text,
  "email" text,
  "number" text
);

--> statement-breakpoint 
CREATE TABLE IF NOT EXISTS "centers"(
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text,
  "address" text,
  "email" text,
  "number" text,
  "organization_id" uuid NOT NULL
);

--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "centers" ADD CONSTRAINT "centers_organization_name_organizations_name_fk" FOREIGN KEY ("organization_name") REFERENCES "organizations"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

drop publication if exists powersync;
create publication powersync for table public.centers;