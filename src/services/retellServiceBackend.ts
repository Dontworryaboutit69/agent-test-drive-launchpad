import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface WebCallResponse {
  call_id: string;
  access_token: string;
}

export class RetellServiceBackend {
  async startCall(agentId: string): Promise<WebCallResponse> {
    const { data, error } = await supabase.functions.invoke('retell-call', {
      body: { 
        action: 'start-call',
        agentId 
      }
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(`Failed to start call: ${error.message}`);
    }

    if (!data || !data.call_id || !data.access_token) {
      console.error('Invalid response from backend:', data);
      throw new Error('Invalid response from backend');
    }

    return data;
  }

  async endCall(callId: string): Promise<void> {
    const { error } = await supabase.functions.invoke('retell-call', {
      body: { 
        action: 'end-call',
        callId 
      }
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(`Failed to end call: ${error.message}`);
    }
  }
}

export const retellServiceBackend = new RetellServiceBackend();