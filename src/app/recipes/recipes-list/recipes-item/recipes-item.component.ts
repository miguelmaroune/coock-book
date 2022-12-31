import { Component , Input  } from '@angular/core';
import { Recipe } from '../../recipes.model';
import {RecipeService} from '../../recipe.service'

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent {
@Input() recipe:Recipe;
//@Output() recipeSelected = new EventEmitter<void>();

      constructor (private recipeService : RecipeService){
      }
      onSelected(){
      this.recipeService.recipeSelected.emit(this.recipe);
      //this.recipeSelected.emit();
      }

}
