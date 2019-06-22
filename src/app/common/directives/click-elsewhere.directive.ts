import { Directive, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[ngrClickElsewhere]'
})
export class ClickElsewhereDirective {
  @Output() ngrClickElsewhere = new EventEmitter<MouseEvent>();

  constructor(private elementRef: ElementRef) { }
  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    // check if click was outside the element
    // console.log('target', targetElement, '--');
    // console.log('elementRef', this.elementRef.nativeElement, '--', this.elementRef.nativeElement.contains(targetElement));
    if (targetElement && !this.elementRef.nativeElement.contains(targetElement)) {
      this.ngrClickElsewhere.emit(event);
   }
  }

}
