import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs-compat";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    constructor(private authService: AuthService){}
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form : NgForm) {
        if(!form.valid){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        let authObs: Observable<AuthResponseData>;
        this.isLoading = true;
        if(this.isLoginMode){
            authObs = this.authService.login(email,password);
        }else {
            authObs = this.authService.signUp(email,password);
        }
        authObs.subscribe( (response) => {
            console.log('Response From FireBase : ',response);
            this.isLoading = false;
        }, errorMessage => {
            this.error = errorMessage;
            console.log('Error in Sign UP ',errorMessage);
            this.isLoading = false;
        });
        console.log(form.value);
        form.reset();
    }

}