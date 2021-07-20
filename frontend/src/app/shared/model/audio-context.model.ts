import { Album } from 'src/app/albums/model/album.model';

export class AudioContext {
    library: Album;
    owner: number;
    sort: string;
    paused: boolean;
    fromYoutube: boolean;
}