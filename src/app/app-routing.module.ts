import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {AddpostComponent} from './posts/addpost/addpost.component';
import {PostmanagementComponent} from './posts/postmanagement/postmanagement.component';

import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  {path:'',component:PostmanagementComponent}, 
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'addpost',component:AddpostComponent,canActivate:[AuthGuard]},
  {path:'editpost/:postId',component:AddpostComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
