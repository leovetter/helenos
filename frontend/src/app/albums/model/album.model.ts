import { Media } from 'src/app/media/model/media.model';

export interface Album {
    id: number;
    cover: string;
	ownedUserId: number;
    title: string;
    shortTitle: string;
    medias: Array<Media>;
    creationDate?: Date;
}
