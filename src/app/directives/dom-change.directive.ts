import { Directive, ElementRef, OnDestroy, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[domChange]'
})
export class DomChangeDirective implements OnDestroy {
  private changes: MutationObserver
  @Output()
  public domChange = new Subject<void>();

  constructor(private elementRef: ElementRef) {
    const element = this.elementRef.nativeElement;
    this.changes = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach(() => {
        this.domChange.next()
      })
    })
    this.changes.observe(element, {
      attributes: true,
      childList: true,
      characterData: true
    })
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
