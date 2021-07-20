// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { select, Store } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import { SavedLibrary } from '../../model/saved-library.model';
// import * as fromLibrary from '../../state';
// import * as libraryActions from '../../state/albums.actions';
// import * as sharedActions from '../../../shared/state/shared.actions';
// import { CurrentAudio } from 'src/app/shared/model/current-audio.model';
// import { AudioContext } from 'src/app/shared/model/audio-context.model';
// import { AccountUser } from 'src/app/shared/model/account-user.model';
// import * as fromShared from '../../../shared/state/';
// import { LibraryService } from '../../service/library.service';

// @Component({
//   selector: 'app-smart-person-library',
//   template: `<lb-library [library]="library$ | async"
//                          [isPerson]="isPerson"
//                          (sortLibrary)="sortLibrary($event)"
//                          (filterLibrary)="filterLibrary($event)"
//                          (setAudioContext)="setAudioContext($event)"
//                          (setCurrentAudio)="setCurrentAudio($event)"
//                          (downloadLibrary)="downloadLibrary($event)">
// </lb-library>
//   `
// })
// export class SmartPersonLibraryComponent implements OnInit, OnDestroy {

//   library$: Observable<SavedLibrary>;
//   person$: Observable<AccountUser>;

//   isPerson = true;

//   constructor(private store: Store<fromLibrary.State>,
//               private route: ActivatedRoute,
//               private libraryService: LibraryService) { }

//   ngOnInit() {

//     this.route.params.subscribe(params => {
//       this.store.dispatch(new libraryActions.LoadLibrary(params.idLibrary));
//     })

//     this.library$ = this.store.pipe(select(fromLibrary.getLibraryFeatureState));
//     this.person$ = this.store.pipe(select(fromShared.getPersonFeatureState));
//   }

//   ngOnDestroy(): void {
//     this.store.dispatch(new libraryActions.SetLibrary(null));
//   }

//   sortLibrary(selectedSort: string) {
//     // this.store.dispatch(new mediaActions.SetSelectedSort(selectedSort));
//     this.store.dispatch(new libraryActions.SortMedias(selectedSort));
//   }

//   filterLibrary(filter: string) {
//     this.store.dispatch(new libraryActions.FilterMedias(filter));
//   }

//   setAudioContext(audioContext: AudioContext) {
//     this.store.dispatch(new sharedActions.SetAudioContext(audioContext));
//   }

//   setCurrentAudio(currentAudio: CurrentAudio) {
//     this.store.dispatch(new sharedActions.SetCurrentAudio(currentAudio));
//   }

//   downloadLibrary(library: SavedLibrary) {

//     console.log('downloadLibrary person')
//     const subscribe = this.person$.subscribe((person: AccountUser) => {
      
//       console.log(person)
//       this.libraryService.downloadLibrary(library.title, person.id).subscribe((downloadedFile) => {
//         const blob = new Blob([downloadedFile], { type: 'application/zip' });
//         const url= window.URL.createObjectURL(blob);
//         const anchor = document.createElement("a");
//         anchor.download = library.title + ".zip";
//         anchor.href = url;
//         anchor.click();
//       });
//     });
//     subscribe.unsubscribe();
//   }
// }
