import { Observable, of } from 'rxjs';

import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private snackbar: MatSnackBar
  ) {
    this.authenticateUser();
  }

  authenticateUser() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        localStorage.setItem('email', this.userData.email);
      } else {
        localStorage.setItem('user', null);
        localStorage.setItem('email', null);
      }
    });
  }

  setUser(user) {
    this.userData = user;
  }

  getUser() {
    return this.userData;
  }

  accountExists(email) {
    const user = this.afs.collection('/users', ref =>
      ref.where('email', '==', email)
    );
    return (user.valueChanges() as unknown) as Observable<User>;
  }

  getAuthenticated(): Observable<any> {
    return of(this.afAuth.auth);
  }

  signIn(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        if (result.user.emailVerified) {
          this.setUserData(result.user);
          this.ngZone.run(() => {
            setTimeout(() => {
              this.router.navigate(['mon-compte']);
            }, 1000);
          });
        } else {
          this.snackbar.open(
            `Merci de bien vouloir vérifier l’adresse e-mail saisie.`,
            'Ok',
            {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              politeness: 'polite',
              panelClass: 'snackbar'
            }
          );
        }
      })
      .catch(error => {
        this.snackbar.open(`${error}`, 'Ok', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          politeness: 'polite',
          panelClass: 'snackbar'
        });
      });
  }

  signUp(email, password, firstName, lastName) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        const displayName = `${firstName} ${lastName}`;
        result.user.updateProfile({ displayName });
        this.sendVerificationMail();
        this.setUserData(result.user);
      })
      .catch(error => {
        this.snackbar.open(`${error}`, 'Ok', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          politeness: 'polite',
          panelClass: 'snackbar'
        });
      });
  }

  sendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.router.navigate(['verify-email']);
    });
  }

  forgotPassword(passwordResetEmail) {
    return this.afAuth.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.snackbar.open(
          `E-mail de réinitialisation du mot de passe envoyé. Veuillez vérifier votre boîte de réception.`,
          'Ok',
          {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            politeness: 'polite',
            panelClass: 'snackbar'
          }
        );
      })
      .catch(error => {
        this.snackbar.open(`${error}`, 'Ok', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          politeness: 'polite',
          panelClass: 'snackbar'
        });
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  authLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate(['login']);
        });
        this.setUserData(result.user);
      })
      .catch(error => {
        this.snackbar.open(`${error}`, 'Ok', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          politeness: 'polite',
          panelClass: 'snackbar'
        });
      });
  }

  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['']);
      localStorage.removeItem('user');
    });
  }
}
