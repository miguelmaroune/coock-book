import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take , exhaustMap } from "rxjs/operators";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService){}
// this interceptor will get the user and unsubscribed using the take method , then
// with the exhaustMap we then can use the observable we have and access the httpRequest and modify it by adding the auth user token 
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1),
            exhaustMap( user => {
                if (! user){
                    return next.handle(req);
                }
                const modifiedReq = req.clone({params : new HttpParams().set('auth',user.token)});
                return next.handle(modifiedReq);
            })
        );
    }
}