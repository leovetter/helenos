import { Media } from 'src/app/media/model/media.model';

export interface EditAlbum {
    id: number;
    publicAlbum: number;
    oldTitle: string;
    title: string;
    cover: string;
    ownedUserId: number;
}
