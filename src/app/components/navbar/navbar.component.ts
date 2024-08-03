import { CurrentLanguageService } from './../../service/current-language.service';
import { Component } from '@angular/core';
import { CognitoService } from 'src/app/service/cognito-service.service';
import { Environment } from 'src/app/environment/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isMenuOpen = false;
  isLoginPage: boolean = false;

  constructor(
    public cognitoService: CognitoService,
    private router: Router,
    public translate: TranslateService,
    private currentLanguageService: CurrentLanguageService,
    private location: Location
  ) {
    translate.addLangs(['English', 'Hindi', 'Marathi', 'French', 'spanish']);
    router.events.subscribe((val) => {
      if (this.location.path() === '/login') {
        this.isLoginPage = true;
      } else {
        this.isLoginPage = false;
      }
    });
  }

  ngOnInit() {}

  switchLang(lang: string) {
    this.translate.use(lang);
    this.currentLanguageService.setCurrentLanguage(lang);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closemenu()
  {
    this.isMenuOpen = false;
  }

  isAuthenticated() {
    const temp = localStorage.getItem(Environment.LOCAL_STORAGE);

    if (temp) {
      return true;
    } else {
      return false;
    }
  }
  navigateToHome() {
    this.router.navigate(['']);
  }
}
