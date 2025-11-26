import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hbwezpzgbllncuooccoc.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhid2V6cHpnYmxsbmN1b29jY29jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNDY2ODgsImV4cCI6MjA3OTcyMjY4OH0.fUnC3lBWsJhcOz_MamzeSjCxXGU2d9F9wl-l22imiqM';

export const supabase = createClient(supabaseUrl, supabaseKey);
