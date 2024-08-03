import { CurrentLanguageService } from './../../service/current-language.service';

import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/service/recipe.service';
import { Router } from '@angular/router'; // Import ActivatedRoute
import { LoaderService } from 'src/app/service/loader-service.service';
import { ProfileService } from 'src/app/service/profile-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-own-recipe',
  templateUrl: './own-recipe.component.html',
  styleUrls: ['./own-recipe.component.scss'],
})
export class OwnRecipeComponent implements OnInit {
  currentLanguage: string = '';
  constructor(
    private profileService: ProfileService,
    public loaderService: LoaderService,
    public recipeService: RecipeService,
    private router: Router,
    private toasterService: ToastrService,
    private currentLanguageService: CurrentLanguageService
  ) {}

  recipes: any[] = [];
  isRecipeCreated: boolean = false;

  truncateTitle(title: string): string {
    const words = title.split(' ');
    if (words.length > 2) {
      return words.slice(0, 2).join(' ') + '...';
    }
    return title;
  }

  truncateDescription(description: string): string {
    const letters = description.length;
    if (letters > 100) {
      return description.slice(0, 100) + '...';
    }
    return description;
  }

  getTitle(recipeTitle: any) {
    return recipeTitle[`${this.currentLanguage}`];
  }

  getDescription(recipeDescription: any) {
    return recipeDescription[`${this.currentLanguage}`];
  }

  ngOnInit() {
    this.currentLanguageService.currentLanguage.subscribe((language) => {
      this.currentLanguage = language;
    });

    this.loaderService.showLoader();
    this.profileService
      .getUserRecipes()
      .then((response) => {
        this.loaderService.hideLoader();
        if (response.length > 0) {
          this.isRecipeCreated = true;
        }
        for (let recipe of response) {
          this.recipes.push(recipe.Item);
        }
      })
      .catch((error: any) => {
        this.loaderService.hideLoader();
        console.error('Error fetching user recipes:', error);
      });
  }
  deleteRecipe(recipeId: any) {
    // this.loaderService.showLoader();
    this.profileService
      .deleteUserRecipe(recipeId)
      .then(() => {
        // this.loaderService.hideLoader();
        this.toasterService.success('Recipe Deleted Successfully', 'Success');
        window.location.reload();
      })
      .catch(() => {
        this.toasterService.error('Error', 'ERROR');
        // this.loaderService.hideLoader();
      });
  }

  goToPage(pageName: string, recipeId: string): void {
    this.router.navigate([`${pageName}`, `${recipeId}`]);
  }

  navigateToCreate() {
    this.router.navigate(['create']);
  }
}
