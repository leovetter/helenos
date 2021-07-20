import { Album } from 'src/app/albums/model/album.model';
import { Media } from 'src/app/media/model/media.model';

export class CurrentAudio {
    path: string;
    name: string;
    id: number;
    library: Album;
    sortedMedias: Media[];
    owner: number;
    sort: string;
    paused: boolean;
    starting: boolean
}