import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { SharedUser } from '../model/shared-user.model';
import { AccountUser } from '../model/account-user.model';

describe('UserService', () => {

    let httpTestingController: HttpTestingController;
    let userService: UserService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
        });

        httpTestingController = TestBed.get(HttpTestingController);
        userService = TestBed.get(UserService);

    });

    it('should be created', () => {
        expect(userService).toBeTruthy();
    });

    it('can test userService getAllSharedUsers with users success', () => {

        const mockSharedUsers: SharedUser[] = [
            {
                id: 1,
                firstName: 'first name 1',
                lastName: 'last name 1',
                picture: 'picture1.jpeg',
                libraryId: 1
            },
            {
                id: 2,
                firstName: 'first name 2',
                lastName: 'last name 2',
                picture: 'picture2.jpeg',
                libraryId: 1
            },
            {
                id: 3,
                firstName: 'first name 3',
                lastName: 'last name 3',
                picture: 'picture3.jpeg',
                libraryId: 1
            }
        ];

        userService.getAllSharedUsers()
                    .subscribe((sharedUsers: SharedUser[]) => {
                        expect(sharedUsers[0].id).toEqual(1);
                        expect(sharedUsers[0].firstName).toEqual('first name 1');
                        expect(sharedUsers[0].lastName).toEqual('last name 1');
                        expect(sharedUsers[0].picture).toEqual('picture1.jpeg');
                        expect(sharedUsers[0].libraryId).toEqual(1);
                        expect(sharedUsers[1].id).toEqual(2);
                        expect(sharedUsers[1].firstName).toEqual('first name 2');
                        expect(sharedUsers[1].lastName).toEqual('last name 2');
                        expect(sharedUsers[1].picture).toEqual('picture2.jpeg');
                        expect(sharedUsers[1].libraryId).toEqual(1);
                        expect(sharedUsers[2].id).toEqual(3);
                        expect(sharedUsers[2].firstName).toEqual('first name 3');
                        expect(sharedUsers[2].lastName).toEqual('last name 3');
                        expect(sharedUsers[2].picture).toEqual('picture3.jpeg');
                        expect(sharedUsers[2].libraryId).toEqual(1);
                    });

        const req = httpTestingController.expectOne(environment.apiUrl + '/media/sharedUsers');
        expect(req.request.method).toEqual('GET');

        req.flush(mockSharedUsers);
    });

    it('can test userService getAllSharedUsers with no users success', () => {

        userService.getAllSharedUsers()
                    .subscribe((sharedUsers: SharedUser[]) => {
                        expect(sharedUsers.length).toEqual(0);
                    });

        const req = httpTestingController.expectOne(environment.apiUrl + '/media/sharedUsers');
        expect(req.request.method).toEqual('GET');

        req.flush([]);
    });

    it('can test userService findSharedUsers success', () => {

        const mockSharedUsers: SharedUser[] = [
            {
                id: 1,
                firstName: 'antoine',
                lastName: 'copin',
                picture: 'copin.jpeg',
                libraryId: null
            },
            {
                id: 2,
                firstName: 'kevin',
                lastName: 'antoine',
                picture: 'antoine.jpeg',
                libraryId: null
            }
        ];

        userService.findSharedUsers('Antoine')
                    .subscribe((sharedUsers: SharedUser[]) => {
                        expect(sharedUsers[0].id).toEqual(1);
                        expect(sharedUsers[0].firstName).toEqual('antoine');
                        expect(sharedUsers[0].lastName).toEqual('copin');
                        expect(sharedUsers[0].picture).toEqual('copin.jpeg');
                        expect(sharedUsers[0].libraryId).toEqual(null);
                        expect(sharedUsers[1].id).toEqual(2);
                        expect(sharedUsers[1].firstName).toEqual('kevin');
                        expect(sharedUsers[1].lastName).toEqual('antoine');
                        expect(sharedUsers[1].picture).toEqual('antoine.jpeg');
                        expect(sharedUsers[1].libraryId).toEqual(null);
                    });

        const req = httpTestingController.expectOne(environment.apiUrl + '/media/sharedUsers/Antoine');
        expect(req.request.method).toEqual('GET');

        req.flush(mockSharedUsers);
    });

    it('can test userService saveSharedUsers with shared users success', () => {

        const sharedUsers = [
            {
                id: 1,
                firstName: 'antoine',
                lastName: 'copin',
                picture: 'copin.jpeg',
                libraryId: 1
            },
            {
                id: 2,
                firstName: 'kevin',
                lastName: 'antoine',
                picture: 'antoine.jpeg',
                libraryId: 1
            }
        ];

        const mockSharedUsers = [
            {
                id: 1,
                firstName: 'antoine',
                lastName: 'copin',
                picture: 'copin.jpeg',
                libraryId: null
            },
            {
                id: 2,
                firstName: 'kevin',
                lastName: 'antoine',
                picture: 'antoine.jpeg',
                libraryId: null
            }
        ];

        userService.saveSharedUsers(sharedUsers)
                    .subscribe((returnedSharedUsers: SharedUser[]) => {
                        expect(returnedSharedUsers[0].id).toEqual(1);
                        expect(returnedSharedUsers[0].firstName).toEqual('antoine');
                        expect(returnedSharedUsers[0].lastName).toEqual('copin');
                        expect(returnedSharedUsers[0].picture).toEqual('copin.jpeg');
                        expect(returnedSharedUsers[0].libraryId).toEqual(null);
                        expect(returnedSharedUsers[1].id).toEqual(2);
                        expect(returnedSharedUsers[1].firstName).toEqual('kevin');
                        expect(returnedSharedUsers[1].lastName).toEqual('antoine');
                        expect(returnedSharedUsers[1].picture).toEqual('antoine.jpeg');
                        expect(returnedSharedUsers[1].libraryId).toEqual(null);
                    });

        const req = httpTestingController.expectOne(environment.apiUrl + '/media/sharedUsers');
        expect(req.request.method).toEqual('POST');

        req.flush(mockSharedUsers);
    });

    it('can test userService saveSharedUsers with no shared users success', () => {

        const sharedUsers = [];

        userService.saveSharedUsers(sharedUsers)
                    .subscribe((sharedUSers: SharedUser[]) => {
                        expect(sharedUSers).toEqual(null);
                    });

        const req = httpTestingController.expectOne(environment.apiUrl + '/media/sharedUsers');
        expect(req.request.method).toEqual('POST');

        req.flush(null);
    });

    it('can test userService saveAccountUser success', () => {

        const accountUser: AccountUser = {
            id: 1,
            firstName: 'first name',
            lastName: 'last name',
            email: 'email@gmail.com',
            picture: 'picture.jpeg'
        };

        const mockAccountUser: AccountUser = {
            id: 1,
            firstName: 'first name',
            lastName: 'last name',
            email: 'email@gmail.com',
            picture: 'picture.jpeg'
        };

        userService.saveAccountUser(accountUser)
                    .subscribe((returnedAccountUser: AccountUser) => {
                        expect(returnedAccountUser.id).toEqual(1);
                        expect(returnedAccountUser.firstName).toEqual('first name');
                        expect(returnedAccountUser.lastName).toEqual('last name');
                        expect(returnedAccountUser.email).toEqual('email@gmail.com');
                        expect(returnedAccountUser.picture).toEqual('picture.jpeg');
                    });

        const req = httpTestingController.expectOne(environment.apiUrl + '/media/accountUsers');
        expect(req.request.method).toEqual('POST');

        req.flush(mockAccountUser);
    });

    it('can test userService saveAccountUser success', () => {

        const mockAccountUser: AccountUser = {
            id: 1,
            firstName: 'first name',
            lastName: 'last name',
            email: 'email@gmail.com',
            picture: 'picture.jpeg'
        };

        userService.getAccountUser('1')
                    .subscribe((accountUser: AccountUser) => {
                        expect(accountUser.id).toEqual(1);
                        expect(accountUser.firstName).toEqual('first name');
                        expect(accountUser.lastName).toEqual('last name');
                        expect(accountUser.email).toEqual('email@gmail.com');
                        expect(accountUser.picture).toEqual('picture.jpeg');
                    });

        const req = httpTestingController.expectOne(environment.apiUrl + '/media/accountUsers/' + 1);
        expect(req.request.method).toEqual('GET');

        req.flush(mockAccountUser);
    });

    afterEach(() => {
        httpTestingController.verify();
    });
});
