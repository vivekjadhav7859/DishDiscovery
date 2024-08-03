import { Component, OnInit } from '@angular/core';
import { CognitoService, User } from 'src/app/service/cognito-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Environment } from 'src/app/environment/environment';
import { LoaderService } from 'src/app/service/loader-service.service';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: User;
  public showPassword: boolean = false;
  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private toast: ToastrService,
    public loaderService: LoaderService
  ) {
    this.user = {} as User;
  }
  ngOnInit(): void {
    window.scrollTo(0, 0);

  }

  login() {
    if (!emailRegex.test(this.user.email)) {
      this.toast.warning('Enter valid Email', 'Warning');
      return;
    } else if (!this.user.password) {
      this.toast.warning('Enter Password', 'Warning');
      return;
    }
    this.loaderService.showLoader();
    this.cognitoService
      .signIn(this.user)
      .then((data) => {
        console.log('Response data -> ' + data);
        console.log('Login Success');
        this.loaderService.hideLoader();
        this.toast.success('Logged In Successfully!', 'Success');
        localStorage.setItem(Environment.LOCAL_STORAGE, this.user.email); // store data in local storage
        this.router.navigate(['']);
      })
      .catch((err) => {
        console.log(err + 'Login Error');
        this.loaderService.hideLoader();
        this.toast.error('Invalid Email or Password', 'Error');
      });
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
