import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Validación defensiva opcional
if (!supabaseUrl || !supabaseKey) {
  console.warn("⚠️ Supabase: faltan variables de entorno VITE_SUPABASE_URL o VITE_SUPABASE_KEY");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
