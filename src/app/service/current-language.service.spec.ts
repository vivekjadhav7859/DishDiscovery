import { TestBed } from '@angular/core/testing';

import { CurrentLanguageService } from './current-language.service';

describe('CurrentLanguageService', () => {
  let service: CurrentLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
