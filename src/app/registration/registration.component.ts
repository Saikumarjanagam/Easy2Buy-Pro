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
  constructor(private userService: UserService, private toastr: ToastrService, private route: Router) { }
  ngOnInit(): void {
  }
  registrationForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    mobile: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
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
