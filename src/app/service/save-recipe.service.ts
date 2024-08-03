import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CognitoService } from './cognito-service.service';
import { Environment } from '../environment/environment';
@Injectable({
  providedIn: 'root',
})
export class SaveRecipeService {
  private lambdaEndpoint =
    ' https://ggl81ic28i.execute-api.ca-central-1.amazonaws.com/dev/recipe '; // Replace with your actual Lambda endpoint

  constructor(
    private httpClient: HttpClient,
    private cognitoService: CognitoService
  ) {}

  invokeLambdaFunction(recipe: any, username: any): Promise<any> {
    return this.cognitoService.getJwt().then((token: any) => {
      const header = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      });

      const data = {
        recipe: recipe,
        username: username,
      };

      return this.httpClient
        .post(this.lambdaEndpoint, data, { headers: header })
        .toPromise();
    });
  }
}
