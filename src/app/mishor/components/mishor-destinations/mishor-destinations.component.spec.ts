import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MishorDestinationsComponent } from './mishor-destinations.component';

describe('MishorDestinationsComponent', () => {
  let component: MishorDestinationsComponent;
  let fixture: ComponentFixture<MishorDestinationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MishorDestinationsComponent]
    });
    fixture = TestBed.createComponent(MishorDestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
