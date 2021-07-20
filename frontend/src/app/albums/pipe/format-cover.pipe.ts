import { Pipe, PipeTransform } from '@angular/core';
import { AuthenticateService } from 'src/app/core/service/authenticate.service';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'formatCover'
})
export class FormatCoverPipe implements PipeTransform {

  constructor(private authService: AuthenticateService) {}
  
  transform(path: string, ...args: any[]): any {
    
    return environment.apiUrl + '/media/users/' + this.authService.getUserId() + '/cover/' + path + '?libraryTitle=' + args[0] + '&ownedUserId=' + args[1]
  }

}
