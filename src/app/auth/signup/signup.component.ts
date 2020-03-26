import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import {UserauthService} from '../../userauth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userauth:UserauthService) { }

  ngOnInit() {
  }
  addUser(usersform:NgForm){
      if(usersform.invalid){
          return;
      }
      this.userauth.addAllUsers(usersform.value.useremail,usersform.value.userpwd);
      usersform.resetForm();
  }
}
