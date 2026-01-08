import { supabase } from "../../../../app/routes/Supabase/SupabaseClient"

export const Logout = () => {
    return (
        <button onClick={() => supabase.auth.signOut()} className="bg-white/10 text-gray-800 px-4 py-2 shadow-lg rounded-2xl font-bold ring-1 ring-black/7">Logout</button>
    )
}
