// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ofwtizijkvaoimincluu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9md3Rpemlqa3Zhb2ltaW5jbHV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MTQwMzUsImV4cCI6MjA2NDk5MDAzNX0.qtPUVfpqqZMMPiVWxGPYrE7Jkscr4T4r9bgRMufuscA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);