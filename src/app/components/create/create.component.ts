import { CurrentLanguageService } from './../../service/current-language.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SaveRecipeService } from 'src/app/service/save-recipe.service';
import { ToastrService } from 'ngx-toastr';
import { CognitoService } from 'src/app/service/cognito-service.service';
import { Environment } from 'src/app/environment/environment';
import { RecipeService } from 'src/app/service/recipe.service';
import { LoaderService } from 'src/app/service/loader-service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  recipes: any;
  searchText: string = '';
  rawTags: string = '';
  selectedFile: any;
  currentLanguage: string = '';

  recipe: any = {
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

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private http: HttpClient,
    private saveRecipe: SaveRecipeService,
    private toastService: ToastrService,
    private cognitoService: CognitoService,
    public loaderService: LoaderService,
    private currentLanguageService: CurrentLanguageService
  ) {}

  getTitle(recipeTitle: any) {
    return recipeTitle[`${this.currentLanguage}`];
  }

  ngOnInit(): void {
    this.currentLanguageService.currentLanguage.subscribe((language) => {
      this.currentLanguage = language;
    });
    window.scrollTo(0, 0);
    this.loadRecipes();
    this.loaderService.showLoader();
  }

  loadRecipes(): void {
    this.recipeService.getRecipes().then((response: any) => {
      this.recipes = response['Items'].Items;
    });
  }

  goToPage(pageName: string, recipeId: string): void {
    this.router.navigate([`${pageName}`, `${recipeId}`]);
  }

  redirectTo(page: string): void {
    this.router.navigate([`${page}`]);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file);
    if (file) {
      this.selectedFile = file;
    }
  }

  createRecipe(): void {
    this.convertToBase64(this.selectedFile);
    window.scrollTo(0, 0);
  }

  convertToBase64(file: File) {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String: string | ArrayBuffer | null = reader.result;
      if (typeof base64String === 'string') {
        console.log('Base64 image:', base64String);
        this.recipe.recipeImageUrl = base64String;
        this.recipe.tags = this.rawTags.split(' ');

        // Send base64 image to Lambda function
        // this.loaderService.showLoader();
        this.saveRecipe
          .invokeLambdaFunction(
            this.recipe,
            localStorage.getItem(Environment.LOCAL_STORAGE)
          )
          .then((response) => {
            this.loaderService.hideLoader();
            console.log('Lambda function invoked successfully:', response);
            this.toastService.success('Recipe Successfully Saved!', 'Success', {
              timeOut: 5000,
            });
            this.router.navigate(['/search']);
            // Handle Lambda function response as needed
          })
          .catch((err) => {
            this.loaderService.hideLoader();
            this.toastService.error('Something went wrong', 'Error');
          });
        // .finally(() => {
        //   this.isLoading = false; // Set loading to false after API call is complete
        // });
      }
    };
    reader.readAsDataURL(file);
  }
}
