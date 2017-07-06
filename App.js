import React, { Component } from 'react';
import { Root } from './Router';
import * as firebase  from 'firebase';
import { AppLoading, Font } from 'expo';

const firebaseConfig = {
  apiKey: "AIzaSyCEbdjQNZ9IpoOmc5gWAVI4Doq224_JWUg",
  authDomain: "princetonevents-3aeed.firebaseapp.com",
  databaseURL: "https://princetonevents-3aeed.firebaseio.com",
  storageBucket: "princetonevents-3aeed.appspot.com",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
  state = {
      loaded: false
    }

    componentWillMount() {
      this._loadFontsAsync();
    }

    _loadFontsAsync = async () => {
      await Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      });

      this.setState({loaded: true});
    }

    render() {
      if (!this.state.loaded) {
        return <AppLoading />
      }

      return <Root />;
    }
}

export default App;
