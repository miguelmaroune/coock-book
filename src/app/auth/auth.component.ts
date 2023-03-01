import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs-compat";
import { AlertComponent } from "../shared/alert/alert.component.alert";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    constructor(private authService: AuthService,
                private router : Router,
                private componentFactoryResolver : ComponentFactoryResolver){}
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceHolderDirective) alertHost : PlaceHolderDirective;
    private closeSub : Subscription;

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
            this.router.navigate(['/recipes']);
        }, errorMessage => {
            this.error = errorMessage;
            // this.showErrorAlert(errorMessage);
            console.log('Error in Sign UP ',errorMessage);
            this.isLoading = false;
        });
        console.log(form.value);
        form.reset();
    }
    onHandleError() {
        this.error = null;
    }
    ngOnDestroy(): void {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }
    //dynamic create of Component
    private showErrorAlert(message: string) {
        const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        const compRef = hostViewContainerRef.createComponent(alertCompFactory);
        compRef.instance.message = this.error;
        this.closeSub = compRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }

}