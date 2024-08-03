import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HerosectionComponent } from './components/herosection/herosection.component';
import { AboutComponent } from './components/about/about.component';
import { SignupComponent } from './components/signup/signup.component';
import { ConnectComponent } from './components/connect/connect.component';
import { CreateComponent } from './components/create/create.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { CouroselComponent } from './components/courosel/courosel.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { AllBlogsComponent } from './components/all-blogs/all-blogs.component';
import { FooterComponent } from './components/footer/footer.component';
import { RecipeService } from './service/recipe.service';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ShowBlogComponent } from './components/show-blog/show-blog.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadersComponent } from './components/loaders/loaders.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StaticCardComponent } from './components/static-card/static-card.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoaderInterceptor } from './loader.interceptor';
import { OwnRecipeComponent } from './components/own-recipe/own-recipe.component';
import { SettingComponent } from './components/setting/setting.component';
import { LikedrecipeComponent } from './components/likedrecipe/likedrecipe.component';
import { EditrecipeComponent } from './components/editrecipe/editrecipe.component';
import { TranslateLoader,TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HerosectionComponent,
    AboutComponent,
    SignupComponent,
    ConnectComponent,
    SearchComponent,
    AllBlogsComponent,
    FooterComponent,
    ShowBlogComponent,
    LoadersComponent,
    CreateComponent,
    LoginComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    StaticCardComponent,
    OwnRecipeComponent,
    SettingComponent,
    LikedrecipeComponent,
    EditrecipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    CouroselComponent,
    HammerModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:httpTranslateLoader,
        deps:[HttpClient]
      }
    })
  ],
  providers: [RecipeService, {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent],
})

export class AppModule { }

export function httpTranslateLoader(http:HttpClient){
  return new TranslateHttpLoader(http);
}