import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersLibraryComponent } from './add-users-library.component';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { UserService } from 'src/app/user/service/user.service';
import { AuthenticateService } from 'src/app/albums/component/albums/node_modules/src/app/account/service/authenticate.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { SharedUser } from 'src/app/user/model/shared-user.model';

describe('AddUsersLibraryComponent', () => {

    let addUsersLibrarycomponent: AddUsersLibraryComponent;
    let addUsersLibraryFixture: ComponentFixture<AddUsersLibraryComponent>;
    let router: Router;
    const userService = jasmine.createSpyObj('UserService', ['findSharedUsers', 'getAllSharedUsers', 'saveSharedUsers']);
    const mockAllSharedUsers: SharedUser[] = [
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
    ]
    userService.getAllSharedUsers.and.returnValue(of(mockAllSharedUsers));
    const authService = jasmine.createSpyObj('AuthenticateService', ['getUserId']);
    authService.getUserId.and.returnValue(1);

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [ AddUsersLibraryComponent ],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                MatButtonModule,
                MatFormFieldModule,
                MatInputModule,
                MatAutocompleteModule,
                ReactiveFormsModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: (createTranslateLoader),
                        deps: [HttpClient]
                    }
                })
            ],
            providers: [
                { provide: UserService, useValue: userService },
                { provide: AuthenticateService, useValue: authService },
                { provide: ActivatedRoute, useValue: { params: of({idLibrary: 1}) }}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        addUsersLibraryFixture = TestBed.createComponent(AddUsersLibraryComponent);
        addUsersLibrarycomponent = addUsersLibraryFixture.componentInstance;
        router = TestBed.get(Router);
        addUsersLibraryFixture.detectChanges();
    });

    it('should create', () => {
        expect(addUsersLibrarycomponent).toBeTruthy();
    });

    it('should render input and list of shared users', () => {
        const addUsersLibraryCompiled = addUsersLibraryFixture.nativeElement;

        expect(addUsersLibraryCompiled.querySelector('.global-container h3').textContent).toEqual('shareUsersLibrary');
        expect(addUsersLibraryCompiled.querySelector('.global-container mat-form-field input').placeholder).toEqual('searchUser');
        expect(addUsersLibraryCompiled.querySelectorAll('.global-container .list-container mat-list mat-list-item').length).toEqual(3);
        expect(addUsersLibraryCompiled.querySelectorAll('.global-container .list-container mat-list mat-list-item')[0].textContent.trim())
            .toEqual('first name 1 last name 1');
        expect(addUsersLibraryCompiled.querySelectorAll('.global-container .list-container mat-list mat-list-item')[1].textContent.trim())
            .toEqual('first name 2 last name 2');
        expect(addUsersLibraryCompiled.querySelectorAll('.global-container .list-container mat-list mat-list-item')[2].textContent.trim())
            .toEqual('first name 3 last name 3');
    });

    it('should suggest and search for shared users', async(() => {
        const addUsersLibraryCompiled = addUsersLibraryFixture.nativeElement;

        const searchUserInputElement = addUsersLibraryCompiled.querySelector('input[name=\'searchUser\']');
        searchUserInputElement.value = 'first name 1';
        searchUserInputElement.dispatchEvent(new Event('input'));
        addUsersLibraryFixture.detectChanges();

        const mockSharedUsers: SharedUser[] = [
            {
                id: 1,
                firstName: 'first name 1',
                lastName: 'last name 1',
                picture: 'picture1.jpeg',
                libraryId: 1
            }
        ]
        userService.findSharedUsers.and.returnValue(of(mockSharedUsers));

        addUsersLibraryFixture.whenStable().then(() => {
            expect(userService.findSharedUsers).toHaveBeenCalled();
            expect(addUsersLibrarycomponent.suggestUsers).toEqual(mockSharedUsers);
        });

        const keyUpEvent = new KeyboardEvent('keyup', {
                                                        code: 'Enter',
                                                        key: 'Enter'
                                                    });
        searchUserInputElement.dispatchEvent(keyUpEvent);

        addUsersLibraryFixture.whenStable().then(() => {
            expect(addUsersLibrarycomponent.users).toEqual(mockSharedUsers);
        });
    }));

    it('should add shared user on user click', () => {
        const addUsersLibraryCompiled = addUsersLibraryFixture.nativeElement;

        const userListItem = addUsersLibraryCompiled.querySelectorAll('.global-container .list-container mat-list mat-list-item')[0]
        userListItem.click();

        const sharedUsers: SharedUser[] = [
            {
                id: 1,
                firstName: 'first name 1',
                lastName: 'last name 1',
                picture: 'picture1.jpeg',
                libraryId: 1
            }
        ]
        expect(addUsersLibrarycomponent.sharedUsers).toEqual(sharedUsers);

        const userListItem2 = addUsersLibraryCompiled.querySelectorAll('.global-container .list-container mat-list mat-list-item')[2]
        userListItem2.click();

        const sharedUsers2: SharedUser[] = [
            {
                id: 1,
                firstName: 'first name 1',
                lastName: 'last name 1',
                picture: 'picture1.jpeg',
                libraryId: 1
            },
            {
            id: 3,
            firstName: 'first name 3',
            lastName: 'last name 3',
            picture: 'picture3.jpeg',
            libraryId: 1
            }
        ]
        expect(addUsersLibrarycomponent.sharedUsers).toEqual(sharedUsers2);

        userListItem2.click();
        expect(addUsersLibrarycomponent.sharedUsers).toEqual(sharedUsers2);
    });

    it('should submit form', () => {
        const addUsersLibraryCompiled = addUsersLibraryFixture.nativeElement;

        const userListItem = addUsersLibraryCompiled.querySelectorAll('.global-container .list-container mat-list mat-list-item')[0]
        userListItem.click();
        const userListItem2 = addUsersLibraryCompiled.querySelectorAll('.global-container .list-container mat-list mat-list-item')[2]
        userListItem2.click();

        const sharedUsers: SharedUser[] = [
            {
                id: 1,
                firstName: 'first name 1',
                lastName: 'last name 1',
                picture: 'picture1.jpeg',
                libraryId: 1
            },
            {
            id: 3,
            firstName: 'first name 3',
            lastName: 'last name 3',
            picture: 'picture3.jpeg',
            libraryId: 1
            }
        ]
        userService.saveSharedUsers.and.returnValue(of(sharedUsers));
        const navigateSpy = spyOn(router, 'navigateByUrl');

        const submitButton = addUsersLibraryCompiled.querySelector('.global-container button')
        submitButton.click();
        addUsersLibraryFixture.detectChanges();

        expect(navigateSpy).toHaveBeenCalledWith('libraries/1');
    });
});
