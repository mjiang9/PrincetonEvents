import React, {Component} from 'react';
import { Text } from 'react-native';
import {StyleProvider, Container, Header, Title, Content, Footer, FooterTab,
  Button, Left, Right, Body, Icon, Form, Item, Input, Label} from 'native-base';
import {firebaseApp} from './App';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: '',
    }

    console.ignoredYellowBox = [
         'Setting a timer'
     ];
  }

  login = () => {
    firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      console.log('tried Logging')
      this.props.navigation.navigate('Home');
    }).catch((error) => {
       if (error.code == 'auth/invalid-email') {
        this.setState({error: 'Invalid Email!'});
      } else if (error.code == 'auth/wrong-password') {
        this.setState({error: 'Wrong Password!'});
      } else if (error.code == 'auth/user-not-found') {
        this.setState({error: 'User Not Found!'});
      } else if (error.code == 'auth/user-disabled') {
        this.setState({error: 'User Account Disabled!'});
      } else {
        this.setState({error: error.code});
      }
    })
  }

  render() {
  var styles = require('./Styles');
  const {navigate} = this.props.navigation;

  return (
    <StyleProvider style={getTheme(material)}>
    <Container>
      <Content style={{backgroundColor: '#f9a56a'}}>
        <Text style={styles.loginHeader}>PRINCETON EVENTS</Text>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
          <Input
            style={{marginLeft: 1, color: 'white'}}
            autoCapitalize='none'
            onChangeText={(email) => this.setState({email, error: ''})}
            value={this.state.email}
            returnKeyType='next'/>
         </Item>
         <Item floatingLabel>
           <Label>Password</Label>
          <Input
          style={{marginLeft: 1, color: 'white'}}
          secureTextEntry
          onChangeText={(password) => this.setState({password, error: ''})}
          value={this.state.password}
          autoCapitalize='none'
          returnKeyType='done'/>
          </Item>
        <Text style={styles.errorText}>{this.state.error}</Text>
        </Form>
      <Button transparent style={{margin:10, alignSelf: 'center'}} onPress={() => this.login()}>
        <Text style={styles.loginText}>LOGIN</Text>
      </Button>
      <Button transparent style={{margin:10, alignSelf: 'center'}} onPress= {() => navigate('CreateAccount')}>
        <Text style={styles.loginText}>CREATE ACCOUNT</Text>
      </Button>
      </Content>
    </Container>
  </StyleProvider>
  );
 }
}
