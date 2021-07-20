import { TestBed } from '@angular/core/testing';

import { AuthenticateService } from './authenticate.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpResponse } from '@angular/common/http';
import { SignUpUser } from '../../account/model/signUpUser.model';
import { environment } from 'src/environments/environment';

describe('AuthenticateService', () => {

    let httpTestingController: HttpTestingController;
    let authService: AuthenticateService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                AuthenticateService,
            ]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        authService = TestBed.get(AuthenticateService);
    });

    it('should be created', () => {
        expect(authService).toBeTruthy();
    });

    it('can test authService authenticate success', () => {

        const credentials = {email: 'emailTest@gmail.com', password: 'passwordTest'};

        authService.authenticate(credentials)
                    .subscribe((response: HttpResponse<any>) => {
                        expect(response.headers.get('Authorization')).toEqual('Bearer ')
                        expect(response.status).toEqual(201)
                    });

        const req = httpTestingController.expectOne(environment.apiUrl + '/login');

        expect(req.request.method).toEqual('POST');

        req.flush(null, {
            headers: { Authorization: 'Bearer '},
            status: 201,
            statusText: 'Ok'
        });
    });

    it('can test authService authenticate 401', () => {

        const credentials = {email: 'nonEmailTest@gmail.com', password: 'nonPasswordTest'};

        authService.authenticate(credentials)
                    .subscribe(() => {},
                    ((err: HttpResponse<any>) => {
                        expect(err.status).toEqual(401)
                    }));

        const req = httpTestingController.expectOne(environment.apiUrl + '/login');

        expect(req.request.method).toEqual('POST');

        req.flush(null, {
            status: 401,
            statusText: 'Authorization failure'
        });
    });

    it('can test authService signUp success', () => {

        const user: SignUpUser = {
            id: null,
            firstName: 'first name test',
            lastName: 'last name test',
            email: 'email test',
            password: 'password test'
        };

        const mockUser: SignUpUser = {
            id: 1,
            firstName: 'first name test',
            lastName: 'last name test',
            email: 'email test',
            password: 'password test'
        };

        authService.signUp(user)
                    .subscribe((data: SignUpUser) => {
                        expect(data.id).toEqual(1)
                        expect(data.firstName).toEqual('first name test')
                    });

        const req = httpTestingController.expectOne(environment.apiUrl + '/media/users');

        expect(req.request.method).toEqual('POST');

        req.flush(mockUser);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

});
