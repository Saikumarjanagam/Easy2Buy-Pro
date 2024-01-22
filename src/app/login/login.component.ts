import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/models/user.model';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _userService: UserService, private toastr: ToastrService, private route: Router, private _cartService: ShoppingCartService) { }
  email: string;
  password: string;

  logInForm = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  })
  get Email() {
    return this.logInForm.get('email')
  }
  get Password() {
    return this.logInForm.get('password')
  }

  get BuyProductId() {
    return localStorage.getItem('buyProductId');
  }

  login() {
    this._userService.validate(this.email, this.password)
      .subscribe({
        next: this.handleSuccess.bind(this),
        error: this.handleError.bind(this),
      });
  }
  handleSuccess(response: any) {
    let users = response.map((data: any) => {
      return {
        id: data.payload.doc.id,
        ...(data.payload.doc.data() as User)
      }
    });

    if (users && users.length > 0) {
      let userDetail = users.shift();

      localStorage.setItem('firstName', userDetail!.firstName);
      localStorage.setItem('loggedInUserId', userDetail!.id);
      localStorage.setItem('isAdmin', userDetail!.isAdmin ? 'true' : 'false');

      this.toastr.success('Login successful...!');
      this.route.navigate(['/home']);
      if (this._cartService.buyNowCheck) {
        this.route.navigate(['/buy-item', this.BuyProductId])
      }
      else if (this._cartService.checkOut) {
        this.route.navigate(['/shipping-order'])
      }
      else {
        this.route.navigate(['/home']);
      }

    }

    else {
      this.toastr.error('In-valid credentials...!');
    }
  }
  handleError(response: any) {
    this.toastr.error('In-valid credentials...!');
  }

}
