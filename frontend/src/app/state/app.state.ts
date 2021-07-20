import { AlbumsState } from '../albums/state/albums.reducer';
import { MediaState } from '../media/state/media.reducer';

// Representation of the entire app state
// Extended by lazy loaded modules
export interface State {
  library: AlbumsState;
  image: MediaState;
}

