import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type PaymentTransaction = {
  id: string;
  payer_name: string;
  payer_email?: string;
  payer_phone?: string;
  transaction_id: string;
  amount: number;
  upi_id: string;
  payment_time: string;
  created_at: string;
};
