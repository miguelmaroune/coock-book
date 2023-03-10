import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";


@Injectable()
export class DataStorageService {

    constructor(private http: HttpClient,
                private recipeService: RecipeService,
                private authService : AuthService){ }

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-recipe-book-d6975-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(
            (response) => { console.log(response);}
        );
    }
    fetchRecipes(){
            return this.http.get<Recipe[]>('https://ng-recipe-book-d6975-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
            map( recipes => {// pipe in order to manipulate the response the map here is to access the List that was returned 
            return recipes.map( recipe => {
                 // map here is a typeScript function used to map the recipes to whatever we want to change inside the anonymous function 
                return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                };
                         });
                            }),tap( recipes => {// we can use the tap operator to call the recipe Service 
                this.recipeService.setRecipes(recipes);
              })
           );

        // we need to add the return type <Recipe[]> in order for type script to understand that the http response is of type Recipe[]
        
    }
}