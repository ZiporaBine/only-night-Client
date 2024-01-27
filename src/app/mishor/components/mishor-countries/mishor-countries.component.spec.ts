import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MishorCountriesComponent } from './mishor-countries.component';

describe('MishorCountriesComponent', () => {
  let component: MishorCountriesComponent;
  let fixture: ComponentFixture<MishorCountriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MishorCountriesComponent]
    });
    fixture = TestBed.createComponent(MishorCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
