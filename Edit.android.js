import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
export default class Edit extends Component {
  render() {
    var styles = require('./Styles');
    return (
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={30} underlineColorAndroid = 'white'>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.title}>Edit Event</Text>
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
              textAlignVertical={'top'}/>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
