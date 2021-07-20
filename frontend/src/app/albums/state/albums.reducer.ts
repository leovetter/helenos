import { AlbumsActionTypes, AlbumsActions } from './albums.actions';
import { ViewAlbum } from '../model/view-album.model';
import { Album } from '../model/album.model';
import { SharedUser } from 'src/app/user/model/shared-user.model';
import { HttpErrorResponse } from '@angular/common/http';
// import { ShortShortLibrary } from '../model/short-short-library.model';
import { Media } from 'src/app/media/model/media.model';
import { AlgosService } from 'src/app/shared/service/algos.service';
import { UpdateMedia } from 'src/app/media/model/update-media.model';
import { EditAlbum } from '../model/edit-album.model';

const algoService = new AlgosService();

// Define the state for this feature
export interface AlbumsState {
  shortLibraries: ViewAlbum[];
  sharedShortLibraries: ViewAlbum[];
  allShortLibraries: ViewAlbum[];
  allSharedShortLibraries: ViewAlbum[];
  allMedias: Media[];
  library: Album;
  libraryIndex: number;
  suggestUsers: SharedUser[];
  sharedUsers: SharedUser[];
  errorMessage: HttpErrorResponse;
  fullScreenImageName: string;
  displayImage: boolean;
  progress: number;
  currentEditLibrary: EditAlbum;
  // currentSharedShortShortLibrary: ShortShortLibrary;
  showEditPanel: boolean;
  succesMessage: string;
  currentPage: number;
  totalPages: number;
  sharedTotalPages: number;
  urls: string[];
  selectedSort: string;
  sharedSelectedSort: string;
  currentMedia: UpdateMedia;
}

// initialize the state for this feature
const initialState: AlbumsState = {
  shortLibraries: [],
  sharedShortLibraries: [],
  allShortLibraries: [],
  allSharedShortLibraries: [],
  allMedias: [],
  library: null,
  libraryIndex: 1,
  suggestUsers: [],
  sharedUsers: [],
  errorMessage: null,
  fullScreenImageName: null,
  displayImage: false,
  progress: 0,
  currentEditLibrary: null,
  // currentSharedShortShortLibrary: null,
  showEditPanel: false,
  succesMessage: null,
  currentPage: 0,
  totalPages: null,
  sharedTotalPages: null,
  urls: [],
  selectedSort: 'creationDate',
  sharedSelectedSort: 'creationDate',
  currentMedia: null,
};

