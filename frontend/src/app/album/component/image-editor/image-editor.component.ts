import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { faTimes, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'hel-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ImageEditorComponent implements OnInit, AfterViewInit {

  img: HTMLElement;
  cropBox: HTMLElement;

  originalImage: HTMLElement;
  transformationForm: FormGroup;

  @Input() publicId: string;
  @Output() saveImage = new EventEmitter<null>();
  @Output() hideEditor = new EventEmitter<null>();

  faTimes = faTimes;
  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;

  showBlurMenu = false;
  shoColorMenu = false;
  cropMode = false;

  @ViewChildren('image') imageEl: QueryList<any>;; 

  colorEffects = ['', 'hue', 'red', 'green', 'blue', 'negate', 'brightness', 'auto_brightness', 'brightness_hsb', 
                  'sepia', 'grayscale', 'blackwhite', 'saturation', 'colorize', 'assist_colorblind', 'simulate_colorblind',
                   'replace_color', 'recolor', 'tint', 'contrast', 'auto_contrast', 'vibrance', 'auto_color', 'theme']
  
  // faceDetect: any;

  blurEffects = [
    '', 'blur', 'sharpen', 'pixelate', 'vignette'
  ]

  constructor(private cloudinary: Cloudinary,
              private fb: FormBuilder) { }

  ngOnInit() {

    this.originalImage = document.querySelector('.image');
    this.transformationForm = this.buildTransformationForm();

    this.transformationForm.get('blur').get('selectedBlurEffects').valueChanges.subscribe(value => {
      if(value !== '') this.transformationForm.get('color').get('selectedColorEffects').setValue('')
    });

    this.transformationForm.get('color').get('selectedColorEffects').valueChanges.subscribe(value => {
      if(value !== '') this.transformationForm.get('blur').get('selectedBlurEffects').setValue('')
    });

    this.transformationForm.get('crop').valueChanges.subscribe(value => {
      if(value) {
        this.cropMode = true
        // this.img = document.querySelector('.image') as HTMLElement;
        // console.log(this.img)
        // console.log(this.img.getBoundingClientRect().width)
        // console.log(this.img.getBoundingClientRect().height)
        // this.cropBox = document.querySelector('.crop-mode') as HTMLElement;
        // console.log(this.cropBox)
        // this.cropBox.style.width = `${this.img.getBoundingClientRect().width}px`;
        // this.cropBox.style.height = `${this.img.getBoundingClientRect().height}px`;
      }
      if(!value) this.cropMode = false
    });
  }

  ngAfterViewInit(): void {

    // console.log(this.imageEl)
    // console.log(this.imageEl.toArray())
    // console.log(this.imageEl.toArray()[0])
    // console.log(this.imageEl.toArray()[0].nativeElement)
    // // this.img = document.querySelector('.image') as HTMLElement;

    // this.imageEl.toArray()[0].nativeElement.addEventListener('click', (event) => {
    //   console.log('click')
    //   console.log(event)
    // })
    
    // setTimeout(() => {

    //   const img = document.querySelector('.image');
    //   const imgDims = img.getBoundingClientRect();
    //   this.imgWidth = imgDims.width;
    //   this.imgHeight = imgDims.height;

    // }, 1000);
  }

  onClick() {
    console.log('click')
  }

  buildTransformationForm() {
    return this.fb.group({
      crop: [ false ], 
      color: this.fb.group({
        selectedColorEffects: [''],
        level: [ 100 ],
        blend: [ 100 ]
      }),
      blur: this.fb.group({
        selectedBlurEffects: [''],
        blurStrength: [ 100 ],
        sharpenStrength: [ 100 ],
        pixelateSquare: [''],
        pixelateDefault: [ true ],
        vignetteLength: [ 20 ],
      })
    })
  }

  transform() {

    let rep = null;
    if(this.transformationForm.get('color').get('selectedColorEffects').value) {

      let param = null;
      if(this.applyColorBlend()) param = this.transformationForm.get('color').get('blend').value;
      if(this.applyColorLevel()) param = this.transformationForm.get('color').get('level').value;

      if (param)  rep = this.cloudinary.imageTag(this.publicId, {effect: `${this.transformationForm.get('color').get('selectedColorEffects').value}:${param}`}).toHtml();
      if (!param)  rep = this.cloudinary.imageTag(this.publicId, {effect: this.transformationForm.get('color').get('selectedColorEffects').value}).toHtml();
    }

    // if(this.faceDetect) rep = this.cloudinary.imageTag(this.publicId, {gravity: "face", crop: "crop", radius: "max"}).toHtml();

    if(this.transformationForm.get('blur').get('selectedBlurEffects').value) {

      let param = null;
      if(this.transformationForm.get('blur').get('selectedBlurEffects').value === 'blur') param = this.transformationForm.get('blur').get('blurStrength').value;
      if(this.transformationForm.get('blur').get('selectedBlurEffects').value === 'sharpen') param = this.transformationForm.get('blur').get('sharpenStrength').value;
      if(this.transformationForm.get('blur').get('selectedBlurEffects').value === 'pixelate' && this.transformationForm.get('blur').get('pixelateDefault').value) param = '';
      if(this.transformationForm.get('blur').get('selectedBlurEffects').value === 'pixelate' && !this.transformationForm.get('blur').get('pixelateDefault').value) param = this.transformationForm.get('blur').get('pixelateSquare').value;
      if(this.transformationForm.get('blur').get('selectedBlurEffects').value === 'vignette') param = this.transformationForm.get('blur').get('vignetteLength').value;

      rep = this.cloudinary.imageTag(this.publicId, {effect: `${this.transformationForm.get('blur').get('selectedBlurEffects').value}:${param}`}).toHtml();
    }

    const imageBox = document.querySelector('.image-box');
    const image = imageBox.getElementsByTagName('img')[0];
    imageBox.removeChild(image);
    imageBox.innerHTML = rep;
    
  }

  save() {

    this.saveImage.emit();
  }

  closeEditor() {
    this.hideEditor.emit();
  }

  restore() {

    const imageBox = document.querySelector('.image-box');
    const image = imageBox.getElementsByTagName('img')[0];
    imageBox.removeChild(image);
    console.log(this.originalImage)
    imageBox.appendChild(this.originalImage);
  }
  
  applyColorLevel() {

    return this.transformationForm.get('color').get('selectedColorEffects').value === 'hue' ||
           this.transformationForm.get('color').get('selectedColorEffects').value === 'red' ||
           this.transformationForm.get('color').get('selectedColorEffects').value === 'green' ||
           this.transformationForm.get('color').get('selectedColorEffects').value === 'blue' ||
           this.transformationForm.get('color').get('selectedColorEffects').value === 'brightness' ||
           this.transformationForm.get('color').get('selectedColorEffects').value === 'brightness_hsb' ||
           this.transformationForm.get('color').get('selectedColorEffects').value === 'sepia' ||
           this.transformationForm.get('color').get('selectedColorEffects').value === ' saturation' ||
           this.transformationForm.get('color').get('selectedColorEffects').value === 'colorize' ||
           this.transformationForm.get('color').get('selectedColorEffects').value === 'contrast';
  }

  applyColorBlend() {
    
    return this.transformationForm.get('color').get('selectedColorEffects').value === 'auto_brightness' ||
           this.transformationForm.get('color').get('selectedColorEffects').value === 'auto_contrast' ||
           this.transformationForm.get('color').get('selectedColorEffects').value === 'auto_color';
  }

}
