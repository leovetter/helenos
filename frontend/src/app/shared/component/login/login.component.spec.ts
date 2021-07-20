import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { AuthenticateService } from '../../service/authenticate.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule, HttpResponse, HttpHeaders } from '@angular/common/http';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {

    let loginComponent: LoginComponent;
    let loginFixture: ComponentFixture<LoginComponent>;
    let router: Router;
    const authService = jasmine.createSpyObj('AuthenticateService', ['authenticate', 'storeUserId', 'storeJwtToken']);

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                RouterTestingModule,
                HttpClientModule,
                MatFormFieldModule,
                MatInputModule,
                MatButtonModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: (createTranslateLoader),
                        deps: [HttpClient]
                    }
                })
            ],
            providers: [
                { provide: AuthenticateService, useValue: authService }
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        loginFixture = TestBed.createComponent(LoginComponent);
        loginComponent = loginFixture.componentInstance;
        loginFixture.detectChanges();
        router = TestBed.get(Router);
    });

    it('should intialize form', () => {
        const loginCompiled = loginFixture.nativeElement;
        expect(loginCompiled.querySelectorAll('form .login-form-container mat-form-field input')[0].placeholder).toEqual('email');
        expect(loginCompiled.querySelectorAll('form .login-form-container mat-form-field input')[1].placeholder).toEqual('password');
        expect(loginCompiled.querySelectorAll('form .login-form-container mat-error small').length).toEqual(0);
    });

    it('should render error messages', () => {
        const loginCompiled = loginFixture.nativeElement;
        const submitButton = loginCompiled.querySelector('form .login-form-container button')
        submitButton.click();
        loginFixture.detectChanges();
        expect(loginCompiled.querySelectorAll('form .login-form-container mat-error small')[0].textContent).toEqual(' emailRequired ');
        expect(loginCompiled.querySelectorAll('form .login-form-container mat-error small')[1].textContent).toEqual(' passwordRequired ');
    });

    it('should submit form and synchronize errorMessage', () => {
        const loginCompiled = loginFixture.nativeElement;

        const emailInputElement = loginCompiled.querySelector('input[name=\'email\']');
        emailInputElement.value = 'emailTest@gmail.com';
        emailInputElement.dispatchEvent(new Event('input'));

        const passwordInputElement = loginCompiled.querySelector('input[name=\'password\']');
        passwordInputElement.value = 'passwordTest';
        passwordInputElement.dispatchEvent(new Event('input'));
        loginFixture.detectChanges();
        const navigateSpy = spyOn(router, 'navigateByUrl');

        authService.authenticate.and.returnValue(of(
            new HttpResponse({
                headers: new HttpHeaders({
                    // tslint:disable-next-line: max-line-length
                    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
                })
            })
        ));

        const submitButton = loginCompiled.querySelector('form .login-form-container button')
        submitButton.click();

        expect(authService.authenticate).toHaveBeenCalledWith({ email: 'emailTest@gmail.com', password: 'passwordTest' });
        expect(navigateSpy).toHaveBeenCalledWith('/libraries');

        authService.authenticate.and.returnValue(throwError({status: 401}));

        submitButton.click();
        loginFixture.detectChanges();
        expect(loginComponent.errorMessage).toEqual('Mauvais identifiants');
        let spanBadCredentials = loginCompiled.querySelector('form .login-form-container mat-error small')
        expect(spanBadCredentials.textContent).toEqual(' badCredentials ');

        emailInputElement.value = 'emailTest2@gmail.com';
        emailInputElement.dispatchEvent(new Event('input'));
        loginFixture.detectChanges();
        expect(loginComponent.errorMessage).toEqual(null);
        spanBadCredentials = loginCompiled.querySelector('form .login-form-container mat-error small')
        expect(spanBadCredentials).toBeNull();
    });
});