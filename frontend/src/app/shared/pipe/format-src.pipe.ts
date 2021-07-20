import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticateService } from 'src/app/core/service/authenticate.service';

@Pipe({
  name: 'formatSrc'
})
export class FormatSrcPipe implements PipeTransform {

  constructor(private authService: AuthenticateService) { }

  transform(path: string, ...args: any[]): any {

    console.log(args)
    if (path) {
      if (args[1]) {
        return environment.apiUrl + '/media/users/' + this.authService.getUserId() + '/medias/' + path + '?libraryTitle=' + args[0] + '&ownedUserId=' + args[1];
      } else {
        return environment.apiUrl + '/media/users/' + this.authService.getUserId() + '/medias/' + path + '?libraryTitle=' + args[0] + '&ownedUserId=' + this.authService.getUserId();
      }
      
    } else {
      return '../../../../assets/images/question-mark-512.png';
    }
  }

}
