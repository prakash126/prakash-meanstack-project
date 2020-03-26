import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserauthService} from '../userauth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  userislogin=false;
private authlistnersub:Subscription;
  constructor(private userauth:UserauthService) { }

  ngOnInit() {
    this.authlistnersub=this.userauth.getauthstatuslistener().subscribe(islogin=>{
      this.userislogin=islogin;
    });

  }
  OnLogout(){
    this.userauth.logout();
  }
  ngOnDestroy(){
    this.authlistnersub.unsubscribe();
  }

}
