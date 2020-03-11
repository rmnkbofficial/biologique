import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';

import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: AngularFirestore, private snackbar: MatSnackBar) {}

  submitEmail(email) {
    return this.db.collection('emails').add({
      email
    });
  }

  getUserInfoById(uid: string): Observable<User[]> {
    const user = this.db.collection('/users', ref =>
      ref.where('uid', '==', uid).limit(1)
    );

    return (user.valueChanges() as unknown) as Observable<User[]>;
  }

  async setUserData(user, firstName, lastName) {
    try {
      return this.db
        .collection('users')
        .doc(user.uid)
        .set(
          {
            displayName: `${firstName} ${lastName}`,
            firstName,
            lastName,
            email: user.email,
            emailVerified: user.emailVerified
          },
          { merge: true }
        );
    } catch (error) {
      this.snackbar.open(
        'Oops. Something went wrong. Please try again later.',
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
  }
}
