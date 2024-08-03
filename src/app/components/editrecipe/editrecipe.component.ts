import { CurrentLanguageService } from './../../service/current-language.service';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/service/loader-service.service';
import { ProfileService } from 'src/app/service/profile-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editrecipe',
  templateUrl: './editrecipe.component.html',
  styleUrls: ['./editrecipe.component.scss'],
})
export class EditrecipeComponent implements OnInit {
  rawTags: string = '';
  recipe: any = {
    recipeId: '',
    recipeTitle: '',
    recipeDesc: '',
    recipeIngridents: '',
    recipeMethod: '',
    recipeCookingTime: '',
    recipeImageUrl: '',
    likeCount: 0,
    recipeComment: [],
    tags: [''],
  };

  currentLanguage: string = '';

  constructor(
    public loaderService: LoaderService,
    public recipeService: RecipeService,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private toaster: ToastrService,
    private router: Router,
    private currentLanguageService: CurrentLanguageService
  ) {}

  ngOnInit() {
    this.currentLanguageService.currentLanguage.subscribe((language) => {
      this.currentLanguage = language;
    });
    this.route.paramMap.subscribe((params) => {
      const recipeId = params.get('id');
      this.getRecipeById(`${recipeId}`);
    });
  }

  getRecipeById(id: string) {
    this.recipeService.getRecipeById(id).then((response: any) => {
      this.loaderService.hideLoader();

      this.recipe.recipeTitle =
        response['Items']['Item'].recipeTitle['english'];
      this.recipe.recipeDesc = response['Items']['Item'].recipeDesc['english'];
      this.recipe.recipeIngridents =
        response['Items']['Item'].recipeIngridents['english'];
      this.recipe.recipeMethod =
        response['Items']['Item'].recipeMethod['english'];
      this.recipe.recipeCookingTime =
        response['Items']['Item'].recipeCookingTime['english'];
      this.recipe.tags = response['Items']['Item'].tags;

      this.rawTags = this.recipe.tags.join(', ');
      console.log(this.recipe);
    });
  }

  updateRecipe() {
    const updatedRecipe = {
      recipeId: this.recipe.id,
      recipeTitle: this.recipe.recipeTitle,
      recipeDesc: this.recipe.recipeDesc,
      recipeIngridents: this.recipe.recipeIngridents,
      recipeMethod: this.recipe.recipeMethod,
      recipeCookingTime: this.recipe.recipeCookingTime,
      tags: this.rawTags.split(',').map((tag) => tag.trim()),
    };
    console.log(updatedRecipe);

    this.profileService
      .updateRecipe(updatedRecipe)
      .then((response: any) => {
        this.loaderService.hideLoader();
        console.log('the response that we want :' + response);
        this.toaster.success(response, 'Success');
        this.router.navigate(['profile']);
      })
      .catch(() => {
        this.toaster.error('Something went wrong', 'Error');
      });
  }
}
