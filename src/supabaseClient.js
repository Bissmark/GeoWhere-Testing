import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ecowbnanuifizjfclmmu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjb3dibmFudWlmaXpqZmNsbW11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQzODgzNjIsImV4cCI6MTk5OTk2NDM2Mn0.UQjwHxkj3XWXxXl2XKtVP-3txMi-R6tMBdiKv-964a4';
export const supabase = createClient(supabaseUrl, supabaseKey);