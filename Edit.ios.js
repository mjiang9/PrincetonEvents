import React, { Component } from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput
} from 'react-native';


export default class Edit extends Component {
  render() {
      var styles = require('./Styles');
      return (
        <KeyboardAwareScrollView style={styles.body}>
            <View style={styles.header}>
              <Text style={styles.title}>Enter Info</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.inputText}>Title</Text>
              <TextInput style={styles.normInput} placeholder={this.props.name}/>
            </View>
            <View style={styles.container}>
              <Text style={styles.inputText}>Who</Text>
              <TextInput style={styles.normInput} placeholder={this.props.who}/>
            </View>
            <View style={styles.container}>
              <Text style={styles.inputText}>Place</Text>
              <TextInput style={styles.normInput} placeholder={this.props.where}/>
            </View>
            <View style={styles.container}>
              <Text style={styles.inputText}>Description</Text>
              <TextInput multiline={true} style={styles.descriptionInput}
                 placeholder={this.props.what}
                 placeholderTextColor = 'grey'
                 textAlignVertical={'top'}/>
            </View>
        </KeyboardAwareScrollView>
    );
  }
}
