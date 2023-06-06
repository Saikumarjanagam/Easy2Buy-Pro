import { Expression } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user = new User();
  confirmPass: string;
  emailex: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  passwordEx: string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$'
  constructor(private userService: UserService, private toastr: ToastrService, private route: Router) { }
  ngOnInit(): void {
  }
  registrationForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    mobile: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.pattern(this.emailex)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(this.passwordEx)]),
    confirmpassword: new FormControl(null, Validators.required)
  })
  get Name() {
    return this.registrationForm.get('name')
  }
  get Mobile() {
    return this.registrationForm.get('mobile')
  }
  get Email() {
    return this.registrationForm.get('email')
  }
  get Pass() {
    return this.registrationForm.get('password')
  }
  get confirmPassword() {
    return this.registrationForm.get('confirmpassword')
  }
  saveUser() {
    this.userService.register(this.user).then((response) => {
      this.toastr.success('Registration successfully');
      this.route.navigate(['/login']);
    })
  }
}
