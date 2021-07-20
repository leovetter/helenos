import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule, HttpResponse, HttpHeaders } from '@angular/common/http';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/app.module';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../service/authenticate.service';
import { SignUpUser } from '../../model/signUpUser.model';
import { of } from 'rxjs';

describe('SignUpComponent', () => {

    let signUpComponent: SignUpComponent;
    let signUpFixture: ComponentFixture<SignUpComponent>;
    let router: Router;
    const authService = jasmine.createSpyObj('AuthenticateService', ['authenticate', 'signUp', 'storeUserId', 'storeJwtToken']);

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [SignUpComponent],
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
        signUpFixture = TestBed.createComponent(SignUpComponent);
        signUpComponent = signUpFixture.componentInstance;
        signUpFixture.detectChanges();
        router = TestBed.get(Router);
    });


    it('should create', () => {
        expect(signUpComponent).toBeTruthy();
    });

    it('should intialize form', () => {
        const loginCompiled = signUpFixture.nativeElement;
        expect(loginCompiled.querySelector('form .sign-up-form-container h3').textContent).toEqual('userCreation');
        expect(loginCompiled.querySelectorAll('form .sign-up-form-container mat-form-field input')[0].placeholder).toEqual('firstName');
        expect(loginCompiled.querySelectorAll('form .sign-up-form-container mat-form-field input')[1].placeholder).toEqual('lastName');
        expect(loginCompiled.querySelectorAll('form .sign-up-form-container mat-form-field input')[2].placeholder).toEqual('email');
        expect(loginCompiled.querySelectorAll('form .sign-up-form-container div mat-form-field input')[0].placeholder)
            .toEqual('enterPassword');
        expect(loginCompiled.querySelectorAll('form .sign-up-form-container div mat-form-field input')[1].placeholder)
            .toEqual('repeatPassword');
        expect(loginCompiled.querySelectorAll('form .sign-up-form-container mat-error small').length).toEqual(0);
    });

    it('should render error messages', () => {
        const signUpCompiled = signUpFixture.nativeElement;
        const submitButton = signUpCompiled.querySelector('form .sign-up-form-container button')
        submitButton.click();
        signUpFixture.detectChanges();
        expect(signUpCompiled.querySelectorAll('form .sign-up-form-container mat-error small')[0].textContent)
            .toEqual(' firstNameRequired ');
        expect(signUpCompiled.querySelectorAll('form .sign-up-form-container mat-error small')[1].textContent)
            .toEqual(' lastNameRequired ');
        expect(signUpCompiled.querySelectorAll('form .sign-up-form-container mat-error small')[2].textContent)
            .toEqual(' emailRequired ');
        expect(signUpCompiled.querySelectorAll('form .sign-up-form-container div mat-error small')[0].textContent)
            .toEqual(' passwordRequired ');
        expect(signUpCompiled.querySelectorAll('form .sign-up-form-container div mat-error small')[1].textContent)
            .toEqual(' passwordRequired ');
    });

    it('should render error password must match', () => {
        const signUpCompiled = signUpFixture.nativeElement;

        const passwordInputElement = signUpCompiled.querySelector('input[name=\'password\']');
        passwordInputElement.value = '1234';
        passwordInputElement.dispatchEvent(new Event('input'));

        const repeatPasswordInputElement = signUpCompiled.querySelector('input[name=\'repeatPassword\']');
        repeatPasswordInputElement.value = '5678';
        repeatPasswordInputElement.dispatchEvent(new Event('input'));

        const submitButton = signUpCompiled.querySelector('form .sign-up-form-container button')
        submitButton.click();
        signUpFixture.detectChanges();

        expect(signUpCompiled.querySelectorAll('form .sign-up-form-container div mat-error small')[0].textContent)
            .toEqual(' passwordMustMatch ');
    });

    it('should submit form', () => {
        const signUpCompiled = signUpFixture.nativeElement;

        const firstNamelInputElement = signUpCompiled.querySelector('input[name=\'firstName\']');
        firstNamelInputElement.value = 'first name';
        firstNamelInputElement.dispatchEvent(new Event('input'));

        const lastNamelInputElement = signUpCompiled.querySelector('input[name=\'lastName\']');
        lastNamelInputElement.value = 'last name';
        lastNamelInputElement.dispatchEvent(new Event('input'));

        const emailInputElement = signUpCompiled.querySelector('input[name=\'email\']');
        emailInputElement.value = 'email@gmail.com';
        emailInputElement.dispatchEvent(new Event('input'));

        const passwordInputElement = signUpCompiled.querySelector('input[name=\'password\']');
        passwordInputElement.value = 'password';
        passwordInputElement.dispatchEvent(new Event('input'));

        const repeatPasswordInputElement = signUpCompiled.querySelector('input[name=\'repeatPassword\']');
        repeatPasswordInputElement.value = 'password';
        repeatPasswordInputElement.dispatchEvent(new Event('input'));
        signUpFixture.detectChanges();

        const navigateSpy = spyOn(router, 'navigateByUrl');

        const mockUser: SignUpUser = {
            id: 1,
            firstName: 'first name',
            lastName: 'last name',
            email: 'email@gmail.com',
            password: 'password'
        };

        authService.signUp.and.returnValue(of(mockUser));
        authService.authenticate.and.returnValue(of(
            new HttpResponse({
                headers: new HttpHeaders({
                    // tslint:disable-next-line: max-line-length
                    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
                })
            })
        ));

        const submitButton = signUpCompiled.querySelector('form .sign-up-form-container button')
        submitButton.click();

        const user: SignUpUser = {
            id: null,
            firstName: 'first name',
            lastName: 'last name',
            email: 'email@gmail.com',
            password: 'password'
        };

        expect(authService.signUp).toHaveBeenCalledWith(user);
        expect(authService.authenticate).toHaveBeenCalledWith({ email: 'email@gmail.com', password: 'password' });
        expect(navigateSpy).toHaveBeenCalledWith('/libraries');
    });
});
