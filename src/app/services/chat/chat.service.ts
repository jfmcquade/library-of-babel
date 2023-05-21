import { Injectable } from '@angular/core';
import { ChatCompletionRequestMessage } from 'openai';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  getChatCompletion(messages: ChatCompletionRequestMessage[]): ChatCompletionRequestMessage {
    return {role: "assistant", content: this.generateMessage()}
  }

  private generateMessage(length = 3200) {
    let message = ""
    const chars = "abcdefghijklmnopqrstuvwxyz., "
    for (let i = 0; i <= length; i++) {
      message += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return message
  }
}
