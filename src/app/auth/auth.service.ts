import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

 export interface AuthResponseData {
    kind: string;
    email: string;
    idToken:string;	  //A Firebase Auth ID token generated from the provided custom token.
    refreshToken:string;	//A Firebase Auth refresh token generated from the provided custom token.
    expiresIn:	string;
    locaId: string;
    registered? : boolean;
 }

@Injectable({providedIn: 'root'})
export class AuthService {
// we use BehaviorSubject so even if we were not subscribed to the Subject when the event happened we can still retrieve it later .
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http : HttpClient,
                private router: Router){}

    signUp(email: string , password:string) {

        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDV_EpnnlRO_NUDHQcozbdbOb2znxkT39c',
        {email: email,
        password: password,
        returnSecureToken: true})
        .pipe(catchError(this.handleError) , tap(resData => {
            this.handleAuthntication(resData.email,resData.locaId,resData.idToken,+resData.expiresIn);                          
        }));
    }

    login(email:string , password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDV_EpnnlRO_NUDHQcozbdbOb2znxkT39c',
        {email: email,
            password: password,
            returnSecureToken: true})
            .pipe(catchError(this.handleError) , tap(resData => {
                this.handleAuthntication(resData.email,resData.locaId,resData.idToken,+resData.expiresIn);                          
            }));
    }
    autoLogin(){
        const userData: {
            email: string,
            id:string,
            _token:string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const loadedUSer = new User(userData.email,userData.id,userData._token, new Date(userData._tokenExpirationDate));
        if(loadedUSer.token){
            this.user.next(loadedUSer);
            const exporationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(exporationDuration);
        }
    }
    autoLogout(expirationDuration:number){
       this.tokenExpirationTimer =  setTimeout( () => {
            this.logout();
        },expirationDuration);
    }
    logout () {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    private handleAuthntication (email: string ,userId : string ,  token: string , expiresIn : number){
        const expirationDate = new Date(new Date().getTime() +  +expiresIn * 1000);
        const user = new User(
                              email,
                              userId,
                              token,
                              expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000 );
        localStorage.setItem('userData',JSON.stringify(user));
    }
    private handleError(errorResp : HttpErrorResponse){
        
        let errorMessage = 'An Unknown error occured!';
        if(!errorResp.error || !errorResp.error.error){
            return throwError(errorMessage);
        }
        switch(errorResp.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = 'Email Exists ! ';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This Email does not exist.'
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This Password is not correct.'
                break;    
        }
        return throwError(errorMessage);
   
    }
}