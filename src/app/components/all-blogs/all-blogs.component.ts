import { CurrentLanguageService } from './../../service/current-language.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RecipeService } from 'src/app/service/recipe.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoaderService } from 'src/app/service/loader-service.service';
import { CognitoService } from 'src/app/service/cognito-service.service';
import { Environment } from 'src/app/environment/environment';
import { TranslateService } from '@ngx-translate/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.scss'],
})
export class AllBlogsComponent implements OnInit {
  recipes: Recipe[] = [];
  currentLanguage: string = '';

  constructor(
    public loaderService: LoaderService,
    public recipeService: RecipeService,
    private router: Router,
    private http: HttpClient,
    private cognitoService: CognitoService,
    private cdr: ChangeDetectorRef,
    private currentLanguageService: CurrentLanguageService
  ) {}

  ngOnInit(): void {
    this.currentLanguageService.currentLanguage.subscribe((language) => {
      console.log(language);
      this.currentLanguage = language;
    });
    window.scrollTo(0, 0);
    this.loadRecipes();
    this.loaderService.showLoader();
    this.loadRecipes();
  }

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

  loadRecipes(): void {
    this.recipeService.getRecipes().then(
      (response: any) => {
        this.loaderService.hideLoader();
        this.recipes = response['Items'].Items;
        console.log(this.recipes);
      },
      (error) => {
        this.loaderService.hideLoader();
        console.error('Error loading recipes:', error);
      }
    );
  }

  searchText: string = '';

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
  }

  goToPage(pageName: string, recipeId: string): void {
    this.router.navigate([`${pageName}`, `${recipeId}`]);
  }

  onLikeClick(recipe: any): void {
    //this.loaderService.hideLoader();
    let currentLikeCount = recipe.likeCount;
    let id = recipe.id;

    this.cognitoService.getJwt().then((token: any) => {
      // this.loaderService.hideLoader();
      const header = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      });

      const username = localStorage.getItem(Environment.LOCAL_STORAGE);

      this.http
        .post(
          'https://ggl81ic28i.execute-api.ca-central-1.amazonaws.com/dev/recipe/like',
          { id, currentLikeCount, username },
          { headers: header }
        )
        .subscribe((response: any) => {
          //this.loaderService.hideLoader();
          recipe.likeCount = response.LikeCount;
          recipe.isLiked = !recipe.isLiked;

          // Manually trigger change detection
          this.cdr.detectChanges();
        });
    });
  }

  sortedRecipes() {
    if (this.searchText === '') {
      return this.recipes;
    }

    const exactMatches = [];
    const otherMatches = [];

    for (const recipe of this.recipes) {
      if (
        recipe.recipeTitle['english'].toLowerCase().includes(this.searchText) ||
        recipe.tags.includes(this.searchText)
      ) {
        if (recipe.recipeTitle['english'].toLowerCase() === this.searchText) {
          exactMatches.push(recipe);
        } else {
          otherMatches.push(recipe);
        }
      }
    }

    return exactMatches.concat(otherMatches);
  }
}
