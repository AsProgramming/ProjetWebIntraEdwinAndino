import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { DataService } from '../data.service';
import {User} from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.styl'],
  providers:[LoginService, DataService]
})
export class ProfileComponent implements OnInit {
  
  users: User[];
  user: User;
  email: string;
  password: string;
  role: string;
  message: string;

  constructor(private loginService: LoginService,
              private data: DataService) { }

  ngOnInit() {
      this.loginService.getUsers()
      .subscribe(users => this.users = users);
      this.data.currentMessage.subscribe(message => this.message = message);
      console.log(this.message);
  }

}
