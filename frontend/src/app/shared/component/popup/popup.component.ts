import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sh-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  
  @Output() hidePopup = new EventEmitter<null>();
  
  constructor() { }

  ngOnInit() {
  }

  closePopup() {
    this.hidePopup.emit();
  }

}
