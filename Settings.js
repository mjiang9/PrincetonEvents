import React, { Component } from 'react';
import {firebaseApp} from './App';
import { StyleProvider, Container, Header, Title, Content, Button,
  Left, Right, Body, Icon, Text, List, ListItem } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

export default class AnatomyExample extends Component {

  logout = () => {
    firebaseApp.auth().signOut().then(() => {
      this.props.navigation.navigate('LogOut');
      console.log('logged out');
    }).catch((error) => {
      alert(error.code);
    })
  };

  render() {
    return (
    <StyleProvider style={getTheme(material)}>
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Settings</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{backgroundColor: 'white'}}>
          <List>
            <ListItem icon onPress={() => this.logout()}>
              <Left>
                <Icon name="power" />
              </Left>
              <Body>
                <Text>Log Out</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    </StyleProvider>
    );
  }
}
