import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MishorHotelsComponent } from './mishor-hotels.component';

describe('MishorHotelsComponent', () => {
  let component: MishorHotelsComponent;
  let fixture: ComponentFixture<MishorHotelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MishorHotelsComponent]
    });
    fixture = TestBed.createComponent(MishorHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
