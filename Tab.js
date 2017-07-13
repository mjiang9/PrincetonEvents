import Home from './Home';
import MyEvents from './MyEvents'
import Map from './Map';
import Input from './InputPage';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {Container, Content, Footer, FooterTab, Button, Icon, Text} from 'native-base';
var styles = require('./Styles');

export default class MyComponent extends Component {
  constructor(props) {
    super(props);
    let index = 0;
    if(typeof this.props.navigation.state.params !== 'undefined') {
      index = this.props.navigation.state.params.indexBack;
    }
    this.state = {
      index: index,
      homeActive: index === 0,
      mapActive: index === 1,
      inputActive: index === 2,
      myEventsActive: index === 3,
    };
  }

  changeScreen = (index) => {
      this.setState({
        index: index,
        homeActive: index === 0,
        mapActive: index === 1,
        inputActive: index === 2,
        myEventsActive: index === 3,
      })
   }

   // handles hardwar back button pressed on Android
   componentDidMount() {
     BackHandler.addEventListener('hardwareBackPress', () => {
       BackHandler.exitApp();
     });
   }



  render() {
    let AppComponent = null;

     if (this.state.index === 0) {
        AppComponent = Home;
     } else if (this.state.index === 1) {
        AppComponent = Map;
     } else if(this.state.index === 2) {
        AppComponent = Input;
     }
     else {
        AppComponent = MyEvents;
     }

    return (
        <Container>
          <AppComponent navigation={this.props.navigation}/>
          <Footer>
            <FooterTab>
              <Button vertical active={this.state.homeActive} onPress={() => {this.changeScreen(0)}}>
                <Icon active={this.state.homeActive} name='home' />
                <Text>Home</Text>
              </Button>
              <Button vertical active={this.state.mapActive} onPress={() => {this.changeScreen(1)}}>
                <Icon active={this.state.mapActive} name='map' />
                <Text>Map</Text>
              </Button>
              <Button vertical active={this.state.inputActive} onPress={() => {this.changeScreen(2)}}>
                <Icon active={this.state.inputActive} name='create' />
                <Text>Input</Text>
              </Button>
              <Button vertical active={this.state.myEventsActive} onPress={() => {this.changeScreen(3)}}>
                <Icon active={this.state.myEventsActive} name='person' />
                <Text>My Events</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
    );
  }
}
