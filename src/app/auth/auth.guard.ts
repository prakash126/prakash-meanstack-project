import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot,Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {UserauthService} from '../userauth.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private userauth:UserauthService,private router:Router){}

    canActivate(route:ActivatedRouteSnapshot,sate:RouterStateSnapshot):boolean|Observable<boolean>|Promise<boolean>{
        const userlogin=this.userauth.getuserlogininfo();
        if(!userlogin){
            this.router.navigate(['/login']);
        }
        else{
            return userlogin;
        }
    }
}
