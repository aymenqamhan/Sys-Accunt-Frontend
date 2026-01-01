import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://syfhfrduueesvtimkkyt.supabase.co";
const supabaseKey = ""; // secret key from supabase

if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase variables are missing in .env");
}

// إنشاء عميل Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);


