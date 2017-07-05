import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Input from './Input';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {firebaseApp} from './App';


export default class CreateAccountScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      passowrd: '',
      verifyPassword:'',
      status: ''

    }

    this.register = this.register.bind(this);
  }

  register(){

    console.log("Creating Account");
    if(this.state.password == this.state.verifyPassword) {
      firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error){
        console.log(error.code);
        console.log(error.message);
      })
    } else {
      console.log("Passwords did not match.")
    }

    /*firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error){
      console.log(error.code);
      console.log(error.message);
    })*/

  }

  render() {
    console.log("Top of render");
    var styles = require('./Styles');

    return(
      <View style={styles.loginContainer}>
        <Text style={styles.loginHeader}>PRINCETON EVENTS</Text>
        <TextInput
          style={styles.loginInput}
          placeholder="Email"
          autoCapitalize='none'
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.email}/>
        <TextInput
          secureTextEntry
          style={styles.loginInput} placeholder="Password"
          onChangeText={(text) => this.setState({password: text})}
          autoCapitalize='none'
          value={this.state.password}/>
          <TextInput
            secureTextEntry
            style={styles.loginInput} placeholder="Verify Password"
            onChangeText={(text) => this.setState({verifyPassword: text})}
            autoCapitalize='none'
            value={this.state.verifyPassword}/>
        <TouchableOpacity style={styles.loginButton} onPress={this.register}>
          <Text style={styles.loginText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
