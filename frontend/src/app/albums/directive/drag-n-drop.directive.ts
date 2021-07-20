import { Directive, EventEmitter, Output, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appMediaDragNDrop]'
})
export class DragNDropDirective {

  @Output() onFileDropped = new EventEmitter<any>();

  @HostBinding('style.border-style') public borderStyle = 'dashed';

  constructor() { }

  @HostListener('mouseover', ['$event']) onMouseOver(evt) {
    this.borderStyle = 'solid';
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave(evt) {
    this.borderStyle = 'dashed';
  }

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.borderStyle = 'solid';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.borderStyle = 'dashed';
  }

  //Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.borderStyle = 'dashed';
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files)
    }
  }

}
