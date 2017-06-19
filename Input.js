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
        <View style={{flex: 10}}>
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

        <TouchableHighlight style={styles.buttonContainer}>
          <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>SUBMIT</Text>
        </TouchableHighlight>
        </View>
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
