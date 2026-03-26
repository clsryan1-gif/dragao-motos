import { createClient } from '@supabase/supabase-js';

// Fallbacks de segurança para contornar erros de prerender do Next.js no comando `npm run build`
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://build-placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'build-placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
