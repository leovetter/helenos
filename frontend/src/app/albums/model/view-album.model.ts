import { Image } from 'src/app/media/model/image.model';

export interface ViewAlbum {
    id: number;
    title: string;
    size: number;
    creationDate: Date;
    updateDate: Date;
    cover: string;
    ownedUserId: number;
}
