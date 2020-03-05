import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscription-onboarding',
  templateUrl: './subscription-onboarding.component.html',
  styleUrls: ['./subscription-onboarding.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(200%)' }),
        animate('800ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class SubscriptionOnboardingComponent implements OnInit {
  stepNumber: string;
  stepTitle: string;
  state: string;
  constructor() {
    this.state = 'home';
    this.stepNumber = 'ETAPE 1';
    this.stepTitle = `C'est pour qui ?`;
  }

  ngOnInit() {}

  goTo(step: string) {
    this.state = step;
    switch (step) {
      case 'myself':
        this.stepNumber = 'ETAPE 2';
        this.stepTitle = `Choisissez une box`;
        break;
      case 'friend':
        this.stepNumber = '';
        this.stepTitle = '';
    }
  }
}
