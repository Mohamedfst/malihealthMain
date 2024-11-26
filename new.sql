CREATE TABLE IF NOT EXISTS "todos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"task" text,
	"is_complete" integer DEFAULT 0,
	"modified_at" timestamp DEFAULT now(),
	"user_id" uuid NOT NULL
);

--> statement-breakpoint
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
	"center" text,
	"organization" text,
	"role" text,
	"photo" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todos" ADD CONSTRAINT "todos_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

alter table todos enable row level security;
create policy "Individuals can create todos." on todos for
    insert with check (auth.uid() = user_id);
create policy "Individuals can view their own todos. " on todos for
    select using ((select auth.uid()) = user_id);
create policy "Individuals can update their own todos." on todos for
    update using ((select auth.uid()) = user_id);
create policy "Individuals can delete their own todos." on todos for
    delete using ((select auth.uid()) = user_id);

create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, first_name, last_name, 
  dob, personal_num, emergency_num, address, med_license, nat_license, languages, team, center, organization, role, photo)
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
  new.raw_user_meta_data->>'center', 
  new.raw_user_meta_data->>'organization', 
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