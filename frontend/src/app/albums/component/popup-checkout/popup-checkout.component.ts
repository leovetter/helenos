import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticateService } from 'src/app/core/service/authenticate.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare var Stripe;

@Component({
  selector: 'app-popup-checkout',
  templateUrl: './popup-checkout.component.html',
  styleUrls: ['./popup-checkout.component.scss']
})
export class PopupCheckoutComponent implements OnInit {

  @ViewChild('card-element', {static: true}) cardElement: ElementRef;
  card: any;
  stripe: any;
  plans: any;
  
  constructor(private authService: AuthenticateService,
              private http: HttpClient) { }

  ngOnInit() {
    this.stripe = Stripe(environment.stripeKey);
    let elements = this.stripe.elements();

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'});
    let options = { headers: headers };
    this.http.get(environment.apiUrl + '/user/media/' + this.authService.getUserId() + '/all-plans',).subscribe((plans)=>{
      this.plans = plans;
    })

  //   var style = {
  //     base: {
  //       color: "#ffffff",
  //       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
  //       fontSmoothing: "antialiased",
  //       fontSize: "16px",
  //       "::placeholder": {
  //         color: "#ffffff"
  //       }
  //     },
  //     invalid: {
  //       color: "#fa755a",
  //       iconColor: "#fa755a"
  //     }
  //   };

  //   this.card = elements.create("card", { style: style });
  //   this.card.mount("#card-element");

  //   this.card.addEventListener('change', function(event) {
  //     var displayError = document.getElementById('card-errors');
  //     if (event.error) {
  //       displayError.textContent = event.error.message;
  //     } else {
  //       displayError.textContent = '';
  //     }
  //   });
  // }

  // submit() {

  //   this.stripe.createPaymentMethod({
  //     type: 'card',
  //     card: this.card,
  //     billing_details: {
  //       email: 'jenny.rosen@example.com',
  //     },
  //   }).then(this.stripePaymentMethodHandler.bind(this));
  // }

  // stripePaymentMethodHandler(result, email) {
  //   if (result.error) {
  //     // Show error in payment form
  //   } else {
      
  //   let headers = new HttpHeaders({
  //       'Content-Type': 'application/json'});
  //   let options = { headers: headers };

  //   // Otherwise send paymentMethod.id to your server
  //   this.http.post(environment.apiUrl + '/user/media/' + this.authService.getUserId() + '/create-customer',
  //       JSON.stringify({
  //         email: 'jenny.rosen@example.com',
  //         payment_method: result.paymentMethod.id
  //       }), options
  //     ).subscribe((subscription) => {
  //       console.log(subscription);
  //     });
  //   }
  }
}
