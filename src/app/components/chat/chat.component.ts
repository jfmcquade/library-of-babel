import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatCompletionRequestMessage, ChatCompletionResponseMessage } from 'openai';
import { SYSTEM_PROMPT, AVAILABLE_MODELS, IModel } from 'src/app/config';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  message: string | undefined
  messages: (ChatCompletionRequestMessage | ChatCompletionResponseMessage)[]
  loading: boolean = false
  availableModels = AVAILABLE_MODELS
  selectedModel = this.availableModels[0]

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
    await this.getResponse(this.messages, this.selectedModel.name)
  }

  async getResponse(messages: ChatCompletionRequestMessage[], model?: string) {
    try {
      this.loading = true
      const { data: { message: chatGPTMessage }, error } = await this.chatService.getChatCompletion(messages, model)
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

  ngAfterViewChecked(): void {
    this.scrollToBottom()
  }

  scrollToBottom() {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) { console.error(err) }
  }
}
