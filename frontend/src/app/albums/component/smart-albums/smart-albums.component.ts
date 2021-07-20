import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromLibrary from '../../state';
import * as libraryActions from '../../state/albums.actions';
import * as sharedActions from '../../../shared/state/shared.actions';
import { Observable, of } from 'rxjs';
import { ViewAlbum } from '../../model/view-album.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from 'src/app/core/service/navbar.service';
import { AuthenticateService } from 'src/app/core/service/authenticate.service';
import { LibraryService } from '../../service/library.service';
import { map, tap } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hel-smart-libraries',
  template: `
  <hel-albums   [libraries]="libraries$ | async"
                [totalPages]="totalPages$ | async"
                [selectedSort]="selectedSort$ | async"
                [person]="person"
                [shared]="shared"
                (editLibrary)="editLibrary($event)"
                (sortLibraries)="sortLibraries($event)"
                (addLibraries)="addLibraries($event)"
                (filterLibraries)="filterLibraries($event)"
                (navigateToAlbum)="navigateToAlbum($event)"
                (goAddAlbum)="goAddAlbum()">
  </hel-albums>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartAlbumsComponent implements OnInit {

  libraries$: Observable<ViewAlbum[]>;
  totalPages$: Observable<number>;
  selectedSort$: Observable<string>;

  shared: boolean;
  person: boolean;
  drive: boolean;

  constructor(private store: Store<fromLibrary.State>,
              private route: ActivatedRoute,
              private navbarService: NavbarService,
              private authService: AuthenticateService,
              private router: Router,
              private libraryService: LibraryService,) { }

  ngOnInit() {

    this.route.parent.url.subscribe(url => {
      
      if(url.join('/').indexOf('drive') !== -1) {

        this.shared = false;
        this.person = false;
        this.drive = true;
        this.store.dispatch(new libraryActions.LoadShortLibraries('updateDate'));
        this.libraries$ = this.store.pipe(select(fromLibrary.getShortLibrariesFeatureState));
        this.selectedSort$ = this.store.pipe(select(fromLibrary.getSelectedSortFeatureState));

      } else {
        
        this.route.url.subscribe(url => {

          console.log(url)
          if(url.join('/').indexOf('shared') !== -1) {
    
            this.shared = true;
            this.store.dispatch(new libraryActions.LoadSharedShortLibraries('updateDate'));
            this.libraries$ = this.store.pipe(select(fromLibrary.getSharedShortLibrariesFeatureState));
            this.selectedSort$ = this.store.pipe(select(fromLibrary.getSharedSelectedSortFeatureState));
          } else if (url.join('/').indexOf('drive') !== -1) {
            console.log('drive')
          }
          else {
            
            this.route.parent.parent.url.subscribe(url => {
              
              this.shared = false;
              if(url.join('/').indexOf('me') !== -1) {
    
                this.person = false;
                this.store.dispatch(new libraryActions.LoadShortLibraries('updateDate'));
                this.libraries$ = this.store.pipe(select(fromLibrary.getShortLibrariesFeatureState));
                this.selectedSort$ = this.store.pipe(select(fromLibrary.getSelectedSortFeatureState));
              } else {
    
                this.person = true;
                this.route.parent.parent.paramMap.subscribe(params => {
    
                  this.libraries$ = this.libraryService.loadUserLibrary('updateDate', params['params']['idUser']).pipe(
                    tap(res => this.totalPages$ = of(res.totalPages)),
                    map(
                      res => res.content
                    )
                  )})
              }
            })
            
            
          }
        });
      }
    })
    

    this.totalPages$ = this.store.pipe(select(fromLibrary.getTotalPagesFeatureState));
    this.navbarService.nextSmallNavbar(true);
    this.store.dispatch(new sharedActions.LoadUser(this.authService.getUserId()));
  }

  editLibrary(idLibrary: number) {
    this.store.dispatch(new libraryActions.LoadCurrentEditLibrary(idLibrary));
  }

  addLibraries(event: any) {
    this.store.dispatch(new libraryActions.AddLibraries(event.page, event.selectedSort));
  }

  sortLibraries(selectedSort: string) {
    if (this.shared) {
      this.store.dispatch(new libraryActions.SortSharedShortLibraries(selectedSort));
    } else {
      this.store.dispatch(new libraryActions.SortShortLibraries(selectedSort));
    }
  }

  filterLibraries(filter: string) {
    if (this.shared) {
      this.store.dispatch(new libraryActions.FilterSharedShortLibraries(filter));
    } else {
      this.store.dispatch(new libraryActions.FilterShortLibraries(filter));
    }
  }

  navigateToAlbum(idAlbum: number) {

    console.log('navigateToAlbum')
    console.log(this.drive)
    if(this.drive) {
      console.log('in drive')
      this.router.navigateByUrl(`/drive/album/${idAlbum}`);
    }
    console.log('wrong')

    if(this.person) {

      this.route.parent.parent.params.subscribe(params => {
        this.router.navigateByUrl(`/profile/${params.idUser}/album/${idAlbum}`);
        // this.store.dispatch(new libraryActions.LoadLibrary(idAlbum));
      })
    } else {

      if(this.shared) {
        this.router.navigateByUrl('/profile/me/shared-album/' + idAlbum);
      } else {
        console.log('navigateToAlbum')
        this.router.navigateByUrl('/profile/me/album/' + idAlbum);
      }
    }
    
    // this.store.dispatch(new libraryActions.LoadLibrary(idAlbum));
  }

  goAddAlbum() {

    if(this.drive) this.router.navigateByUrl('/drive/albums/new');
    if(!this.drive) this.router.navigateByUrl('/profile/me/albums/new');
  }
}
