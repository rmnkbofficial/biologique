import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './components/account/account.component';
import { AuthRouterComponent } from './components/auth-router/auth-router.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { GiftCardComponent } from './components/gift-card/gift-card.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { OffersComponent } from './components/offers/offers.component';
import { SignupComponent } from './components/signup/signup.component';
import {
  SubscriptionOnboardingComponent
} from './components/subscription-onboarding/subscription-onboarding.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'offres', component: OffersComponent, canActivate: [AuthGuard] },
  { path: 'compte', component: AuthRouterComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  {
    path: 'password',
    component: ForgotPasswordComponent
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent
  },
  {
    path: 'mon-compte',
    component: AccountComponent,
    canActivate: [AuthGuard]
  },
  { path: 'bienvenue', component: SubscriptionOnboardingComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'cadeau', component: GiftCardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
