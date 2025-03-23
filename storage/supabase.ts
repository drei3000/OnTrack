import { createClient } from '@supabase/supabase-js';

//Supabase Credentials
const SUPABASE_URL = "https://fffxxiuqbfoitlnlqyxk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmZnh4aXVxYmZvaXRsbmxxeXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1OTU2NTIsImV4cCI6MjA1ODE3MTY1Mn0.Ak-pzqJ9NweyWdF7np4s-8BT7cKebyNRlQyyV-M5wIA" //insert our key


export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);