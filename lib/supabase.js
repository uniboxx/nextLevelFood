import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.PROJECT_URL;
const supabaseKey = process.env.SERVICE_ROLE;
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
