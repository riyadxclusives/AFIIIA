import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://yyibtwtktozkrxeinjxy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5aWJ0d3RrdG96a3J4ZWluanh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5ODM0NzQsImV4cCI6MjA1MDU1OTQ3NH0.TRNvehxrHPnPSKjq7bDESB2K2R3R12gzpMOIHqsI-K8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
