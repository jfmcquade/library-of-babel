import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatCompletionRequestMessage, ChatCompletionResponseMessage } from 'openai';
import { SYSTEM_PROMPT } from 'src/app/config';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  message: string | undefined
  messages: (ChatCompletionRequestMessage | ChatCompletionResponseMessage)[]
  loading: boolean = false

  constructor(private chatService: ChatService) {
    this.messages = [
      { role: "system", content: SYSTEM_PROMPT }
    ]
  }

  ngOnInit(): void { }

  async submit(message: string | undefined) {
    if (!message) return
    this.messages = [
      ...this.messages,
      { role: "user", content: message }
    ]
    this.message = ""
    this.getResponse(this.messages)
  }

  getResponse(messages: ChatCompletionRequestMessage[], model?: string) {
    this.loading = true
    setTimeout(() => {
      const message = this.chatService.getChatCompletion(messages)
      this.messages = [
        ...this.messages,
        message
      ];
      this.loading = false
    }, 3000)

  }

  onDomChange() {
    console.log("hi")
    setTimeout(() => this.scrollToBottom(), 100)
  }

  scrollToBottom() {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) { console.error(err) }
  }
}
