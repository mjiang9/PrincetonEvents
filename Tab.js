/* @flow */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {StyleProvider, Container, Content, Footer, FooterTab, Button,
  Icon, Text} from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

export default class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homePressed: this.props.screen == 'Home',
      mapPressed: this.props.screen == 'Map',
      myEventsPressed: this.props.screen == 'MyEvents',
      inputPressed: this.props.screen == 'Input',
    };
  }

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Footer>
            <FooterTab>
              <Button vertical active={this.state.homePressed} onPress={() => {
                this.props.navigate('Home')}}>
                <Icon active={this.state.homePressed} name='home' />
                <Text>Home</Text>
              </Button>
              <Button vertical active={this.state.mapPressed} onPress={() => {
                this.props.navigate('Map')}}>
                <Icon active={this.state.mapPressed} name='map' />
                <Text>Map</Text>
              </Button>
              <Button vertical active={this.state.inputPressed} onPress={() => {
                this.props.navigate('Input')}}>
                <Icon active={this.state.inputPressed} name='create' />
                <Text>Input</Text>
              </Button>
              <Button vertical active={this.state.myEventsPressed} onPress={() => {
                this.props.navigate('MyEvents')}}>
                <Icon active={this.state.myEventsPressed} name='person' />
                <Text style={{fontSize: 10}}>My Events</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}
