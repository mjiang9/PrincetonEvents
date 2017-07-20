import React, {Component} from 'react';
import { Text, BackHandler } from 'react-native';
import {StyleProvider, Container, Header, Title, Content, Footer, FooterTab,
  Button, Left, Right, Body, Icon, Form, Item, Input, Label} from 'native-base';
import {firebaseApp} from './App';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';


export default class CreateAccountScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      verifyPassword:'',
      error: ''
    }
    console.ignoredYellowBox = [
         'Setting a timer'
     ];
  }

  register = () => {

    console.log("Creating Account");
    if(this.state.password === this.state.verifyPassword) {
      firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
          firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            this.props.navigation.navigate('Home');
          }).catch((error) => {
            alert(error.message);
          })
      }).catch((error) => {
         if (error.code == 'auth/invalid-email') {
          this.setState({error: 'Invalid Email!'});
        } else if (error.code == 'auth/email-already-in-use') {
          this.setState({error: 'Email Already In Use!'});
        } else if (error.code == 'auth/operation-not-allowed') {
          this.setState({error: 'Account Creation Is Unavailable!'});
        } else if (error.code == 'auth/weak-password') {
          this.setState({error: 'Make Password Stronger!'});
        } else {
          this.setState({error: error.code});
        }
      })
    } else {
      this.setState({error: 'Passwords Do Not Match!'});
    }
  }

  // handles hardwar back button pressed on Android
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Login');
      return true;
    });
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
            returnKeyType='next'/>
            </Item>
            <Item floatingLabel>
              <Label>Verify Password</Label>
             <Input
             style={{marginLeft: 1, color: 'white'}}
             secureTextEntry
             onChangeText={(verifyPassword) => this.setState({verifyPassword, error: ''})}
             value={this.state.verifyPassword}
             autoCapitalize='none'
             returnKeyType='done'/>
             </Item>
          <Text style={styles.errorText}>{this.state.error}</Text>
          </Form>
        <Button transparent style={{margin:10, alignSelf: 'center'}} onPress={() => this.register()}>
          <Text style={styles.loginText}>CREATE ACCOUNT</Text>
        </Button>
        <Button transparent style={{margin:10, alignSelf: 'center'}} onPress= {() => navigate('Login')}>
          <Text style={styles.loginText}>BACK</Text>
        </Button>
        </Content>
      </Container>
    </StyleProvider>
    );
  }
}
