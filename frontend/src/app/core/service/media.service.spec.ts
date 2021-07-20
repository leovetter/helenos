import { TestBed } from '@angular/core/testing';

import { ImageService } from './image.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticateService } from 'src/app/albums/component/albums/node_modules/src/app/account/service/authenticate.service';
import { environment } from 'src/environments/environment';
import { HttpEventType } from '@angular/common/http';
import { filter } from 'rxjs/operators';

describe('ImageService', () => {

    let httpTestingController: HttpTestingController;
    let imageService: ImageService;
    let authService: AuthenticateService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                AuthenticateService
            ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        imageService = TestBed.get(ImageService);
        authService = TestBed.get(AuthenticateService);
        spyOn(authService, 'getUserId').and.returnValue('1');
    });

    it('should be created', () => {
        expect(imageService).toBeTruthy();
    });

    it('can test imageService uploadImages success', () => {

        const fd = new FormData();
        fd.append('image', new File([JSON.stringify({ message: 'hello world  1 !!' }, null, 2)],
            'testImage1.jpeg', { type: 'image/jpeg' }), 'testImage1.jpg');
        fd.append('image', new File([JSON.stringify({ message: 'hello world  2 !!' }, null, 2)],
            'testImage2.jpg', { type: 'image/jpeg' }), 'testImage2.jpg');

        imageService.uploadImages(fd)
            .pipe(filter(event => event.type === HttpEventType.UploadProgress))
            .subscribe((event: any) => {
                expect(event.type).toEqual(HttpEventType.UploadProgress);
                expect(event.loaded).toEqual(7);
            });

        const req = httpTestingController.expectOne(environment.apiUrl + '/media/users/' + authService.getUserId() + '/images');
        expect(req.request.method).toEqual('POST');
        req.event({ type: HttpEventType.UploadProgress, loaded: 7, total: 10 });
    });

    it('can test imageService Response success', () => {

        const fd = new FormData();
        fd.append('image', new File([JSON.stringify({ message: 'hello world  1 !!' }, null, 2)],
            'testImage1.jpeg', { type: 'image/jpeg' }), 'testImage1.jpg');
        fd.append('image', new File([JSON.stringify({ message: 'hello world  2 !!' }, null, 2)],
            'testImage2.jpg', { type: 'image/jpeg' }), 'testImage2.jpg');

        imageService.uploadImages(fd)
            .pipe(filter(event => event.type === HttpEventType.Response))
            .subscribe((event: any) => {
                expect(event.type).toEqual(HttpEventType.Response);
            });

        const req = httpTestingController.expectOne(environment.apiUrl + '/media/users/' + authService.getUserId() + '/images');
        expect(req.request.method).toEqual('POST');
        req.event({ type: HttpEventType.Response, body: null, status: 201, statusText: 'ok',
                    clone: null, headers: null, url: null, ok: null });
    });

    afterEach(() => {
        httpTestingController.verify();
    });
});