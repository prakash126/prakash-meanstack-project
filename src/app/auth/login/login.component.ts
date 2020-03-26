import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import {UserauthService} from '../../userauth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userauth:UserauthService) { }

  ngOnInit() {
  }

  login(loginform:NgForm){
    if(loginform.invalid){
      return;
    }
    this.userauth.loginuser(loginform.value.useremail,loginform.value.userpwd);
    loginform.reset();
  }  

}
