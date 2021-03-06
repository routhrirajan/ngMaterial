import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//import { firebase } from '@firebase/app';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { NotifyService } from '../common/notify.service';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IUser } from 'app/login/user.interface';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class AuthenticationService {

  user: Observable<IUser | null>;

  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar,
    private notify: NotifyService) {
      afs.firestore.settings({ timestampsInSnapshots: true });
      this.user = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        }));
  }

  ////// OAuth Methods /////
  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: auth.AuthProvider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(credential.user);
      })
      .catch((error) => this.handleError(error));
  }

  //// Anonymous Auth ////
  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(user.user); // if using firestore
      })
      .catch((error) => {
        console.error(error.code);
        console.error(error.message);
        this.handleError(error);
      });
  }

  //// Email/Password Auth ////
  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.verifyEmail(user);
        this.snackBar.open('User Created', 'Close' );
        return this.updateUserData(user.user); // if using firestore
      })
      .catch((error) => this.handleError(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.snackBar.open('Login Success', 'Close' );
        return this.updateUserData(user.user); // if using firestore
      })
      .catch((error) => this.handleError(error));
  }
  // Sends email verification
  verifyEmail(user) {
    user.sendEmailVerification().then(function () {
      // Email sent.
    }).catch(function (error) {
      // An error happened.
    });
  }
  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch((error) => this.handleError(error));
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
    this.snackBar.open(error.message, 'Close' );
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: IUser) {

    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(`users/${user.uid}`);

    const data: IUser = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ'
    };
    return userRef.set(data);
  }
}
