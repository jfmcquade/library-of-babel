import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ChatCompletionRequestMessage, ChatCompletionResponseMessage } from 'openai';
import { TypingAnimationService } from 'src/app/services/typing-animation/typing-animation.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
    standalone: false
})
export class MessageComponent implements OnInit, OnDestroy {
  @Input() message!: ChatCompletionRequestMessage | ChatCompletionResponseMessage;
  @Output() contentChange = new EventEmitter<void>();
  messageType: "user" | "assistant" | "system" | undefined;
  displayedContent: string = '';
  private subscription: Subscription | undefined;

  constructor(private typingAnimationService: TypingAnimationService) { }

  ngOnInit(): void {
    this.messageType = this.message.role;
    if (this.message.role === 'assistant' && this.message.content) {
      this.subscription = this.typingAnimationService.animateText(this.message.content)
        .subscribe(text => {
          this.displayedContent = text;
          this.contentChange.emit();
        });
    } else {
      this.displayedContent = this.message.content || '';
      this.contentChange.emit();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
