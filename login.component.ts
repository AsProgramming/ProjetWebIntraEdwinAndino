import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import {User} from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  user: User = {
    email: '',
    password: ''
  };
  users: Array<User> = [];
  email: string;
  password: string;
  serverErrorMsg: string;

  constructor(private loginService: LoginService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  loginAttempt() {
    this.submitted = true;
 
    if (this.registerForm.invalid) {
      return;
    }
 
    console.log('email=' +  this.f.email.value);
    console.log('password=' + this.f.password.value);

    console.log(this.user);
    const retUser = {
      email: this.f.email.value,
      password: this.f.password.value,
    };

    this.loginService.verifyUser(retUser)
        .subscribe(res => {
          this.loginService.setToken(res['token']);
          this.router.navigateByUrl('/profile');
        }, err =>{
          console.log(err._body);
          this.serverErrorMsg = JSON.parse(err._body);
          console.log(this.serverErrorMsg);
        });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

}
