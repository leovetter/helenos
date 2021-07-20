// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Store } from '@ngrx/store';
// import { Observable, of } from 'rxjs';
// import { map, tap } from 'rxjs/operators';
// import { SavedLibrary } from '../../model/saved-library.model';
// import { ShortLibrary } from '../../model/short-library.model';
// import { LibraryService } from '../../service/library.service';
// import * as fromLibrary from '../../state';
// import * as libraryActions from '../../state/albums.actions';

// @Component({
//   selector: 'app-smart-person-librairies',
//   template: `
//   <lb-libraries [libraries]="librarie$ | async"
//                 [person]="true"
//                 [selectedSort]="'creationDate'"
//                 (navigateToAlbum)="navigateToAlbum($event)"
//                 (sortLibraries)="sortLibraries($event)"
//                 (filterLibraries)="filterLibraries($event)">
//   </lb-libraries>
//   `
// })
// export class SmartPersonLibrariesComponent implements OnInit {

//   librarie$: Observable<ShortLibrary[]>
//   totalPages$: Observable<number>
  
//   constructor(private libraryService: LibraryService,
//               private route: ActivatedRoute,
//               private router: Router,
//               private store: Store<fromLibrary.State>) { }

//   ngOnInit() {

    
//   }

//   sortLibraries(selectedSort: string) {

//     let sortedShortLibraries: ShortLibrary[];
//     this.librarie$.subscribe(libraries => {
//       switch (selectedSort) {
//         case 'updateDate':
//           sortedShortLibraries = libraries.sort(
//             (a, b) => new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime()
//             );
//           break;
//         case 'creationDate':
//           sortedShortLibraries = libraries.sort(
//             (a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
//             );
//           break;
//         case 'title':
//           sortedShortLibraries = libraries.sort(
//             (a, b) => a.title.localeCompare(b.title)
//             );
//           break;
//         case 'size':
//           sortedShortLibraries = libraries.sort(
//             (a, b) => a.size - b.size
//             );
//           break;
//       }
//     });

//     return sortedShortLibraries;
//   }

//   filterLibraries(filter: string) {
//       let filteredShortLibraries: ShortLibrary[];
//       this.librarie$.subscribe(libraries => {
//         filteredShortLibraries = libraries.filter(shLb => shLb.title.indexOf(filter) !== -1);
//       });
//       return filteredShortLibraries;
//   }
// }
