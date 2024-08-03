import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CognitoService } from 'src/app/service/cognito-service.service';
import { ProfileService } from 'src/app/service/profile-service.service';
import { LoaderService } from 'src/app/service/loader-service.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  showOwnRecipe: boolean = true;
  showLikedRecipe: boolean = false;
  showSettings: boolean = false;
  selectedButton: string = 'ownRecipes';
  name: string = "";

  constructor(
    private cognitoService: CognitoService,
    private router: Router,
    private toast: ToastrService,
    private profileService: ProfileService,
    public loaderService: LoaderService,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loaderService.showLoader()
    this.profileService.getUsername().then((res) => {
      this.name = res.Item.name;
    })
  }

  logout() {
    this.loaderService.showLoader();
    this.cognitoService.signOut();
    localStorage.clear();
    this.loaderService.hideLoader();
    this.toast.success('Logged Out Successfully!', 'Success');
    this.router.navigate(['login']);
  }

  navigateToOwnRecipes() {
    this.showOwnRecipe = !this.showOwnRecipe;
    this.showLikedRecipe = false;
    this.showSettings = false;
    this.selectedButton = 'ownRecipes';
  }


  navigateToSetting() {
    // this.router.navigate(['setting']);
    this.showSettings = !this.showSettings;
    this.showOwnRecipe = false;
    this.showLikedRecipe = false;
    this.selectedButton = 'settings';
  }
  navigateToLikedRecipe() {
    this.showLikedRecipe = !this.showLikedRecipe;
    this.showOwnRecipe = false;
    this.showSettings = false;
    this.selectedButton = 'likedRecipe';
  }

  // navigateToOwnRecipes() {
  //   setTimeout(() => {
  //     this.showOwnRecipe = !this.showOwnRecipe;
  //     this.showLikedRecipe = false;
  //     this.showSettings = false;
  //     this.selectedButton = 'ownRecipes';
  //     this.cdr.detectChanges();
  //   });
  // }

  // navigateToSetting() {
  //   setTimeout(() => {
  //     this.showSettings = !this.showSettings;
  //     this.showOwnRecipe = false;
  //     this.showLikedRecipe = false;
  //     this.selectedButton = 'settings';
  //     this.cdr.detectChanges();
  //   });
  // }

  // navigateToLikedRecipe() {
  //   setTimeout(() => {
  //     this.showLikedRecipe = !this.showLikedRecipe;
  //     this.showOwnRecipe = false;
  //     this.showSettings = false;
  //     this.selectedButton = 'likedRecipe';
  //     this.cdr.detectChanges();
  //   });
  // }
}
