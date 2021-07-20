import { Injectable } from '@angular/core';
import { Media } from 'src/app/media/model/media.model';

@Injectable({
  providedIn: 'root'
})
export class AlgosService {

  constructor() { }

  sortMedias(medias: Media[], sort: string) {

    let sortedMedias: Media[] = [];
    switch (sort) {
      case 'updateDate':
        sortedMedias = medias.sort(
          (a, b) => new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime()
          );
        break;
      case 'creationDate':
        sortedMedias = medias.sort(
          (a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
          );
        break;
      case 'name':
        sortedMedias = medias.sort(
          (a, b) => a.name.localeCompare(b.name)
          );
        break;
      case 'size':
        sortedMedias = medias.sort(
          (a, b) => a.size - b.size
          );
        break;
      case 'custom':
        sortedMedias = medias.sort(
          (a, b) => a.order - b.order
          );
      default:
        sortedMedias = medias;
    }
    return sortedMedias;
  }
}
