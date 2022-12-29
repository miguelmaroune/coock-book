import { Component  , Output , EventEmitter } from '@angular/core';
import {Recipe} from '../recipes.model'

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent {
 @Output() recipeWasSelected = new EventEmitter<Recipe>();


recipes:Recipe[]  = [
 new Recipe('A test Recipe','This is simply a test ','https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg'),
 new Recipe('chicken Tikka','CHICKEN TIKKA RECIPE ','https://www.whiskaffair.com/wp-content/uploads/2020/06/Chicken-Tikka-2-3.jpg')
  ];

   onRecipeSelected(recipe: Recipe){
      this.recipeWasSelected.emit(recipe);
   }
}