// Define the reducers
export function reducer(state = initialState, action: AlbumsActions): AlbumsState {

  switch (action.type) {
    case AlbumsActionTypes.LoadSuccesShortLibraries:
      return {
        ...state,
        shortLibraries: [...action.payload],
        // sharedShortLibraries: null,
        allShortLibraries: [...action.payload]
      };
    case AlbumsActionTypes.LoadFailShortLibraries:
      return {
        ...state,
        errorMessage: action.payload
      };
    case AlbumsActionTypes.LoadSuccesSharedShortLibraries:
      return {
        ...state,
        // shortLibraries: null,
        sharedShortLibraries: [...action.payload],
        allSharedShortLibraries: [...action.payload]
      };
    case AlbumsActionTypes.LoadFailSharedShortLibraries:
      return {
        ...state,
        errorMessage: action.payload
      };
    case AlbumsActionTypes.SaveSuccesLibrary:
      return {
        ...state,
        progress: 0
      };
    case AlbumsActionTypes.SaveFailLibrary:
      return {
        ...state,
        errorMessage: action.payload
      };
    case AlbumsActionTypes.LoadSuccesSuggestUsers:
      return {
        ...state,
        suggestUsers: action.payload
      };
    case AlbumsActionTypes.LoadFailSuggestUsers:
      return {
        ...state,
        errorMessage: action.payload
      };
    case AlbumsActionTypes.AddSharedUsers:
      // Concat our new shared user to our previously existing array of shared users
      const newSharedUsers = state.sharedUsers.concat(action.payload);
      return {
        ...state,
        sharedUsers: newSharedUsers
      };
    case AlbumsActionTypes.SaveSuccesSharedUsers:
      return {
        ...state,
        sharedUsers: [],
      };
    case AlbumsActionTypes.SaveFailSharedUsers:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case AlbumsActionTypes.LoadSuccesLibrary:
      return {
        ...state,
        library: action.payload,
        allMedias: action.payload.medias
      };
    case AlbumsActionTypes.LoadFailLibrary:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case AlbumsActionTypes.SetLibraryIndex:
      return {
        ...state,
        libraryIndex: action.payload,
      };
    case AlbumsActionTypes.SetFullScreenMediaName:
      return {
        ...state,
        fullScreenImageName: action.payload,
      };
    case AlbumsActionTypes.SetDisplayMedia:
      return {
        ...state,
        displayImage: action.payload,
      };
    case AlbumsActionTypes.SetProgressRate:
      return {
        ...state,
        progress: action.payload,
      };
    case AlbumsActionTypes.SetShowEditPanel:
      return {
        ...state,
        showEditPanel: action.payload,
      };
    case AlbumsActionTypes.UpdateSuccesEditLibrary:
      // Replace the existing shortLibrary with the updated
      // shortLibraries value
      const updatedShortLibraries = state.shortLibraries;
      const shortLibrary = updatedShortLibraries.find(shortLibraryEl => shortLibraryEl.id === action.payload.id)
      const ind = updatedShortLibraries.indexOf(shortLibrary);
      shortLibrary.title = action.payload.title;
      shortLibrary.cover = action.payload.cover;
      updatedShortLibraries.splice(ind, 1, shortLibrary);
      return {
        ...state,
        currentEditLibrary: null,
        shortLibraries: [...updatedShortLibraries],
        showEditPanel: false,
        succesMessage: 'updateLibraryOk'
      };
    case AlbumsActionTypes.UpdateFailEditLibrary:
      return {
        ...state,
        errorMessage: action.payload,
      };
    // case AlbumsActionTypes.UpdateSuccesSharedShortLibrary:
    //   // Replace the existing shortLibrary with the updated
    //   // shortLibraries value
    //   const updatedSharedShortLibraries = state.sharedShortLibraries;
    //   const sharedShortLibrary = updatedSharedShortLibraries.find(shortLibraryEl => shortLibraryEl.id === action.payload.id)
    //   const indSh = updatedSharedShortLibraries.indexOf(sharedShortLibrary);
    //   sharedShortLibrary.title = action.payload.title;
    //   updatedSharedShortLibraries.splice(indSh, 1, sharedShortLibrary);
    //   return {
    //     ...state,
    //     currentSharedShortShortLibrary: null,
    //     sharedShortLibraries: [...updatedSharedShortLibraries],
    //     showEditPanel: false,
    //     succesMessage: 'updateLibraryOk'
    //   };
    case AlbumsActionTypes.SetSuccesMessage:
      return {
        ...state,
        succesMessage: action.payload,
      };
    case AlbumsActionTypes.UpdateSuccesMedia:
      const library = state.library;
      const media = library.medias.find(mediaEl => mediaEl.id === action.payload.id)
      const index = library.medias.indexOf(media);
      media.name = action.payload.name;
      library.medias.splice(index, 1, media);
      return {
        ...state,
        library: {...library}
      };
    case AlbumsActionTypes.SetTotalPages:
      return {
        ...state,
        totalPages: action.payload
      };
    case AlbumsActionTypes.SetSharedTotalPages:
      return {
        ...state,
        sharedTotalPages: action.payload
      };
    case AlbumsActionTypes.AddSuccesLibraries:
      const newLibraries = state.shortLibraries.concat(action.payload);
      return {
        ...state,
        shortLibraries: newLibraries
      };
    case AlbumsActionTypes.AddFailLibraries:
      return {
        ...state,
        errorMessage: action.payload
      };
    case AlbumsActionTypes.SetUrls:
      return {
        ...state,
        urls: action.payload
      };
    case AlbumsActionTypes.SetSelectedSort:
      return {
        ...state,
        selectedSort: action.payload
      };
    case AlbumsActionTypes.SetSharedSelectedSort:
      return {
        ...state,
        sharedSelectedSort: action.payload
      };
    case AlbumsActionTypes.SortShortLibraries:
      let sortedShortLibraries: ViewAlbum[];
      switch (action.payload) {
        case 'updateDate':
          sortedShortLibraries = state.shortLibraries.sort(
            (a, b) => new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime()
            );
          break;
        case 'creationDate':
          sortedShortLibraries = state.shortLibraries.sort(
            (a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
            );
          break;
        case 'title':
          sortedShortLibraries = state.shortLibraries.sort(
            (a, b) => a.title.localeCompare(b.title)
            );
          break;
        case 'size':
          sortedShortLibraries = state.shortLibraries.sort(
            (a, b) => a.size - b.size
            );
          break;
        default:
          sortedShortLibraries = [...state.shortLibraries];
      }
      return {
        ...state,
        shortLibraries: [...sortedShortLibraries]
      };
    case AlbumsActionTypes.SortShortLibraries:
      let sortedSharedShortLibraries: ViewAlbum[];
      switch (action.payload) {
        case 'updateDate':
          sortedSharedShortLibraries = state.sharedShortLibraries.sort(
            (a, b) => new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime()
            );
          break;
        case 'creationDate':
          sortedSharedShortLibraries = state.sharedShortLibraries.sort(
            (a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
            );
          break;
        case 'title':
          sortedSharedShortLibraries = state.sharedShortLibraries.sort(
            (a, b) => a.title.localeCompare(b.title)
            );
          break;
        case 'size':
          sortedSharedShortLibraries = state.sharedShortLibraries.sort(
            (a, b) => a.size - b.size
            );
          break;
        default:
          sortedSharedShortLibraries = [...state.sharedShortLibraries];
      }
      return {
        ...state,
        sharedShortLibraries: [...sortedSharedShortLibraries]
    };
    case AlbumsActionTypes.FilterShortLibraries:
      let filteredShortLibraries: ViewAlbum[];
      filteredShortLibraries = state.allShortLibraries.filter(shLb => shLb.title.indexOf(action.payload) !== -1);
      return {
        ...state,
        shortLibraries: [...filteredShortLibraries],
      }
    case AlbumsActionTypes.FilterSharedShortLibraries:
      let filteredSharedShortLibraries: ViewAlbum[];
      filteredSharedShortLibraries = state.allSharedShortLibraries.filter(shLb => shLb.title.indexOf(action.payload) !== -1);
      return {
        ...state,
        sharedShortLibraries: [...filteredSharedShortLibraries],
      }
    case AlbumsActionTypes.SortMedias:
      let sortedMedias: Media[] = [];
      const urls = [];
      if(state.library !== null) {
        sortedMedias = algoService.sortMedias(state.library.medias, action.payload)
      }
      sortedMedias.forEach(() => {

        urls.push('noImages')
      });
      return {
        ...state,
        library: {...state.library, medias: [...sortedMedias] },
        urls: [...urls]
      };
    case AlbumsActionTypes.FilterMedias:
      let filteredMedias: Media[];
      if (action.payload !== '') {
        filteredMedias = state.library.medias.filter(media => media.name.indexOf(action.payload) !== -1);
        const newUrls = [];
        filteredMedias.forEach(media => newUrls.push(media.path));
        return {
          ...state,
          library: {...state.library, medias: [...filteredMedias] },
          urls: [...newUrls]
        };
      } else {
        const newUrls = [];
        state.allMedias.forEach(media => newUrls.push(media.path));
        return {
          ...state,
          library: {...state.library, medias: [...state.allMedias] },
          urls: [...newUrls]
        };
      }
    case AlbumsActionTypes.DeleteSuccesLibrary:
      const deletedLibraries = state.shortLibraries.filter(lb => lb.id !== action.payload);
      const deletedAllLibraries = state.allShortLibraries.filter(lb => lb.id !== action.payload);
      return {
        ...state,
        shortLibraries: [...deletedLibraries],
        allShortLibraries: [...deletedAllLibraries]
      };
    case AlbumsActionTypes.DeleteFailLibrary:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case AlbumsActionTypes.DeleteSuccesMedia:
      const deletedMedias = state.library.medias.filter(media => media.id !== action.payload);
      const deletedAllMedias = state.allMedias.filter(media => media.id !== action.payload);
      return {
        ...state,
        library: {...state.library, medias: [...deletedMedias]},
        allMedias: [...deletedAllMedias]

      };
    case AlbumsActionTypes.DeleteFailMedia:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case AlbumsActionTypes.DeleteSharedUser:
      const deletedSharedUsers = state.sharedUsers.filter(shUsr => shUsr.id !== action.payload);
      return {
        ...state,
        sharedUsers: [...deletedSharedUsers]
      };
    case AlbumsActionTypes.AddMediasSuccessToLibrary:
      const newLibrary = state.library;
      action.payload.forEach((media: Media) => {
        newLibrary.medias.push(media);
      });
      return {
        ...state,
        library: {...newLibrary}
      };
    case AlbumsActionTypes.AddMediasFailToLibrary:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case AlbumsActionTypes.SetLibrary:
      return {
        ...state,
        library: action.payload,
      };
    case AlbumsActionTypes.SetEditMedia:
      return {
        ...state,
        currentMedia: action.payload
      };
    case AlbumsActionTypes.UpdateFailMedia:
      return {
        ...state,
        errorMessage: action.payload
      };
    case AlbumsActionTypes.LoadSuccesCurrentEditLibrary:
      return {
        ...state,
        currentEditLibrary: action.payload
      };
    case AlbumsActionTypes.LoadFailCurrentEditLibrary:
      return {
        ...state,
        errorMessage: action.payload
      };
    case AlbumsActionTypes.LoadSuccesSharedUsers:
      return {
        ...state,
        sharedUsers: action.payload
      };
    case AlbumsActionTypes.LoadFailSharedUsers:
      return {
        ...state,
        errorMessage: action.payload
      };
    case AlbumsActionTypes.AddSuccessComment:
      const libraryWithNewComment = state.library;
      const mediaWithNewComment = libraryWithNewComment.medias.find(media => media.id === action.payload.idMedia);
      if(!mediaWithNewComment.comments) mediaWithNewComment.comments = [];
      mediaWithNewComment.comments.push({
        id: action.payload.id,
        idUser: action.payload.idUser,
        text: action.payload.text,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        picture: action.payload.picture,
      })
      const mediaWithNewCommentIndex = libraryWithNewComment.medias.findIndex(media => media.id === action.payload.idMedia);
      libraryWithNewComment.medias.splice(mediaWithNewCommentIndex, 1, mediaWithNewComment);
      return {
        ...state,
        library: {...libraryWithNewComment}
      };
    case AlbumsActionTypes.AddFailComment:
      return {
        ...state,
        errorMessage: action.payload
      };
    case AlbumsActionTypes.LoadSuccessComment:
      const libraryWithNewComments = state.library;

      if(action.payload[0]) {

        const mediaWithNewComments = libraryWithNewComments.medias.find(media => media.id === action.payload[0].idMedia);
        mediaWithNewComments.comments = [];
          action.payload.forEach(comment => {
            
          mediaWithNewComments.comments.push({
            id: comment.id,
            idUser: comment.idUser,
            text: comment.text,
            firstName: comment.firstName,
            lastName: comment.lastName,
            picture: comment.picture,
          })
          const mediaWithNewCommentIndex = libraryWithNewComments.medias.findIndex(media => media.id === comment.idMedia);
          libraryWithNewComments.medias.splice(mediaWithNewCommentIndex, 1, mediaWithNewComments);
        });
      }
      
      
      return {
        ...state,
        library: {...libraryWithNewComments}
      };
    case AlbumsActionTypes.LoadFailComment:
      return {
        ...state,
        errorMessage: action.payload
      };
    case AlbumsActionTypes.ReOrderAlbumSuccess:
      return {
        ...state,
        library: action.payload,
        allMedias: action.payload.medias
      };
    case AlbumsActionTypes.ReOrderAlbumFail:
        return {
          ...state,
          errorMessage: action.payload
        };
    default:
      return state;
  }
}
