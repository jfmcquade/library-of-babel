import { Component, OnInit, Input } from '@angular/core';
import { ChatCompletionRequestMessage, ChatCompletionResponseMessage } from 'openai';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() message!: ChatCompletionRequestMessage | ChatCompletionResponseMessage
  messageType: "user" | "assistant" | "system" | undefined

  constructor() { }

  ngOnInit(): void {
    this.messageType = this.message.role
  }

}
