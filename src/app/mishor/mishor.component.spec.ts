import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MishorComponent } from './mishor.component';

describe('MishorComponent', () => {
  let component: MishorComponent;
  let fixture: ComponentFixture<MishorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MishorComponent]
    });
    fixture = TestBed.createComponent(MishorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
