import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

export const supabase = new Proxy({} as SupabaseClient, {
    get(_target, prop) {
        if (!_supabase) {
            const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
            const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
            if (!url || !key) {
                // Return a no-op during build / SSG
                return () => Promise.resolve({ data: null, error: new Error("Supabase not configured") });
            }
            _supabase = createClient(url, key);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (_supabase as any)[prop];
    },
});
