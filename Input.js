import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight,
  TextInput, KeyboardAvoidingView } from 'react-native';

export default class InputScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    var styles = require('./Styles');
    return (
      <KeyboardAvoidingView /*behavior="padding"*/ style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.title}>Enter Info</Text>
        </View>
        <View style={{flex: 9}}>
          <View style={styles.container}>
            <View >
              <Text style={styles.inputText}>Title</Text>
            </View>
            <TextInput
              style={styles.normInput}
            />
          </View>
          <View style={styles.container}>
            <View >
              <Text style={styles.inputText}>Who</Text>
            </View>
            <TextInput
              style={styles.normInput}
            />
          </View>
          <View style={styles.container}>
            <View >
              <Text style={styles.inputText}>Place</Text>
            </View>
            <TextInput
              style={styles.normInput}
            />
          </View>
          <View style={styles.container}>
            <View >
              <Text style={styles.inputText}>Description</Text>
            </View>
            <TextInput
              multiline
              style={styles.descriptionInput}
            />
          </View>
        </View>
        <TouchableHighlight style={styles.buttonContainer}>
          <Text style={{color: 'white', fontSize: 20,
             textAlign: 'center'}}>Submit</Text>
        </TouchableHighlight>
        <View style={styles.footer}>
         <TouchableHighlight style={styles.button}
         onPress={() => navigate('Home')} underlayColor='#ffd199'>
          <Text style={{color: 'white', fontSize: 20}}>Back</Text>
         </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
<<<<<<< HEAD

const styles = StyleSheet.create({
  taskbar:{
    marginTop:20,
    padding:30,
    flex:1,
    backgroundColor:'#f9a56a',
    justifyContent:'center',
    alignItems: 'center'

  },
  headingText:{
    color:'white',
    fontSize:30,
    fontWeight:'500',
    //fontFamily:'AvenirNext-Regular'
  },
  container:{
    marginTop:20,
    marginBottom:0,
    marginLeft:15,
    marginRight:15,
    padding:10,
    backgroundColor:'#f9a56a'
  },
  inputText:{
    fontSize:15,
    //fontFamily:'AvenirNext-Regular',
    color:'white'
  },
  normInput:{
    height:40,
    backgroundColor:'white',
    padding:5
  },
  descriptionInput:{
    height:100,
    backgroundColor:'white',
    padding:5,

  },
  buttonContainer:{
    backgroundColor:'#727373',
    padding:10,
    margin: 20
  },
  buttonText:{
    textAlign:'center',
    color:'white',
    fontWeight:'500'
  }
});

/*
const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: 'darkorange',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  body: {
    flex: 10,
    backgroundColor: 'white',
  },
  item: {
    color: 'darkorange',
    fontSize: 18,
    padding: 10,
  },
  footer: {
    flex: 1,
  },
  button: {
    backgroundColor: 'darkorange',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  }
})*/
=======
>>>>>>> 006ecddef76278fb8fbcb56f72276fd669b345ec
