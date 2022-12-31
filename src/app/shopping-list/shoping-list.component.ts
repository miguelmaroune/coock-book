import { Component , OnInit } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css']
})
export class ShopingListComponent implements OnInit {
ingredients:Ingredient[] = [];

      constructor (private shoppingListService : ShoppingListService){}

      ngOnInit(){
        this.ingredients = this.shoppingListService.getIngredients();
        this.shoppingListService.ingredientsChanged
        .subscribe(
           (ingredients:Ingredient[] ) => {
             this.ingredients = ingredients;
           }
        );
      }

//       onIngredientAdded(ingredient : Ingredient){
//           this.ingredients.push(ingredient);
//       }
}
