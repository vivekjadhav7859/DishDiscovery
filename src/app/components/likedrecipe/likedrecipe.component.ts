import { CurrentLanguageService } from './../../service/current-language.service';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/service/profile-service.service';
import { CognitoService } from 'src/app/service/cognito-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Environment } from 'src/app/environment/environment';
import { LoaderService } from 'src/app/service/loader-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-likedrecipe',
  templateUrl: './likedrecipe.component.html',
  styleUrls: ['./likedrecipe.component.scss'],
})
export class LikedrecipeComponent implements OnInit {
  recipes: any[] = [];
  isRecipeLiked: boolean = false;
  currentLanguage: string = '';

  constructor(
    private profileService: ProfileService,
    private cognitoService: CognitoService,
    private router: Router,
    public loaderService: LoaderService,
    private http: HttpClient,
    private location: Location,
    private currentLanguageService: CurrentLanguageService
  ) {}

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

  onLikeClick(recipe: any): void {
    let currentLikeCount = recipe.likeCount;
    let id = recipe.id;

    this.cognitoService.getJwt().then((token: any) => {
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
          // console.log('API Response:', response.Id);
          this.loaderService.hideLoader();
          recipe.likeCount = response.LikeCount;
          window.location.reload();
        });
    });
  }
  getTitle(recipeTitle: any) {
    return recipeTitle[`${this.currentLanguage}`];
  }

  getDescription(recipeDescription: any) {
    return recipeDescription[`${this.currentLanguage}`];
  }

  goToPage(pageName: string, recipeId: string): void {
    this.router.navigate([`${pageName}`, `${recipeId}`]);
  }

  ngOnInit() {
    this.currentLanguageService.currentLanguage.subscribe((language) => {
      this.currentLanguage = language;
    });
    this.loaderService.showLoader();
    this.profileService
      .getUserLikedRecipes()
      .then((response) => {
        console.log('User recipes:', response);
        if (response.length > 0) {
          this.isRecipeLiked = true;
          console.log('hii im in isrecipeCreated');
        }
        for (let recipe of response) {
          this.recipes.push(recipe.Item);
        }
        console.log('updated recipes:' + this.recipes[0].recipeId);
      })
      .catch((error: any) => {
        console.error('Error fetching user recipes:', error);
      });
  }

  navigateToAll() {
    this.router.navigate(['search']);
  }
}
