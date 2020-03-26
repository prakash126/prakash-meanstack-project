import { Component, OnInit,OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';

import {PostsService} from '../../posts.service';
import {UserauthService} from '../../userauth.service';
import {Post} from '../postmodel';


@Component({
  selector: 'app-postmanagement',
  templateUrl: './postmanagement.component.html',
  styleUrls: ['./postmanagement.component.css']
})
export class PostmanagementComponent implements OnInit,OnDestroy {
posts:Post[]=[];
postsub:Subscription;
userauthsub:Subscription;
userislogin:boolean=false;
  constructor(public postserv:PostsService, public userauth:UserauthService) { }

  ngOnInit() {
    this.postserv.getAllPosts();
    this.postsub=this.postserv.getUpdateAfterNewPostCreated().subscribe((posts)=>{
      //console.log(posts);
      this.posts=posts;
    });
    this.userislogin=this.userauth.getuserlogininfo();
    this.userauthsub=this.userauth.getauthstatuslistener().subscribe(islogin=>{
      this.userislogin=islogin;
    });
  }

  deletepost(postid:string){
    this.postserv.deletethepost(postid);
  }

ngOnDestroy(){
  this.postsub.unsubscribe();
}

}
