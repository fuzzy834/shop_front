import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appModal]'
})
export class ModalDirective {

  static div: HTMLDivElement;

  @Input() appModal: HTMLElement;

  constructor(private host: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('click') click() {
    if (!this.appModal.classList.contains('show')) {
      if (ModalDirective.div === undefined) {
        ModalDirective.div = this.renderer.createElement('div');
        this.renderer.addClass(ModalDirective.div, 'modal-backdrop');
        this.renderer.addClass(ModalDirective.div, 'fade');
        this.renderer.addClass(ModalDirective.div, 'show');
      }
      this.renderer.addClass(this.appModal, 'show');
      this.renderer.addClass(document.body, 'modal-open');
      this.renderer.setStyle(this.appModal, 'display', 'block');
      this.renderer.appendChild(document.body, ModalDirective.div);
    } else {
      this.renderer.removeClass(this.appModal, 'show');
      this.renderer.removeClass(document.body, 'modal-open');
      this.renderer.setStyle(this.appModal, 'display', 'none');
      this.renderer.removeChild(document.body, ModalDirective.div);
      ModalDirective.div = undefined;
    }
  }
}
