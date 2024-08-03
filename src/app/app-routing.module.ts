import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HerosectionComponent } from './components/herosection/herosection.component';
import { CreateComponent } from './components/create/create.component';
import { SignupComponent } from './components/signup/signup.component';
import { AllBlogsComponent } from './components/all-blogs/all-blogs.component';
import { ShowBlogComponent } from './components/show-blog/show-blog.component';
import { LoginComponent } from './components/login/login.component';
import { RouteGuardService } from './service/route-guard-service.service';
import { ProfileComponent } from './components/profile/profile.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { OwnRecipeComponent } from './components/own-recipe/own-recipe.component';
import { SettingComponent } from './components/setting/setting.component';
import { LikedrecipeComponent } from './components/likedrecipe/likedrecipe.component';
import { EditrecipeComponent } from './components/editrecipe/editrecipe.component';

const routes: Routes = [
  {
    path: '',
    component: HerosectionComponent,
  },
  {
    path: 'home',
    component: HerosectionComponent,
  },
  { path: 'about', component: AboutComponent },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [RouteGuardService],
  },
  // { path: "connect", component: ConnectComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'search',
    component: AllBlogsComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'show-blog/:id',
    component: ShowBlogComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [RouteGuardService],
  },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'edit/:id', component: EditrecipeComponent , canActivate: [RouteGuardService],},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
