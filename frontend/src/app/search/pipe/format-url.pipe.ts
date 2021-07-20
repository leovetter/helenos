import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'formatUrl'
})
export class FormatUrlPipe implements PipeTransform {

  transform(path: string, ...args: any[]): any {
    if(args[0] === 'profil')
      return environment.apiUrl + '/media/users/' + args[0] + '/medias/' + path + '?libraryTitle=profil&ownedUserId=' + args[0];
    else if (args[0] === 'cover') {
      return environment.apiUrl + '/media/users/' + args[1] + '/medias/' + path + '?libraryTitle=cover&ownedUserId=' + args[1];
    }
  }

}
