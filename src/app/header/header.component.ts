import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit , OnDestroy{
  private userSub : Subscription;
  isAuthenticated = false ; 
  constructor(private storageDataService: DataStorageService, private authService: AuthService){}
  
  onSaveData(){
    this.storageDataService.storeRecipes();
  }
  onFetchData(){
    this.storageDataService.fetchRecipes().subscribe();
  }
  onLogout() {
    this.authService.logout();
  }
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe( user => {
      console.log('user : ',user);
      this.isAuthenticated = !!user; // its like using a regular expressin !user ? true : false 
      
    } );
  }
ngOnDestroy(): void {
  this.userSub.unsubscribe();
}

}
