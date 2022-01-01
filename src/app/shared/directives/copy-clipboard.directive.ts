import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appCopyClipboard]',
})
export class CopyClipboardDirective {
  constructor() {}

  @HostListener('click', ['$event'])
  copyToClipboard() {}
}
