import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionOnboardingComponent } from './subscription-onboarding.component';

describe('SubscriptionOnboardingComponent', () => {
  let component: SubscriptionOnboardingComponent;
  let fixture: ComponentFixture<SubscriptionOnboardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionOnboardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
