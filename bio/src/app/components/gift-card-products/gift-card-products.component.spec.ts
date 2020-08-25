import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCardProductsComponent } from './gift-card-products.component';

describe('GiftCardProductsComponent', () => {
  let component: GiftCardProductsComponent;
  let fixture: ComponentFixture<GiftCardProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftCardProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftCardProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
