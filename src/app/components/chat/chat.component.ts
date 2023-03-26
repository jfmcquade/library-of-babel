import { Component, OnInit } from '@angular/core';
import { ChatCompletionRequestMessage, ChatCompletionResponseMessage } from 'openai';
import { ChatService } from 'src/app/services/chat/chat.service';
import { systemPrompt } from 'src/app/config';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  message: string | undefined
  messages: (ChatCompletionRequestMessage | ChatCompletionResponseMessage)[]
  loading: boolean = false

  constructor(private chatService: ChatService) {
    this.messages = [
      { role: "system", content: systemPrompt }
    ]
  }

  ngOnInit(): void {
  }

  async submit(message: string | undefined) {
    if (!message) return
    this.messages = [
      ...this.messages,
      { role: "user", content: message }
    ]
    this.message = ""
    await this.getResponse(this.messages)
  }

  async getResponse(messages: ChatCompletionRequestMessage[]) {
    try {
      this.loading = true
      const { data: { message: chatGPTMessage }, error } = await this.chatService.getChatCompletion(messages)
  
      if (error) {
        throw error
      }
  
      if (chatGPTMessage) {
        this.messages = [
          ...this.messages,
          chatGPTMessage
        ]
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loading = false
    }
  }
}
