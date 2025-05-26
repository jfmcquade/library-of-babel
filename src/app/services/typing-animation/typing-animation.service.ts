import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypingAnimationService {
  private typingSpeed = 1; // milliseconds per character
  private charactersPerBatch = 6; // number of characters to type per frame
  private lastUpdateTime = 0;

  animateText(text: string): Observable<string> {
    const subject = new BehaviorSubject<string>('');
    let currentText = '';
    let currentIndex = 0;

    const animate = (timestamp: number) => {
      if (!this.lastUpdateTime) this.lastUpdateTime = timestamp;
      
      const elapsed = timestamp - this.lastUpdateTime;
      
      if (elapsed >= this.typingSpeed && currentIndex < text.length) {
        // Add multiple characters in this frame
        const remainingChars = text.length - currentIndex;
        const charsToAdd = Math.min(this.charactersPerBatch, remainingChars);
        currentText += text.slice(currentIndex, currentIndex + charsToAdd);
        subject.next(currentText);
        currentIndex += charsToAdd;
        this.lastUpdateTime = timestamp;
      }

      if (currentIndex < text.length) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
    return subject.asObservable();
  }
} 