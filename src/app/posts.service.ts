import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';

import {Post} from './posts/postmodel';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  posts:Post[]=[];
  private postcreated=new Subject<Post[]>();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient,private router:Router) { }

  getUpdateAfterNewPostCreated(){

   return this.postcreated.asObservable();
  }  

 
  
  getSinglePost(postId:string){
    return this.http.get<{_id:string,title:string,imagePath:string,description:string}>('http://localhost:3200/posts/'+postId);

  }


  deletethepost(postid:string){
    this.http.delete('http://localhost:3200/posts/'+postid).subscribe(()=>{
      const remainingposts=this.posts.filter(post=>post.id!=postid);
      this.posts=remainingposts;
      this.postcreated.next(this.posts);
    });
  }

  getAllPosts(){
    this.http.get<{message:string,posts:any}>('http://localhost:3200/posts').pipe(
      map((postdata)=>{
        return postdata.posts.map(post=>{
            return {
              id:post._id,
              title:post.title,
              imagePath:post.imagePath,
              description:post.description
            }
        })
      }))
      .subscribe(modifiedposts=>{
        //console.log(modifiedposts);
        this.posts=modifiedposts;
        this.postcreated.next([...this.posts]);
      });
  }

  addNewPost(title:string,image:File,description:string){
      const postdata=new FormData();
      postdata.append("title",title);
      postdata.append("image",image,title);
      postdata.append("description",description);
      this.http.post<{message:string,post:Post}>('http://localhost:3200/posts',postdata).subscribe(response=>{
        const post:Post={
          id:response.post.id,
          title:title,
          imagePath:response.post.imagePath,
          description:description
        }
        this.posts.push(post);
        this.postcreated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }
  updatePost(id:string,title:string,image:File|string,description:string){
    //console.log(image);
    /*console.log(id);
    console.log(title);
    console.log(image);
    console.log(description);*/
    let postdata:Post|FormData;
    if(typeof image==='object'){
        postdata=new FormData();
        postdata.append("id",id),
        postdata.append("title",title),
        postdata.append("image",image,title),
        postdata.append("description",description)
       // console.log(postdata);
    }
    else{
      postdata={id:id,title:title,imagePath:image,description:description};
    }
    //console.log('http://localhost:3200/posts/'+id);
    //console.log(postdata);

    this.http.put('http://localhost:3200/posts/'+id,postdata).subscribe((response:any)=>{
      const updatePosts=[...this.posts];
      const oldpostindex=updatePosts.findIndex(allPosts=>allPosts.id==id);
      const post:Post={id:id,title:title,imagePath:response.imagePath,description:description};
      updatePosts[oldpostindex]=post;
      this.posts=updatePosts;
      this.postcreated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }
}
