import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private storageDataService: DataStorageService){}
  
  onSaveData(){
    this.storageDataService.storeRecipes();
  }
  onFetchData(){
    this.storageDataService.fetchRecipes().subscribe();
  }
}
