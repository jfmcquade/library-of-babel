import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ChatCompletionRequestMessage } from 'openai';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabase.url, environment.supabase.apiKey)
  }

  async getChatCompletion(messages: ChatCompletionRequestMessage[]) {
    const { data, error } = await this.supabase.functions.invoke("get-chat-completion", {
      body: { messages }
    })
    return { data, error }
  }
}
