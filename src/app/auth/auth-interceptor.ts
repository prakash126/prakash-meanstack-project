import {HttpInterceptor,HttpRequest,HttpHandler} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserauthService} from '../userauth.service';

@Injectable()
export class AuthInterceptors implements HttpInterceptor{

    constructor(private userauth:UserauthService){}
    intercept(req:HttpRequest<any>,next:HttpHandler){
        const authtoken=this.userauth.gettoken();
        const authRequest= req.clone({
            headers:req.headers.set('authorization','bearer '+authtoken)
        });
        return next.handle(authRequest);
    }
}