import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { AuthenticateService } from './authenticate.service';
import { EditAlbum } from 'src/app/albums/model/edit-album.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {

    constructor(private http: HttpClient,
                private authService: AuthenticateService) { }

    updatePathLibrary(library: EditAlbum) {
        return this.http.get(environment.apiUrl + '/media/users/' + this.authService.getUserId() + '/editPath/' + library.oldTitle + '/' + library.title + '/' + library.ownedUserId);
    }

}
