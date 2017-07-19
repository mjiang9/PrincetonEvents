import Home from './Home';
import MyProfile from './MyProfile'
import Map from './Map';
import Input from './InputPage';
import {Root} from "native-base"; // allows for toasts
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import {StyleProvider, Container, Content, Footer, FooterTab, Button,
  Icon, Text} from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

export default class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      homeActive: true,
      mapActive: false,
      inputActive: false,
      myProfileActive: false,
    };
    console.ignoredYellowBox = ['Setting a timer'];
  }

  changeScreen = (index) => {
      this.setState({
        index: index,
        homeActive: index === 0,
        mapActive: index === 1,
        inputActive: index === 2,
        myProfileActive: index === 3,
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
        AppComponent = MyProfile;
     }

    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Root>
          <AppComponent navigation={this.props.navigation}/>
          </Root>
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
              <Button vertical active={this.state.myProfileActive} onPress={() => {this.changeScreen(3)}}>
                <Icon active={this.state.myProfileActive} name='person' />
                <Text>Profile</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}
