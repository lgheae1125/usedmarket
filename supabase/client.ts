import { Database } from "@/database.types";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) throw "is nullable supabasesUrl";
if (!supabaseAnonKey) throw "is nullable supabasesUrl";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
