import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentLanguageService {
  public currentLanguageSubject = new BehaviorSubject<string>('english');
  public currentLanguage = this.currentLanguageSubject.asObservable();

  constructor() {}

  setCurrentLanguage(language: string) {
    language = language.toLowerCase();
    this.currentLanguageSubject.next(language);
  }
}
