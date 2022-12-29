import { Component , ElementRef , ViewChild , EventEmitter , Output} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
@ViewChild('nameInput', {static:false}) nameInputRef: ElementRef;
@ViewChild('amountInput', {static:false}) amountInputRef: ElementRef;
@Output() ingredientAdded = new EventEmitter<Ingredient>();

    onAddItem(){
        const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value,this.amountInputRef.nativeElement.value);
        this.ingredientAdded.emit(newIngredient);
    }
}
