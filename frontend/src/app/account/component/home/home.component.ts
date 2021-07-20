import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { faPhotoVideo, faUsers, faCloudUploadAlt, faLaptop, faMobileAlt, faTabletAlt } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { NavbarService } from 'src/app/core/service/navbar.service';
import { Animations } from './home.animations';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'acc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    Animations.moveInLeft,
    Animations.moveInRight,
    Animations.scaleOut,
  ]
})
export class HomeComponent implements OnInit {

  // Boolean used to trigger animations on the differente element of the home page
  displayThreeImages = false;
  displayCreateLibrary = false;
  displayVisualizeLibrary = false;
  displayAddSharedUsers = false;
  // Icons from font awesome
  faPhotoVideo = faPhotoVideo;
  faUsers = faUsers;
  faCloudUploadAlt = faCloudUploadAlt;
  faLaptop = faLaptop;
  faMobileAlt = faMobileAlt;
  faTabletAlt = faTabletAlt;
  // The year displayed on the footer
  year: number;
  // Boolean to know if we have to show the langues menu
  showLangue = false;

  constructor(private navbarService: NavbarService) { }

  ngOnInit(): void {
    // Init the date to now
    this.year = new Date().getFullYear();
    this.navbarService.nextSmallNavbar(false)
  }
}
