import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

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

    constructor(private http : HttpClient){}

    signUp(email: string , password:string) {

        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDV_EpnnlRO_NUDHQcozbdbOb2znxkT39c',
        {email: email,
        password: password,
        returnSecureToken: true})
        .pipe(catchError(this.handleError));
    }
    login(email:string , password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDV_EpnnlRO_NUDHQcozbdbOb2znxkT39c',
        {email: email,
            password: password,
            returnSecureToken: true})
            .pipe(catchError(this.handleError));
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