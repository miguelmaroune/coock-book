import { Component  , OnInit } from '@angular/core';
import {Recipe} from '../recipes.model'
import {RecipeService} from '../recipe.service'

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit{
//  @Output() recipeWasSelected = new EventEmitter<Recipe>();
recipes:Recipe[];

    constructor (private recipeService : RecipeService){
    }

//    onRecipeSelected(recipe: Recipe){
//       this.recipeWasSelected.emit(recipe);
//    }

   ngOnInit() {
   this.recipes = this.recipeService.getRecipes();
   }
}
