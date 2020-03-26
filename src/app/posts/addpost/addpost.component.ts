import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {ActivatedRoute,ParamMap} from '@angular/router';


import {PostsService} from '../../posts.service';
import {Post} from '../postmodel';
import {mimeType} from './mime-type.validator';


@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {
form:FormGroup;
mode:string="addPost";
postId:string;
post:Post;
imagepreview:string;
  constructor(private postserv:PostsService,public route:ActivatedRoute) { }

  ngOnInit() {
    this.form=new FormGroup({
        'title':new FormControl(null,{validators:[Validators.required,Validators.minLength(4)]}),
        'image':new FormControl(null,{validators:[Validators.required]}),
        'description':new FormControl(null,{validators:[Validators.required]})
    });
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('postId')){
          this.mode="editpost";
          this.postId=paramMap.get('postId');
          this.postserv.getSinglePost(this.postId).subscribe(response=>{
          this.post={id:response._id,title:response.title,imagePath:response.imagePath,description:response.description},
          this.form.setValue({
            'title':this.post.title,
            'image':this.post.imagePath,
            'description':this.post.description
          });
          });
      }
      else
      {
        this.mode="addPost";
        this.postId=null;
      }
    });
  }
  onImagePicked(event:Event){
      //console.log(event);
      const file=(event.target as HTMLInputElement).files[0];
      this.form.patchValue({image:file});
      this.form.get('image').updateValueAndValidity();
      const reader=new FileReader();
      reader.onload=()=>{
        this.imagepreview=reader.result as string;
      }
      reader.readAsDataURL(file);
  }
  addPost(){
    if(this.form.invalid){
        return;
    }
    if(this.mode=="addPost"){
      this.postserv.addNewPost(this.form.value.title,this.form.value.image,this.form.value.description);
    }
    else{
     // console.log(this.form.value.image);
      this.postserv.updatePost(this.postId,this.form.value.title,this.form.value.image,this.form.value.description);
      
    }
    
    this.form.reset();
  }
  
}
