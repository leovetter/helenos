import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, OnChanges, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EditAlbum } from '../../model/edit-album.model';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { MediaService } from 'src/app/core/service/media.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hel-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.scss']
})
export class EditAlbumComponent implements OnInit, OnChanges {

  @Input() library: EditAlbum;
  @Input() shared: boolean;
  @Output() editLibrary = new EventEmitter<EditAlbum>();
  @Output() editSharedLibrary = new EventEmitter<EditAlbum>();
  @Output() setShowEditPanel = new EventEmitter<boolean>();

  editLibraryForm: FormGroup;
  coverFile: any;

  faCamera = faCamera;

  constructor(private fb: FormBuilder,
              private mediaService: MediaService) { }

  ngOnInit() {
    if(!this.editLibraryForm){
      this.editLibraryForm = this.buildEditLibraryForm();
    }
   }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.library.currentValue) {
      if(!this.editLibraryForm) {
        this.editLibraryForm = this.buildEditLibraryForm();
      }
      this.updateForm();
    }
  }

  /**
   * Build the editLibraryForm
   */
  buildEditLibraryForm() {
    return this.fb.group({
      isPublic: '',
      title: ['', Validators.required],
      cover: '',
    });
  }

  /**
   * Triggered when the user submit the editLibraryForm
   * Emit a event to edit the library
   */
  updateLibrary() {
    console.log('update library')
    console.log(this.editLibraryForm.valid)
    if (this.editLibraryForm.valid) {
      this.setLibrary();
      // if(this.shared) {
      //   this.editSharedLibrary.emit(this.library);
      // } else {
      //   this.editLibrary.emit(this.library);
      // }
      if(this.coverFile) {
        const fdCover = new FormData();
        fdCover.append('cover', this.coverFile, this.coverFile.name);
        this.mediaService.uploadCover(fdCover, this.library.title).subscribe();
      }
      
      this.editLibrary.emit(this.library);
      this.coverFile = null;
    }
  }

  /**
   * Update the library with the form values
   */
  setLibrary() {
    this.library.oldTitle = this.library.title;
    this.library.title = this.editLibraryForm.get('title').value;
    this.library.publicAlbum = this.editLibraryForm.get('isPublic').value;
    if(this.coverFile) {
      this.library.cover = this.coverFile.name;
    }
  }

  /**
   * Update the form with the values of library
   */
  updateForm() {
    this.editLibraryForm.get('title').setValue(this.library.title);
    this.editLibraryForm.get('isPublic').setValue(this.library.publicAlbum);
    this.editLibraryForm.get('cover').setValue(this.library.cover);
  }

  hideEditPanel() {
    this.setShowEditPanel.emit(false);
  }

  onCoverChange(files) {

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    this.coverFile = files[0];
    reader.onload = e => {
      const imgCover = document.getElementById('img-cover') as HTMLImageElement;
      imgCover.src = `${reader.result}`;
      const fd = new FormData();
    }
  }

  editCover(event) {

    event.preventDefault();
    const coverInput = document.getElementById('cover-input');
    coverInput.click()
  }
}
