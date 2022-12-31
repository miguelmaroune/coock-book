import { EventEmitter , Injectable } from '@angular/core';
import {Recipe} from './recipes.model';
import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
@Injectable()
export class RecipeService {

 recipeSelected = new EventEmitter<Recipe>();
private recipes:Recipe[]  = [
 new Recipe('Tasty chicken',
            'Super Tasty CHICKEN !!! ',
            'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
            [ new Ingredient ('CHICKEN' , 2) ,
              new Ingredient ('French Fries' , 20)]),
 new Recipe('chicken Tikka',
            'CHICKEN TIKKA RECIPE ',
            'https://www.whiskaffair.com/wp-content/uploads/2020/06/Chicken-Tikka-2-3.jpg',
                        [ new Ingredient ('CHICKEN TIKAA ' , 2) ,
                          new Ingredient ('French Fries' , 20)])
  ];
    constructor(private slService : ShoppingListService){}
    getRecipes() {
    // if we dont add slice the caller of getRecipes will have control over the recipes array by reference and will be able to edit it
        return this.recipes.slice();
    }
    addIngredientsToShoppingLst(ingredients : Ingredient []  ){
       this.slService.addIngredientsLst(ingredients);
    }
}
