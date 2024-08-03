import { Component, OnInit } from '@angular/core';
import { CognitoService, User } from 'src/app/service/cognito-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/service/loader-service.service';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isConfirmed: boolean;
  user: User;
  public showPassword: boolean = false;
  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private toast: ToastrService,
    public loaderService: LoaderService
  ) {
    this.isConfirmed = false;
    this.user = {} as User;
  }
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  public signUp(): void {
    if (!this.user.name) {
      this.toast.warning('Enter Name', 'Warning');
      return;
    }
    if (!emailRegex.test(this.user.email)) {
      this.toast.warning('Enter valid Email', 'Error');
      return;
    }
    if (!this.user.password) {
      this.toast.warning('Enter Password', 'Warning');
      return;
    }

    this.loaderService.showLoader();
    this.cognitoService
      .signUp(this.user)
      .then((data) => {
        this.loaderService.hideLoader();
        this.toast.success(
          'Code sent to \n ' + data.nextStep.codeDeliveryDetails.destination,
          'Success'
        );
        this.isConfirmed = true;
      })
      .catch((err: any) => {
        if (err.message === 'User already exists') {
          this.toast.error('User already exists', 'Error');
        } else {
          let msg = err.message.split(':');
          this.toast.warning(msg[1], 'Warning');
        }

        console.log(err.message + ' Error in signup..');
        this.loaderService.hideLoader();
      });
  }

  public confirmSignUp(): void {
    this.loaderService.showLoader();
    this.cognitoService
      .confirmSignUp(this.user)
      .then(() => {
        console.log('Register success');
        this.loaderService.hideLoader();
        this.toast.success('Registration Successfull!', 'Success');
        this.router.navigate(['login']);
      })
      .catch(() => {
        this.loaderService.hideLoader();
        console.log('Error in signup..');
      });
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
