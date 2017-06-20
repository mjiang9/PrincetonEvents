import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';

export default class InputScreen extends Component {
  render() {
    const {navigate} = this.props.navigation;
    var styles = require('./Styles');
    return (
      <View style={{flex: 1}}>
        <KeyboardAvoidingView behavior='padding' style = {{flex: 10}}>
          <ScrollView>
            <View style={styles.header}>
              <Text style={styles.title}>Enter Info</Text>
            </View>
          <View style={styles.container}>
            <Text style={styles.inputText}>Title</Text>
            <TextInput style={styles.normInput} placeholder = "What's the name of your event?"/>
          </View>
          <View style={styles.container}>
            <Text style={styles.inputText}>Who</Text>
            <TextInput style={styles.normInput} placeholder = "Who is the host of the event?"/>
          </View>
          <View style={styles.container}>
            <Text style={styles.inputText}>Place</Text>
            <TextInput style={styles.normInput} placeholder = "Where is the event taking place?"/>
          </View>
          <View style={styles.container}>
            <Text style={styles.inputText}>Description</Text>
            <TextInput multiline = {true} style={styles.descriptionInput} placeholder = "Include additional details here (e.g RSVP, cost, food...)"/>
          </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <TouchableHighlight style={styles.button} onPress={() => navigate('Home')} underlayColor='#ffd199'>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
