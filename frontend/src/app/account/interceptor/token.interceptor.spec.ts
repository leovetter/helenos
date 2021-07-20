import { TokenInterceptor } from './token.interceptor';
import { UserService } from 'src/app/user/service/user.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticateService } from '../service/authenticate.service';
import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';

describe('TokenInterceptor', () => {

    let userService: UserService;
    let authService: AuthenticateService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
                ],
            providers: [
                UserService,
                AuthenticateService,
                {
                provide: HTTP_INTERCEPTORS,
                useClass: TokenInterceptor,
                multi: true,
                },
            ],
        });

        userService = TestBed.get(UserService);
        httpTestingController = TestBed.get(HttpTestingController);
        authService = TestBed.get(AuthenticateService);
        spyOn(authService, 'getJwtToken').and.returnValue('abcd1234');
    });

    it('should create an instance', () => {
        expect(new TokenInterceptor(authService)).toBeTruthy();
    });

    it('should add an Authorization header', () => {

        userService.getAllSharedUsers().subscribe(response => {
            expect(response).toBeTruthy();
        });

        const httpRequest = httpTestingController.expectOne(environment.apiUrl + '/media/sharedUsers');

        expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
        expect(httpRequest.request.headers.get('Authorization')).toBe('Bearer abcd1234');
    });
});
