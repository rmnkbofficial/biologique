import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyCardComponent } from './yearly-card.component';

describe('YearlyCardComponent', () => {
  let component: YearlyCardComponent;
  let fixture: ComponentFixture<YearlyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearlyCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
