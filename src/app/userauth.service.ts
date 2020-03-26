import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserauthService {
userdataobj:object=[];
token:string;
private authstatuslistener=new Subject<boolean>();
private isauthenticated:boolean=false;




  constructor(private http:HttpClient) { }

gettoken(){
  return this.token;
}

  getauthstatuslistener(){
    return this.authstatuslistener.asObservable();
  }
  getuserlogininfo(){
    return this.isauthenticated;
  }

  addAllUsers(useremail:string,userpassword:string){
    this.userdataobj={
      "email":useremail,
      "password":userpassword
    }
    this.http.post(`http://localhost:3200/users/signup`,this.userdataobj).subscribe(responsefromserver=>{
      console.log(responsefromserver);
    });
  }

  loginuser(useremail:string,userpassword:string){
    this.userdataobj={
      "email":useremail,
      "password":userpassword
    }
    this.http.post<{token:string}>('http://localhost:3200/users/login',this.userdataobj).subscribe(responsefromserver=>{
      const token=responsefromserver.token;
      this.token=token;
      if(token){
        this.isauthenticated=true;
        this.authstatuslistener.next(true);
      }
    });
    
  }
  logout(){
    this.token=null;
    this.isauthenticated=false;
    this.authstatuslistener.next(false);
  }
}
