import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';


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

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
