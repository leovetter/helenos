
import { AddLibraryComponent } from './add-album.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SavedLibrary } from '../../model/saved-library.model';
import { LibraryService } from '../../service/library.service';
import { ImageService } from 'src/app/core/service/image.service';
import { HttpEventType } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

describe('AddLibraryComponent', () => {

    let addLibraryComponent: AddLibraryComponent;
    let addLibraryFixture: ComponentFixture<AddLibraryComponent>;
    let router: Router;
    const libraryService = jasmine.createSpyObj('LibraryService', ['addLibrary']);
    const mockSavedLibraries: SavedLibrary = {
            id: 1,
            title: 'title',
            shortTitle: 'short title',
            images: [{ id: 1, name: 'picture1.jpeg'}, { id: 2, name: 'picture12.jpeg'}, { id: 3, name: 'picture3.jpeg'}]
        };
    libraryService.addLibrary.and.returnValue(of(mockSavedLibraries));
    const imageService = jasmine.createSpyObj('ImageService', ['uploadImages']);

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [ AddLibraryComponent ],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                MatButtonModule,
                MatFormFieldModule,
                MatInputModule,
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
                { provide: LibraryService, useValue: libraryService },
                { provide: ImageService, useValue: imageService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();

    }));

    beforeEach(() => {
        addLibraryFixture = TestBed.createComponent(AddLibraryComponent);
        addLibraryComponent = addLibraryFixture.componentInstance;
        router = TestBed.get(Router);
        addLibraryFixture.detectChanges();
    });

    it('should create', () => {
        expect(addLibraryComponent).toBeTruthy();
    });

    it('should initialize form', () => {
        const addLibraryCompiled = addLibraryFixture.nativeElement;

        expect(addLibraryCompiled.querySelector('form .add-library-form-container h3').textContent).toEqual('libraryCreation');
        expect(addLibraryCompiled.querySelectorAll('form .add-library-form-container fieldset legend')[0].textContent)
            .toEqual('informations');
        expect(addLibraryCompiled.querySelectorAll('form .add-library-form-container fieldset div mat-form-field input')[0].placeholder)
            .toEqual('title');
        expect(addLibraryCompiled.querySelectorAll('form .add-library-form-container fieldset div mat-form-field input')[1].placeholder)
            .toEqual('shortTitle');
        expect(addLibraryCompiled.querySelectorAll('form .add-library-form-container fieldset legend')[1].textContent)
            .toEqual('images');
        expect(addLibraryCompiled.querySelector('form .add-library-form-container fieldset div .uploadfilecontainer input')).toBeDefined();
        expect(addLibraryCompiled.querySelector('form .add-library-form-container fieldset .files-list')).toBeNull();
        expect(addLibraryCompiled.querySelector('form .add-library-form-container fieldset .progress-bar-container')).toBeNull();
        expect(addLibraryCompiled.querySelector('form .add-library-form-container .submit-button').textContent).toEqual('submit');
    });

    it('should render error messages', () => {
        const addLibraryCompiled = addLibraryFixture.nativeElement;

        const submitButton = addLibraryCompiled.querySelector('form .add-library-form-container .submit-button');
        submitButton.click();
        addLibraryFixture.detectChanges();

        expect(addLibraryCompiled.querySelectorAll('form .add-library-form-container fieldset div mat-error small')[0].textContent)
            .toEqual(' titleRequired ');
        expect(addLibraryCompiled.querySelectorAll('form .add-library-form-container fieldset div mat-error small')[1].textContent)
            .toEqual(' shortTitleRequired ');

        const titleInputElement = addLibraryCompiled.querySelector('input[name=\'title\']');
        titleInputElement.value = 'title';
        titleInputElement.dispatchEvent(new Event('input'));

        const shortTitleInputElement = addLibraryCompiled.querySelector('input[name=\'shortTitle\']');
        shortTitleInputElement.value = 'very very very very very very very very very very very very long short title';
        shortTitleInputElement.dispatchEvent(new Event('input'));

        submitButton.click();
        addLibraryFixture.detectChanges();

        expect(addLibraryCompiled.querySelectorAll('form .add-library-form-container fieldset div mat-error small')[0].textContent)
            .toEqual(' shortTitleMaxLength ');
    });

    it('should submit form', () => {
        const addLibraryCompiled = addLibraryFixture.nativeElement;

        const titleInputElement = addLibraryCompiled.querySelector('input[name=\'title\']');
        titleInputElement.value = 'title';
        titleInputElement.dispatchEvent(new Event('input'));

        const shortTitleInputElement = addLibraryCompiled.querySelector('input[name=\'shortTitle\']');
        shortTitleInputElement.value = 'short title';
        shortTitleInputElement.dispatchEvent(new Event('input'));

        imageService.uploadImages.and.returnValue(of({ type: HttpEventType.UploadProgress, loaded: 7, total: 10 }));

        const submitButton = addLibraryCompiled.querySelector('form .add-library-form-container .submit-button');
        submitButton.click();
        addLibraryFixture.detectChanges();

        const progress = Math.round(7 / 10 * 100);
        expect(addLibraryComponent.progress).toEqual(progress);
        expect(addLibraryCompiled.querySelector('form .add-library-form-container .progress-bar-container .progress-bar').textContent)
            .toEqual(' ' + progress + ' % ');

        const navigateSpy = spyOn(router, 'navigateByUrl');
        imageService.uploadImages.and.returnValue(of({ type: HttpEventType.Response}));

        submitButton.click();
        addLibraryFixture.detectChanges();

        expect(navigateSpy).toHaveBeenCalledWith('/libraries/1/users');
    });
});
