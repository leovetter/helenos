import { ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, Input, Output } from '@angular/core';
import { Component, NgZone, OnInit } from '@angular/core';
import { MediaService } from 'src/app/core/service/media.service';

@Component({
  selector: 'hel-smart-image-editor',
  template: `
    <hel-image-editor [publicId]="publicId"
                      (saveImage)=saveImage()
                      (hideEditor)=hideEditor()>
    </hel-image-editor>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartImageEditorComponent implements OnInit {

  @Input() urlMedia:  string; 
  @Input() pathMedia:  string; 
  @Input() nameMedia:  string; 
  @Input() titleAlbum:  string; 
  @Output() resetShowImageEditor = new EventEmitter<null>();
  @Output() goMediaComments = new EventEmitter<null>();
  
  publicId: string;

  constructor(private mediaService: MediaService,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {

    this.mediaService.loadMediaBlob(this.urlMedia).subscribe(mediaBlob => {

      var url = `https://api.cloudinary.com/v1_1/helenos/upload`;
      var xhr = new XMLHttpRequest();
      var fd = new FormData();
      xhr.open('POST', url, true);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

      fd.append('upload_preset', "gsordwjd");
      fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
      fd.append('file', mediaBlob);

      xhr.onreadystatechange = () => {
          if (xhr.readyState == XMLHttpRequest.DONE) {
            const response = JSON.parse(xhr.responseText)
            this.publicId = response.secure_url.split('/').slice(-3).join('/');
            console.log(this.publicId)
            this.cd.detectChanges();
          }
      }

      xhr.send(fd);      
    });
  }

  saveImage() {

    const imageBox = document.querySelector('.image-box');
    const image = imageBox.getElementsByTagName('img')[0];
    fetch(image.src)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], this.pathMedia, blob)
        console.log(file)
        const fdMedias = new FormData();
        fdMedias.append('media', file, this.nameMedia);

        this.mediaService.uploadMedias(fdMedias, this.titleAlbum).subscribe(() => {
          this.resetShowImageEditor.emit();
        });
    })
  }

  hideEditor() {
    this.goMediaComments.emit();
  }

}
