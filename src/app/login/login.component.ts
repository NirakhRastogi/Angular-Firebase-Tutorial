import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: any;
  name: any;
  items: FirebaseListObservable<any[]>;
  allUsers: any = [];
  constructor(public _afauth: AngularFireAuth, public _afdb: AngularFireDatabase) {

    // Get all data from database in form of an observable
    this.items = _afdb.list('/', {
      query: {
        limitToLast: 50
      }
    });

    // Subscribe to the item observable
    // Get the data in form of an array and object.
    // Each branch in database creates new array and all elements or keys create an object so we get array of an object
    // Get keys of all objects and display it

    this.items
    .map((data) => data[0])
    .subscribe((data) => {
      this.allUsers = Object.keys(data);
    });

    // get the authenication state to check weather user is logged in or not
    _afauth.authState
      .subscribe((auth) => { if (auth != null) { this.email = this.name = auth.email; } });
  }

  login() {
    // Login using email and password
    this._afauth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then((data) => {
        console.log(this._afauth.auth);
        this._afauth.authState
          .subscribe((auth) => { if (auth != null) { this.name = auth.email; } });
      })
      .catch((err) => console.log(err));
  }

  loginWithGoogle() {
    // Login using google account
    this._afauth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider)
      .then((data) => {
        console.log(data);
        this._afauth.authState
          .subscribe((auth) => { if (auth != null) { this.name = auth.email; } });
      })
      .catch((err) => console.log(err));
  }

  // Logout the already logged user
  logout() {
    this._afauth.auth.signOut()
      .then((data) => {
        console.log('Logout');
        this.email = this.name = '';
      })
      .catch((err) => console.log(err));
  }

  ngOnInit() {
  }

}
