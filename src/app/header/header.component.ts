import {Component , EventEmitter , Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl:'./header.component.html'
})
export class HeaderComponent {
//@Output() to enable us to listen to this event from the parent  component
  @Output() featureSelected = new EventEmitter<string>();


   onSelect(selected: string){
     this.featureSelected.emit(selected);
   }
}
