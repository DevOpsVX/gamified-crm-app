import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://hbwezpzgbllncuooccoc.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhid2V6cHpnYmxsbmN1b29jY29jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNDY2ODgsImV4cCI6MjA3OTcyMjY4OH0.fUnC3lBWsJhcOz_MamzeSjCxXGU2d9F9wl-l22imiqM';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface UserResponse {
  id?: string;
  created_at?: string;
  updated_at?: string;
  session_id: string;
  // Block 1 - Informações do Negócio
  company_name?: string;
  city?: string;
  website?: string;
  offer?: string;
  avg_price?: string;
  has_price_table?: boolean;
  volume?: string;
  // Block 2 - Público & Operações
  objections?: string;
  flow?: string;
  hours?: string;
  payment_methods?: string[];
  system?: string;
  key_message?: string;
  // Block 3 - IA & Expectativas
  ai_capabilities?: string[];
  ai_restrictions?: string;
  tone?: string;
  main_function?: string;
  manual_tasks?: string;
  // Funil personalizado
  funnel_columns?: any;
}

export async function createUserResponse(data: UserResponse) {
  const { data: response, error } = await supabase
    .from('user_responses')
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error('Error creating user response:', error);
    throw error;
  }

  return response;
}

export async function updateUserResponse(id: string, data: Partial<UserResponse>) {
  const { data: response, error } = await supabase
    .from('user_responses')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating user response:', error);
    throw error;
  }

  return response;
}

export async function getUserResponseBySessionId(sessionId: string) {
  const { data, error } = await supabase
    .from('user_responses')
    .select('*')
    .eq('session_id', sessionId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 = not found
    console.error('Error getting user response:', error);
    throw error;
  }

  return data;
}

export async function getAllUserResponses() {
  const { data, error } = await supabase
    .from('user_responses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error getting all user responses:', error);
    throw error;
  }

  return data;
}
