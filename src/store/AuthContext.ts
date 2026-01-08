import { map } from "nanostores";
import { supabase } from "../app/routes/Supabase/SupabaseClient";
import type { User } from "@supabase/supabase-js";

export const $auth = map<{
  user: User | null;
  loading: boolean;
}>({
  user: null,
  loading: true,
});

supabase.auth.getSession().then(({ data: { session } }) => {
  $auth.setKey("user", session?.user ?? null);
  $auth.setKey("loading", false);
});

supabase.auth.onAuthStateChange((_event, session) => {
  $auth.setKey("user", session?.user ?? null);
  $auth.setKey("loading", false);
});
