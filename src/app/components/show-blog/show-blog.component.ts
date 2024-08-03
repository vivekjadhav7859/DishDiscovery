import { CurrentLanguageService } from './../../service/current-language.service';
import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/service/loader-service.service';
import { RecipeService } from 'src/app/service/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CognitoService } from 'src/app/service/cognito-service.service';
import { Environment } from 'src/app/environment/environment';

@Component({
  selector: 'app-show-blog',
  templateUrl: './show-blog.component.html',
  styleUrls: ['./show-blog.component.scss'],
})
export class ShowBlogComponent implements OnInit {
  recipe: any;
  recipeId: string = '';
  textareaRows = 4;
  textareaCols = 50;
  comments: string = '';
  userComment: string = '';
  currentLanguage: string = '';

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private cognitoService: CognitoService,
    public loaderService: LoaderService,
    private currentLanguageService: CurrentLanguageService
  ) {}

  ngOnInit(): void {
    this.currentLanguageService.currentLanguage.subscribe((language) => {
      this.currentLanguage = language;
    });
    window.scrollTo(0, 0);
    this.loaderService.showLoader();
    this.route.params.subscribe((params) => {
      this.recipeId = params['id'];
    });
    this.loadRecipe();
    this.submitComment();
  }

  loadRecipe(): void {
    // this.loaderService.showLoader();
    this.recipeService.getRecipeById(this.recipeId).then((response: any) => {
      this.loaderService.hideLoader();
      this.recipe = response['Items']['Item'];

      //Convert ingredients and method to arrays
      // this.recipe.recipeIngridents = this.convertToArray(
      //   this.recipe.recipeIngridents[`${this.currentLanguage}`]
      // );
      // this.recipe.recipeMethod = this.convertToArray(
      //   this.recipe.recipeMethod[`${this.currentLanguage}`]
      // );
    });
  }

  getRecipeIngridients() {
    return this.recipe.recipeIngridents[`${this.currentLanguage}`];
  }

  getRecipeMethod() {
    return this.recipe.recipeMethod[`${this.currentLanguage}`];
  }

  getRecipeCookingTime() {
    return this.recipe.recipeCookingTime[`${this.currentLanguage}`];
  }

  getRecipeTitle() {
    return this.recipe.recipeTitle[`${this.currentLanguage}`];
  }

  getRecipeDescription() {
    return this.recipe.recipeDesc[`${this.currentLanguage}`];
  }

  getRecipeComment(comment: any) {
    return comment[`${this.currentLanguage}`];
  }

  public convertToArray(data: string | string[]): string[] {
    if (typeof data === 'string') {
      // Split string into array using newline character as delimiter
      return data
        .split('\n')
        .map((item) => item.trim())
        .filter((item) => item !== '');
    } else if (Array.isArray(data)) {
      // If it's already an array, return it as is
      return data;
    } else {
      // If it's neither a string nor an array, return an empty array
      return [];
    }
  }

  submitComment() {
    if (this.userComment.trim() !== '') {
      const commentData = {
        comment: this.userComment,
        id: this.recipeId,
        username: localStorage.getItem(Environment.LOCAL_STORAGE),
      };
      console.log('Sending commentData:', commentData);

      this.cognitoService.getJwt().then((token: any) => {
        const header = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: token,
        });

        this.http
          .post(
            'https://ggl81ic28i.execute-api.ca-central-1.amazonaws.com/dev/recipe/comment',
            commentData,
            { headers: header }
          )
          .subscribe({
            next: (response) => {
              console.log('Comment submitted successfully:', response);
              this.recipe.recipeComment.push(this.userComment);
              window.location.reload();
            },
            error: (error) => {
              console.error('Error submitting comment:', error);
              // Log more details if available
              if (error.error instanceof ErrorEvent) {
                console.error('Client-side error:', error.error.message);
              } else {
                console.error('Server-side error:', error.status, error.error);
              }
            },
          });
      });
    }
    this.userComment = '';
    //window.location.reload();
  }
}
