import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../util/validator';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import {User} from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl'],
  providers:[LoginService]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  user: User = {
    email: '',
    password: ''
  };
  users: Array<User> = [];
  email: string;
  password: string;

  constructor(private loginService: LoginService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  registerUser() {
    this.submitted = true;
 
    if (this.registerForm.invalid) {
      return;
    }

    console.log('email=' +  this.f.email.value);
    console.log('password=' + this.f.password.value);

    const registeringUser = {
      email: this.f.email.value,
      password: this.f.password.value,
      role: 'user'
    };
    console.log(registeringUser);
/*
    this.loginService.addUser(registeringUser)
        .subscribe(res => {
          this.router.navigateByUrl('/');
          //  this.loginService.setToken(res['token']);
          //  this.router.navigateByUrl('/profile');
          }, err =>{
            console.log(err._body);
          //  this.serverErrorMsg = JSON.parse(err._body);
          //  console.log(this.serverErrorMsg);
          });*/
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }

  get f() {
    return this.registerForm.controls;
  }

}
