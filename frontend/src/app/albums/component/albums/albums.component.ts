import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ViewAlbum } from '../../model/view-album.model';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faTrash, faEdit, faPlusCircle, faPlay, faAudioDescription,
         faThLarge, faTh, faGripLines, faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';

interface addLibrariesData {
    page: number,
    selectedSort: string
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hel-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() person: boolean;
  @Input() shared: boolean;
  @Input() libraries: ViewAlbum[];
  @Input() totalPages: number;
  @Input() selectedSort: string;
  @Output() editLibrary = new EventEmitter<number>();
  @Output() removeLibrary = new EventEmitter<number>();
  @Output() setShowEditPanel = new EventEmitter<boolean>();
  @Output() setSuccesMessage = new EventEmitter<string>();
  @Output() addLibraries = new EventEmitter<addLibrariesData>();
  @Output() sortLibraries = new EventEmitter<string>();
  @Output() filterLibraries = new EventEmitter<string>();
  @Output() navigateToAlbum = new EventEmitter<number>();
  @Output() goAddAlbum = new EventEmitter<null>();

  showEditPopup = false;
  showDeletePopup = false;
  albumToDelete: ViewAlbum;

  sorting = [];
  currentPage = 0;

  librariesGroup: FormGroup;

  faTrash = faTrash;
  faEdit = faEdit;
  faPlusCircle = faPlusCircle;
  faPlay = faPlay;
  faAudioDescription = faAudioDescription;
  faThLarge = faThLarge;
  faTh = faTh;
  faGripLines = faGripLines;
  faChevronDown = faChevronDown;
  faPlus = faPlus;

  displayMode = 'large-grid';
  showDisplayMenu = false

  constructor(private translate: TranslateService,
              private fb: FormBuilder,
              public dialog: MatDialog,
              private toastr: ToastrService) { }

  ngOnInit() {

    forkJoin(
      // this.translate.get('updateDate'),
      this.translate.get('creationDate'),
      this.translate.get('title'),
      // this.translate.get('size')
    )
    .subscribe(res => {
      // this.sorting.push({ key: 'updateDate', value: res[0] });
      this.sorting.push({ key: 'creationDate', value: res[0] });
      this.sorting.push({ key: 'title', value: res[1] });
      // this.sorting.push({ key: 'size', value: res[2] });
    });
    this.librariesGroup = this.buildSearchForm();
    this.librariesGroup.get('searchLibrary').valueChanges.subscribe(
      (searchTerm: string) => {
          this.currentPage = 0;
          this.filterLibraries.emit(searchTerm);
          this.currentPage = 0;
      }
    );

    window.addEventListener("scroll", this.loadLibraries.bind(this));
   }

  ngOnDestroy() {
    this.setShowEditPanel.emit(false);
    window.removeEventListener("scroll", this.loadLibraries.bind(this));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.succesMessage && changes.succesMessage.currentValue) {
      this.translate.get(changes.succesMessage.currentValue).subscribe(
        (message: string) => {
          this.toastr.success(message);
          this.setSuccesMessage.emit(null);
        }
      );
    }
    if (changes.libraries && this.selectedSort === 'title') {
      this.sortLibraries.emit(this.selectedSort);
    }
  }

  buildSearchForm() {
    return this.fb.group({
      searchLibrary: ['']
    });
  }

  addAlbum() {
    this.goAddAlbum.emit()
  }

  /**
   * Triggered when a user click on a library widget
   * @param libraryId the id of the library we want to navigate to
   */
  goAlbum(albumId: number) {
    
    this.navigateToAlbum.emit(albumId);
  }

  /**
   * Triggered when the user click on the edit library img
   * @param library the library the user want to edit
   */
  setEditLibrary(idLibrary: number) {
    this.showEditPopup = true;
    this.editLibrary.emit(idLibrary);
  }

  deleteLibrary(library: ViewAlbum) {
    // this.removeLibrary.emit(idLibrary);
    this.albumToDelete = library;
    this.showDeletePopup = true;
  }

  editSelectedSort() {
    this.sortLibraries.emit(this.selectedSort);
  }

  loadLibraries() {
    
    const libraryGrid = document.querySelector('.library-grid-container')
    if(libraryGrid){

      const pos = window.pageYOffset || document.body.scrollTop;
      const max = document.body.scrollHeight - document.getElementsByClassName('header')[0].scrollHeight;
      
      if (pos >= max - 20) {
        if (this.currentPage < this.totalPages-1) {
          this.addLibraries.emit({page: ++this.currentPage, selectedSort: this.selectedSort});
        }
      }
    }
    
  }

  calculCols() {
    if(screen.width > 600){

      if (this.displayMode === 'large-grid') return 3
      if (this.displayMode === 'grid') return 6
    } else {
      return 2;
    }
  }
}
