import React from 'react';
import * as firebase from 'firebase';

class SignUp extends React.Component {

    constructor() {
        super()
        var firebaseConfig = {
            apiKey: "AIzaSyCsBt8FtmgRwYPC-aXsvuZoLBRGu8bN8nk",
            authDomain: "gc-ping-pong.firebaseapp.com",
            databaseURL: "https://gc-ping-pong.firebaseio.com",
            projectId: "gc-ping-pong",
            storageBucket: "gc-ping-pong.appspot.com",
            messagingSenderId: "301659271768",
            appId: "1:301659271768:web:2888ac87cbf0cb8809102d"
          };
          // Initialize Firebase
        var app = firebase.initializeApp(firebaseConfig);
        this.database = firebase.database();
        this.addUser = this.addUser.bind(this);

    }

    addUser() {
        console.log('hi')
        this.database.ref('users/1234').set({
            username: 'test',
        });
    }


    render() {
        return (
            <button className="SignUp" onClick={this.addUser}>
              Sign Up
            </button>
        );
    }
  }

  
export default SignUp;
  