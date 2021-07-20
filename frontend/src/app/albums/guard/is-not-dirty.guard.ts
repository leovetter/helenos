import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { SmartAddAlbumComponent } from '../component/smart-add-album/smart-add-album.component';

@Injectable({
  providedIn: 'root'
})
export class IsNotDirtyGuard implements CanDeactivate<SmartAddAlbumComponent> {

  constructor(private translate: TranslateService) {}

  canDeactivate(component: SmartAddAlbumComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (component.isDirty()) {
        if (this.translate.currentLang === 'en') {
          return confirm(`If you leave the page you'll lose all changes made. Continue ?`);
        } else if (this.translate.currentLang === 'fr') {
          return confirm(`Si vous quittez la page vous perdrez tous les changements effectués. Continuer ?`);
        }
      }
      return true;
  }

}
