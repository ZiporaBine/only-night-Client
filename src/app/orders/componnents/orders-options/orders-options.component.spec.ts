import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersOptionsComponent } from './orders-options.component';

describe('OrdersOptionsComponent', () => {
  let component: OrdersOptionsComponent;
  let fixture: ComponentFixture<OrdersOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersOptionsComponent]
    });
    fixture = TestBed.createComponent(OrdersOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
