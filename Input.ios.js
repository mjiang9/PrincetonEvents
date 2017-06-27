import React, { Component } from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput
} from 'react-native';


export default class Input extends Component {
  render() {
      var styles = require('./Styles');
      return (
        <KeyboardAwareScrollView style={styles.body}>
            <View style={styles.header}>
              <Text style={styles.title}>Enter Info</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.inputText}>Title</Text>
              <TextInput style={styles.normInput} placeholder="What's the name of your event?"/>
            </View>
            <View style={styles.container}>
              <Text style={styles.inputText}>Who</Text>
              <TextInput style={styles.normInput} placeholder="Who is the host of the event?"/>
            </View>
            <View style={styles.container}>
              <Text style={styles.inputText}>Place</Text>
              <TextInput style={styles.normInput} placeholder="Where is the event taking place?"/>
            </View>
            <View style={styles.container}>
              <Text style={styles.inputText}>Description</Text>
              <TextInput multiline={true} style={styles.descriptionInput}
                 placeholder="Include additional details here (e.g RSVP, cost, food...)"
                 placeholderTextColor = '#C7C7CD'
                 textAlignVertical={'top'}/>
            </View>
        </KeyboardAwareScrollView>
    );
  }
}
