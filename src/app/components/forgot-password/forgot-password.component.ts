import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CognitoService, User } from 'src/app/service/cognito-service.service';
import { LoaderService } from 'src/app/service/loader-service.service';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  user: User;
  isConfirmed: boolean;

  constructor(
    private router: Router,
    private cognitoService: CognitoService,
    private toast: ToastrService,
    public loaderService: LoaderService
  ) {
    this.isConfirmed = false;
    this.user = {} as User;
  }

  resetPassword(): void {
    if (!emailRegex.test(this.user.email)) {
      this.toast.warning('Enter Valid Email', 'Warning');
      return;
    }

    this.cognitoService
      .resetPassWord(this.user)
      .then((data) => {
        this.loaderService.hideLoader();
        this.toast.success(
          'Code sent to \n ' + data.nextStep.codeDeliveryDetails.destination,
          'Success'
        );
        this.isConfirmed = true;
      })
      .catch((err) => {
        this.loaderService.hideLoader();
        this.toast.error(err.message, 'Error');
      });
  }

  confirmResetPassword(): void {
    this.loaderService.showLoader();
    this.cognitoService
      .confirmResetPassword(this.user)
      .then((data) => {
        this.loaderService.hideLoader();
        localStorage.clear();
        this.toast.success('Password Reset Success', 'Success');
        this.router.navigate(['login']);
      })
      .catch((err) => {
        this.loaderService.hideLoader();
        console.log('Error => ' + err);
        this.toast.error(err.message, 'Error');
      });
  }

  ngOnInit(): void {
    // this.loaderService.showLoader()
  }
}
