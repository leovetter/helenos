import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { AuthenticateService } from './account/service/authenticate.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {

  let appComponent: AppComponent;
  let appFixture: ComponentFixture<AppComponent>;
  let authService: AuthenticateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatMenuModule,
        MatButtonModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [ HttpClient ]
            }
        })
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        AuthenticateService,
      ],
    }).compileComponents();

    authService = TestBed.get(AuthenticateService);
    appFixture = TestBed.createComponent(AppComponent);
    appComponent = appFixture.componentInstance;
    appFixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

  it('should have as title media', () => {
    expect(appComponent.title).toEqual('media');
  });

  it('should render footer',  fakeAsync(() => {
    const appCompiled = appFixture.nativeElement;
    const year = new Date().getFullYear();
    expect(appCompiled.querySelector('.footer mat-toolbar-row small').textContent).toContain('Copyright © ' + year + ' Léo Vetter');
    expect(appCompiled.querySelector('.footer mat-toolbar-row small a').textContent).toContain('vetter.leo@gmail.com');

    appFixture.whenStable().then(() => {
      appFixture.detectChanges();
      expect(appCompiled.querySelector('.footer mat-toolbar-row div button').textContent).toContain('Langue');
    });
  }));

  it('should render header when logged in', async(() => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    const appCompiled = appFixture.nativeElement;

    appFixture.whenStable().then(() => {
      appFixture.detectChanges();
      expect(appCompiled.querySelectorAll('.header button')[0].textContent).toContain('Mes libraries');
      expect(appCompiled.querySelectorAll('.header button')[1].textContent).toContain('Compte');
      expect(appCompiled.querySelectorAll('.header button')[2].textContent).toContain('Déconnexion');
    });
  }));

  it('should render header when not logged in', async(() => {
    const appCompiled = appFixture.nativeElement;

    appFixture.whenStable().then(() => {
      appFixture.detectChanges();
      expect(appCompiled.querySelectorAll('.header button')[0].textContent).toContain('Connexion');
      expect(appCompiled.querySelectorAll('.header button')[1].textContent).toContain('S\'enregistrer');
    });
  }));

  it('should render header when translated in english', async(() => {
    appComponent.switchLangue('en');
    const appCompiled = appFixture.nativeElement;

    appFixture.whenStable().then(() => {
      appFixture.detectChanges();
      expect(appCompiled.querySelectorAll('.header button')[0].textContent).toContain('Login');
      expect(appCompiled.querySelectorAll('.header button')[1].textContent).toContain('Sign Up');
    });
  }));
});

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
