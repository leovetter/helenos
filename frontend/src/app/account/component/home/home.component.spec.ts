import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { AuthenticateService } from '../../service/authenticate.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {

    let homeComponent: HomeComponent;
    let homeFixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: (createTranslateLoader),
                        deps: [ HttpClient ]
                    }
                })
            ],
            declarations: [ HomeComponent ],
            providers: [
                AuthenticateService,
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        homeFixture = TestBed.createComponent(HomeComponent);
        homeComponent = homeFixture.componentInstance;
        homeFixture.detectChanges();
    });

    it('should create', () => {
        expect(homeComponent).toBeTruthy();
    });

    it('should render logo text container', () => {
        const homeCompiled = homeFixture.nativeElement;
        expect(homeCompiled.querySelector('.logo-text-container p').textContent).toContain('storageAndSharing');
        expect(homeCompiled.querySelector('.logo-text-container img').alt).toContain('logo');
    });

    it('should render container', () => {
        const homeCompiled = homeFixture.nativeElement;
        expect(homeCompiled.querySelectorAll('.container p')[0].textContent).toContain('createLibrary');
        expect(homeCompiled.querySelectorAll('.container p')[1].textContent).toContain('shareLibrary');
        expect(homeCompiled.querySelectorAll('.container p')[2].textContent).toContain('visualizeLibrary');
        expect(homeCompiled.querySelectorAll('.container img')[0].alt).toContain('create-library');
        expect(homeCompiled.querySelectorAll('.container img')[1].alt).toContain('add-shared-users');
        expect(homeCompiled.querySelectorAll('.container img')[2].alt).toContain('library');
    });
});
