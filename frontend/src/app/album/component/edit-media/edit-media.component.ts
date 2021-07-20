import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { UpdateMedia } from '../../../media/model/update-media.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hel-edit-media',
  templateUrl: './edit-media.component.html',
  styleUrls: ['./edit-media.component.scss']
})
export class EditMediaComponent implements OnInit, OnChanges {

  @Input() media: UpdateMedia;
  editMediaForm: FormGroup;
  @Output() editMedia = new EventEmitter<UpdateMedia>();
  @Output() hideEditPopup = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.media.firstChange) {
      this.editMediaForm = this.buildEditMediaForm();
    }
    this.updateForm();
  }

  /**
   * Build the ediImageForm
   */
  buildEditMediaForm() {
    return this.fb.group({
      name: ['', Validators.required],
    });
  }

  /**
   * Triggered when the user submit the editImageForm
   * Emit a event to edit the image
   */
  updateMedia() {
    if (this.editMediaForm.valid) {
      this.setMedia();
      this.editMedia.emit(this.media);
    }
  }

  /**
   * Update the media with the form values
   */
  setMedia() {
    this.media.name = this.editMediaForm.get('name').value;
  }

  /**
   * Update the form with the values of image
   */
  updateForm() {
    this.editMediaForm.get('name').setValue(this.media.name);
  }

  removePopup() {
    this.hideEditPopup.emit(false);
  }
}
