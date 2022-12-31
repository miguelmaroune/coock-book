import {Ingredient} from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
// added in order to get the latest version of the array when adding an ingredient ( we are sending a copy of the array with splice so when we add into it the new
// array is not found in the other component but the old copy of it  )
ingredientsChanged = new EventEmitter<Ingredient [] >()  ;
private ingredients:Ingredient[] = [
  new Ingredient('Apples',5),
  new Ingredient('Tomatoes',10)];


  getIngredients(){
  return this.ingredients.slice();
  }

  addIngredients(ingredient:Ingredient){
  this.ingredients.push(ingredient);
  this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredientsLst(ingredient:Ingredient[]){
      this.ingredients.push( ...ingredient );
      this.ingredientsChanged.emit(this.ingredients.slice());
  }

}
