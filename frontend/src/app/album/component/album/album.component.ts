import { Component, OnInit, Input, Inject, Output, EventEmitter, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { Album } from '../../../albums/model/album.model';
import { UpdateMedia } from 'src/app/media/model/update-media.model';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Media } from 'src/app/media/model/media.model';
import { faTrash, faEdit, faCloudDownloadAlt, faPlusCircle, faPlay, faChevronCircleDown, 
         faAudioDescription, faTimes, faChevronRight, faChevronLeft, faUserPlus,
        faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { AudioContext } from 'src/app/shared/model/audio-context.model';
import { select, Store } from '@ngrx/store';
import * as fromLibrary from '../../../albums/state';
import { AlgosService } from 'src/app/shared/service/algos.service';
import { SharedUser } from 'src/app/user/model/shared-user.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hel-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit, OnChanges {

  @Input() library: Album;
  @Input() sharedUsers: SharedUser[];
  @Input() isPerson: boolean;
  @Input() shared: boolean;

  @Output() editMedia = new EventEmitter<UpdateMedia>();
  @Output() sortLibrary = new EventEmitter<string>();
  @Output() filterLibrary = new EventEmitter<string>();
  @Output() removeMedia = new EventEmitter<number>();
  @Output() setAudioContext = new EventEmitter<AudioContext>();
  @Output() downloadLibrary = new EventEmitter<Album>();
  @Output() reOrderAlbum = new EventEmitter<number[]>();
  @Output() reloadAlbum = new EventEmitter<null>();
  
  selectedSort = 'custom';
  idSelectedMedia: number = null;
  mediaImageEditor: Media;
  sorting = [];
  libraryGroup: FormGroup;

  showEditPopup = false;
  showDeletePopup = false;
  showPopupSharedUsers = false;
  showAddMediaPopup = false;
  showImageEditor = false;
  mediaToDelete: Media;

  faTrash = faTrash;
  faEdit = faEdit;
  faCloudDownloadAlt = faCloudDownloadAlt;
  faPlusCircle = faPlusCircle;
  faPlay = faPlay;
  faChevronCircleDown = faChevronCircleDown;
  faAudioDescription = faAudioDescription;
  faTimes = faTimes;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faUserPlus = faUserPlus;
  faThumbsUp = faThumbsUp;
  faComment = faComment;

  constructor(private translate: TranslateService,
              private fb: FormBuilder,
              private algosService: AlgosService,
              public dialog: MatDialog,
              private store: Store<fromLibrary.State>) {
  }

  ngOnInit() {
    document.body.scrollTop = 0;
    forkJoin(
      this.translate.get('creationDate'),
      this.translate.get('name'),
      this.translate.get('size'),
      this.translate.get('custom')
    )
    .subscribe(res => {
      this.sorting.push({ key: 'custom', value: res[3] });
      this.sorting.push({ key: 'creationDate', value: res[0] });
      this.sorting.push({ key: 'name', value: res[1] });
      this.sorting.push({ key: 'size', value: res[2] });
    });
    this.libraryGroup = this.buildSearchForm();
    this.libraryGroup.get('searchMedia').valueChanges.subscribe(
      (searchTerm: string) => {
        this.filterLibrary.emit(searchTerm);
      }
    );
    this.store.pipe(select(fromLibrary.getLibraryFeatureState)).subscribe((library: Album)=> {
      this.library = library;
    });
   }

  ngOnChanges(changes: SimpleChanges) {
    
    if(changes.library && this.selectedSort === 'name') 
      this.sortLibrary.emit(this.selectedSort);
  }

  buildSearchForm() {
    return this.fb.group({
      searchMedia: ['']
    });
  }

  

  /**
   * Triggered when the user click on the edit image img
   * @param image the image the user want to edit
   */
  setEditMedia(media: Media) {
    const updateMedia: UpdateMedia = {
      id: media.id,
      name: media.name
    }
    this.editMedia.emit(updateMedia);
    this.showEditPopup = true;
  }

  // showEditPopup(media: Media) {

  //   const dialogRef = this.dialog.open(PopupEditMediaComponent, {
  //     width: '250px',
  //     data: { media: media }
  //   });
  // }

  deleteMedia(media: Media) {
    // this.removeMedia.emit(idMedia);
    this.mediaToDelete = media;
    this.showDeletePopup = true;
  }

  editUrl(event: any) {
    this.library.medias.forEach((media: Media) => {
      media.id === event.id ? media.isIntersecting = true : null;
    })
  }

  editSelectedSort() {
    this.sortLibrary.emit(this.selectedSort);
    // this.store.dispatch(new libraryActions.SortMedias(this.selectedSort));
  }

  downloadAlbum() {
    this.downloadLibrary.emit(this.library);    
  }

  canLoadForLargeScreen() {
    return screen.width > 1000 ? true : false;
  }


  canLoadForMediumScreen() {
    return screen.width < 1000 ? screen.width > 1000 ? true: false : false;
  }

  canLoadForSmallScreen() {
    return screen.width < 700 ? true : false;
  }

  calculCols() {
    return screen.width > 600 ? 3 : 2;
  }

  drag(fileIndex, event) {
    event.dataTransfer.setData("fileIndex", fileIndex);
  }

  allowDrop(event) {
    
    const elOnBeDropped = this.findParentElement(event.target);
    elOnBeDropped.classList.add('ready-to-drop');

    event.preventDefault();
  }

  onDragLeave(event) {

    const elNotDropped = this.findParentElement(event.target);
    elNotDropped.classList.remove('ready-to-drop');
  }

  drop(event) {

    event.preventDefault();
    console.log(event.dataTransfer.getData("fileIndex"))
    const fileIndex = event.dataTransfer.getData("fileIndex");
    const droppedIndex = this.findDroppedIndex(event.target);
    console.log(droppedIndex)
    this.reOrderAlbum.emit([fileIndex, droppedIndex]);
    // const tempFile = this.library.medias[droppedIndex];
    // this.library.medias.splice(droppedIndex, 1, this.library.medias[fileIndex]);
    // this.library.medias.splice(fileIndex, 1, tempFile);
  }

  findDroppedIndex(htmlElement: HTMLElement) {

    if(htmlElement.id.indexOf('file') !== -1) {
      return Number(htmlElement.id.substr(5,htmlElement.id.length-5));
    } else {
      return this.findDroppedIndex(htmlElement.parentElement);
    }
  }

  findParentElement(htmlElement: HTMLElement) {

    if(htmlElement.id.indexOf('file') !== -1) {
      return htmlElement;
    } else {
      return this.findParentElement(htmlElement.parentElement);
    }
  }

  goImageEditor() {

    this.mediaImageEditor = this.library.medias.filter(media => media.id === this.idSelectedMedia)[0];
    console.log(this.mediaImageEditor)
    this.showImageEditor = true;
    this.idSelectedMedia = null
  }

  resetShowImageEditor() {
    this.reloadAlbum.emit();
    this.showImageEditor = false;
    this.idSelectedMedia = this.mediaImageEditor.id;
  } 

  goMediaComments() {
    this.idSelectedMedia = this.mediaImageEditor.id;
    this.showImageEditor = false;
  }
}
