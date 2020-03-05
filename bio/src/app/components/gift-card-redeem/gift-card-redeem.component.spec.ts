import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCardRedeemComponent } from './gift-card-redeem.component';

describe('GiftCardRedeemComponent', () => {
  let component: GiftCardRedeemComponent;
  let fixture: ComponentFixture<GiftCardRedeemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftCardRedeemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftCardRedeemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
