import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSubject = new BehaviorSubject<boolean>(false);

  loaderState$ = this.loaderSubject.asObservable();

  showLoader() {
    this.loaderSubject.next(true);
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
  }

  hideLoader() {
    this.loaderSubject.next(false);
    document.body.style.overflow = 'auto';
  }
}
