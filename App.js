import React, { Component } from 'react';
import { Root } from './Router';
import * as firebase  from 'firebase';
import {Tabs} from './Router';
import Login from './Login';
import {LoginNav} from './Router';

const firebaseConfig = {
  apiKey: "AIzaSyCEbdjQNZ9IpoOmc5gWAVI4Doq224_JWUg",
  authDomain: "princetonevents-3aeed.firebaseapp.com",
  databaseURL: "https://princetonevents-3aeed.firebaseio.com",
  storageBucket: "princetonevents-3aeed.appspot.com",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    return <LoginNav/>;
  }
}

export default App;
