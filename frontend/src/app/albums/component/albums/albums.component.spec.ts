import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { LibrariesComponent } from './albums.component';
import { AuthenticateService } from 'src/app/account/service/authenticate.service';
import { LibraryService } from '../../service/library.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { MatGridListModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShortLibrary } from '../../model/short-library.model';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddLibraryComponent } from '../add-library/add-library.component';
import { LibraryModule } from '../../library.module';

describe('LibrariesComponent', () => {

    let librariesComponent: LibrariesComponent;
    let librariesFixture: ComponentFixture<LibrariesComponent>;
    let router: Router;
    let authService: AuthenticateService;
    const libraryService = jasmine.createSpyObj('LibraryService', ['getAllByUser']);
    const mockLibraries: ShortLibrary[] = [
        {
            id: 1,
            shortTitle: 'short title 1',
            images: [{ id: 1, name: 'picture1.jpeg'}]
        },
        {
            id: 2,
            shortTitle: 'short title 2',
            images: [{ id: 2, name: 'picture2.jpeg'}]
        },
        {
            id: 3,
            shortTitle: 'short title 3',
            images: [{ id: 3, name: 'picture3.jpeg'}]
        }
    ]
    libraryService.getAllByUser.and.returnValue(of(mockLibraries));

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [ LibrariesComponent ],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                MatGridListModule,
                MatButtonModule,
                SharedModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: (createTranslateLoader),
                        deps: [HttpClient]
                    }
                })
            ],
            providers: [
                AuthenticateService,
                { provide: LibraryService, useValue: libraryService },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        librariesFixture = TestBed.createComponent(LibrariesComponent);
        librariesComponent = librariesFixture.componentInstance;
        librariesFixture.detectChanges();
        router = TestBed.get(Router);
        authService = TestBed.get(AuthenticateService);
        spyOn(authService, 'getUserId').and.returnValue('1');
    });

    it('should create', () => {
        expect(librariesComponent).toBeTruthy();
        expect(librariesComponent.libraries).toEqual(mockLibraries);
    });

    it('should initialize grid', () => {
        const librariesCompiled = librariesFixture.nativeElement;

        expect(librariesCompiled.querySelectorAll('.library-grid-container mat-grid-list mat-grid-tile').length).toEqual(4);
        expect(librariesCompiled.querySelectorAll('.library-grid-container mat-grid-list mat-grid-tile button mat-grid-tile-footer')[0]
            .textContent).toEqual('short title 1');
        expect(librariesCompiled.querySelectorAll('.library-grid-container mat-grid-list mat-grid-tile button mat-grid-tile-footer')[1]
            .textContent).toEqual('short title 2');
        expect(librariesCompiled.querySelectorAll('.library-grid-container mat-grid-list mat-grid-tile button mat-grid-tile-footer')[2]
            .textContent).toEqual('short title 3');
        expect(librariesCompiled.querySelectorAll('.library-grid-container mat-grid-list mat-grid-tile button mat-grid-tile-footer')[3]
            .textContent).toEqual('add');
        expect(librariesCompiled.querySelectorAll('.library-grid-container mat-grid-list mat-grid-tile button secured-image').length)
            .toEqual(3);
    });

    it('should call add library', () => {
        const librariesCompiled = librariesFixture.nativeElement;

        const navigateSpy = spyOn(router, 'navigateByUrl').and.callFake(() => new Promise(() => {}));
        const addLibraryButton = librariesCompiled.querySelector('.add-library-button')
        addLibraryButton.click();
        librariesFixture.detectChanges();

        expect(navigateSpy).toHaveBeenCalledWith('/libraries/add');
    });

    it('should call libraries :id', () => {
        const librariesCompiled = librariesFixture.nativeElement;

        const navigateSpy = spyOn(router, 'navigateByUrl');
        const addLibraryButton0 = librariesCompiled.querySelectorAll('.library-tile-button')[0]
        addLibraryButton0.click();
        librariesFixture.detectChanges();

        expect(navigateSpy).toHaveBeenCalledWith('libraries/1');

        const addLibraryButton1 = librariesCompiled.querySelectorAll('.library-tile-button')[1]
        addLibraryButton1.click();
        librariesFixture.detectChanges();

        expect(navigateSpy).toHaveBeenCalledWith('libraries/2');

        const addLibraryButton2 = librariesCompiled.querySelectorAll('.library-tile-button')[2]
        addLibraryButton2.click();
        librariesFixture.detectChanges();

        expect(navigateSpy).toHaveBeenCalledWith('libraries/3');
    });
});