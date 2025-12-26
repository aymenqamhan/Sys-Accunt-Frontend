import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://syfhfrduueesvtimkkyt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5ZmhmcmR1dWVlc3Z0aW1ra3l0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Nzg2NjQ0MCwiZXhwIjoyMDczNDQyNDQwfQ.rLs96NYTvvsIWE-iW0Uh9p8iBG3jLx_Vf1GkXnZqFx4";

if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase variables are missing in .env");
}

// إنشاء عميل Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);


