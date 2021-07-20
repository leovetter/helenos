import { Component, OnInit, Inject } from '@angular/core';
import { AuthenticateService } from 'src/app/core/service/authenticate.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration-confirm',
  templateUrl: './registration-confirm.component.html',
  styleUrls: ['./registration-confirm.component.scss']
})
export class RegistrationConfirmComponent implements OnInit {

  constructor(private authService: AuthenticateService,
              private toastr: ToastrService,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.authService.registrationConfirm(params['token']).subscribe((message: string) => {
        this.toastr.info(message);
      });
    });
  }

}
