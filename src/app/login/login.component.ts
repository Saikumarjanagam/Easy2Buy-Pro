import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _userService: UserService, private toastr: ToastrService, private route: Router) { }
  email: string;
  password: string;

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

      this.toastr.success('Login successful..!');
      this.route.navigate(['/home']);
    } else {
      this.toastr.error('In-valid credentials..!');
    }
  }
  handleError(response: any) {
    this.toastr.error('In-valid credentials..!');
  }

}
