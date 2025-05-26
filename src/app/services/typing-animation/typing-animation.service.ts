import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypingAnimationService {
  private typingSpeed = 1; // milliseconds per character

  animateText(text: string): Observable<string> {
    const subject = new BehaviorSubject<string>('');
    let currentText = '';
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        currentText += text[currentIndex];
        subject.next(currentText);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, this.typingSpeed);

    return subject.asObservable();
  }
} 