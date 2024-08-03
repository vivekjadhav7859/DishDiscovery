// // recipe.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class RecipeService {
//   private apiUrl = 'https://ggl81ic28i.execute-api.ca-central-1.amazonaws.com/dev/recipes';
//   private recipeUrl = 'https://ggl81ic28i.execute-api.ca-central-1.amazonaws.com/dev/recipe';

//   constructor(private http: HttpClient) { }

//   getRecipes(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }

//   getRecipeById(id: string): Observable<any> {
//     return this.http.get<any>(`${this.recipeUrl}/${id}`);
//   }
// }

// recipe.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CognitoService } from './cognito-service.service';
import { Environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl =
    'https://ggl81ic28i.execute-api.ca-central-1.amazonaws.com/dev/recipes';
  private recipeUrl =
    // 'https://ggl81ic28i.execute-api.ca-central-1.amazonaws.com/dev/recipe';
    // 'https://04xx2gzld3.execute-api.ca-central-1.amazonaws.com/dev/recipe';
    'https://04xx2gzld3.execute-api.ca-central-1.amazonaws.com/dev/recipe/{id}';

  private apiInProgress = false;

  constructor(
    private http: HttpClient,
    private cognitoService: CognitoService
  ) {}

  setApiInProgress(status: boolean): void {
    this.apiInProgress = status;
  }

  isApiInProgress(): boolean {
    return this.apiInProgress;
  }

  getRecipes(): Promise<any> {
    this.setApiInProgress(true);
    return this.cognitoService.getJwt().then((token: any) => {
      const header = new HttpHeaders({
        Authorization: token,
        'Content-Type': 'application/json',
      });

      const username = localStorage.getItem(Environment.LOCAL_STORAGE);

      return this.http
        .post<any>(this.apiUrl, {username}, { headers: header })
        .toPromise();
    });
  }

  getRecipeById(id: string): Promise<any> {
    this.setApiInProgress(true);
    return this.cognitoService.getJwt().then((token: any) => {
      const header = new HttpHeaders({
        Authorization: token,
        'Content-Type': 'application/json',
      });
      return this.http
        .get<any>(`${this.recipeUrl}/${id}`, { headers: header })
        .toPromise();
    });
  }
}
