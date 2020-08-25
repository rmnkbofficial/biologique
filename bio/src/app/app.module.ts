import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MAT_DIALOG_DEFAULT_OPTIONS, MatCheckboxModule, MatDialogModule, MatDialogRef
} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './components/account/account.component';
import { AuthRouterComponent } from './components/auth-router/auth-router.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FooterComponent } from './components/footer/footer.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { GiftCardDialogComponent } from './components/gift-card-dialog/gift-card-dialog.component';
import { GiftCardRedeemComponent } from './components/gift-card-redeem/gift-card-redeem.component';
import { GiftCardComponent } from './components/gift-card/gift-card.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { MonthlyCardComponent } from './components/monthly-card/monthly-card.component';
import { NavComponent } from './components/nav/nav.component';
import { OffersComponent } from './components/offers/offers.component';
import { SignupComponent } from './components/signup/signup.component';
import {
    SubscriptionOnboardingComponent
} from './components/subscription-onboarding/subscription-onboarding.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { YearlyCardComponent } from './components/yearly-card/yearly-card.component';
import { AuthService } from './services/auth/auth.service';
import { CartComponent } from './components/cart/cart.component';
import { GiftCardProductsComponent } from './components/gift-card-products/gift-card-products.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LandingComponent,
    FooterComponent,
    OffersComponent,
    AuthRouterComponent,
    SignupComponent,
    LoginComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    AccountComponent,
    MonthlyCardComponent,
    YearlyCardComponent,
    SubscriptionOnboardingComponent,
    CheckoutComponent,
    GiftCardComponent,
    GiftCardDialogComponent,
    GiftCardRedeemComponent,
    CartComponent,
    GiftCardProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatStepperModule,
    FlexLayoutModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatCardModule,
    MatSidenavModule,
    MatTabsModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [
    AuthService,
    AngularFireAuth,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  entryComponents: [GiftCardDialogComponent, GiftCardRedeemComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
