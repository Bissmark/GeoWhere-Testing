import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xflvpglfnnfxqadbxwqh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmbHZwZ2xmbm5meHFhZGJ4d3FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM3ODE4MTMsImV4cCI6MTk5OTM1NzgxM30.rMzqE-Kff8FY0gI1fJZGxfQPZItpzWQnBQ-n_t4msio';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;