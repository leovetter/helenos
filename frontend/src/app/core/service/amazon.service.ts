import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { from } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AmazonService {

  s3: any;

  constructor(private domSanitizer: DomSanitizer) { 
    
    AWS.config.update({
      region: "eu-west-3",
        credentials: { accessKeyId: environment.amazonAccesKey, secretAccessKey: environment.amazonSecret }
    });
    this.s3 = new S3({
      apiVersion: "2006-03-01",
      params: { Bucket: "app-helenos" }
    });
  }

//   getObject(url: string) {

//     console.log(url)
//     return from(this.s3.getObject({Bucket: 'app-helenos', Key: url}).promise()).pipe(map((file: any) => {
//       const blob = new Blob(
//         [file.Body],
//         { type: 'image/png' }
//       );
//       return  this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
//     }));
//   }
}
