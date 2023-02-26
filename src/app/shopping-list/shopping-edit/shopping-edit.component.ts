import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false ;
  editedItemIndex: number;
  editedItem: Ingredient;
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  constructor(private slService: ShoppingListService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    //whenever the onEditItem from shopping list component we are triggering an event by calling startedEditing.next and we capture it here because we subscribed to this subject
   this.subscription =  this.slService.startedEditing.subscribe(
    (index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.slService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    }
   );
  }
//using the angular form which i added in the html file #f="ngForm"
  onAddItem(form:NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex,newIngredient);
    }else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }
  onClear(){
    this.editMode = false;
    this.slForm.reset();
  }
  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

}
