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


export default class LoginScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      status: ''
    }

    this.login = this.login.bind(this);
  }

  login(){
    firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      console.log(error.code);
      console.log(error.message);
    })


  }

  render() {
    var styles = require('./Styles');
    const {navigate} = this.props.navigation;

    return(
      <View style={styles.loginContainer}>
        <Text style={styles.loginHeader}>PRINCETON EVENTS</Text>
        <TextInput
          style={styles.loginInput}
          placeholder="Email"
          autoCapitalize='none'
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.email}
          returnKeyType='next'/>
        <TextInput
          secureTextEntry
          style={styles.loginInput} placeholder="Password"
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
          autoCapitalize='none'
          returnKeyType='go'/>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText} onPress={() => {this.register}}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress = {() => navigate('CreateAccount')}>
          <Text style={styles.loginText}> CREATE ACCOUNT </Text>
        </TouchableOpacity>
      </View>
    );

}
}
