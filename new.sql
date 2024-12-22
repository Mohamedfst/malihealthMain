
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text,
	"first_name" text,
	"last_name" text,
	"dob" text,
	"personal_num" text,
	"emergency_num" text,
	"address" text,
	"med_license" text,
	"nat_license" text,
	"languages" text,
	"team" text,
	"center_id" text,
	"organization_id" text,
	"role" text,
	"photo" text
);
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, first_name, last_name, 
  dob, personal_num, emergency_num, address, med_license, nat_license, languages, team, center_id, organization_id, role, photo)
  values (new.id, new.email,
  new.raw_user_meta_data->>'first_name', 
  new.raw_user_meta_data->>'last_name', 
  new.raw_user_meta_data->>'dob', 
  new.raw_user_meta_data->>'personal_num', 
  new.raw_user_meta_data->>'emergency_num', 
  new.raw_user_meta_data->>'address', 
  new.raw_user_meta_data->>'med_license', 
  new.raw_user_meta_data->>'nat_license', 
  new.raw_user_meta_data->>'languages', 
  new.raw_user_meta_data->>'team', 
  new.raw_user_meta_data->>'center_id', 
  new.raw_user_meta_data->>'organization_id', 
  new.raw_user_meta_data->>'role', 
  new.raw_user_meta_data->>'photo'
  );
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

drop publication if exists powersync;
create publication powersync for table public.todos;




CREATE TABLE IF NOT EXISTS "patients"(
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text,
  "middle_name" text,
  "last_name" text,
  "dob" text,
  "national_license" text,
  "number" text,
  "email" text,
  "address" text,
  "emergency_num" text,
  "languages" text,
  "center_id" uuid NOT NULL,
  "organization_id" uuid NOT NULL,
  "providers_id" uuid NOT NULL
);

--> statement-breakpoint 
CREATE TABLE IF NOT EXISTS "providers"(
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text,
  "middle_name" text,
  "last_name" text,
  "dob" text,
  "medical_license" text,
  "role" text,
  "number" text,
  "email" text,
  "address" text,
  "emergency_num" text,
  "languages" text,
  "health_team" text,
  "health_center" text,
  "organization_id" uuid NOT NULL
);



CREATE TABLE IF NOT EXISTS "campaigns" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
  "description" text,
	"is_active" integer DEFAULT 0,
	"modified_at" timestamp DEFAULT now(),
	"organization_id" uuid NOT NULL
);