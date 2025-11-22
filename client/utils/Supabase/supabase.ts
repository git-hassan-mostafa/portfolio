import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.PROJECT_URL as string,
  process.env.API_KEY as string
);

export default supabase;
