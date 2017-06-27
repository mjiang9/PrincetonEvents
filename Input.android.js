import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';

export default class Input extends Component {
  constructor(props){
    super(props);
    this.state = {
      titleInput: '',
      whoInput: '',
      whereInput: '',
      dateInput: '',
      timeInput: '',
      descriptionInput: ''
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.submit) {
    this.props.submitData(this.state.titleInput, this.state.whoInput,
      this.state.whereInput, this.state.dateInput, this.state.timeInput, this.state.descriptionInput);
    this.setState({
      titleInput: '',
      whoInput: '',
      whereInput: '',
      dateInput: '',
      timeInput: '',
      descriptionInput: ''
    });
    }
};


  render() {
    var styles = require('./Styles');
    return (
      <KeyboardAvoidingView behavior='padding'>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.title}>Enter Info</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.inputText}>Title</Text>
            <TextInput
            placeholder="What's the name of your event?"
            style={styles.normInput}
            autoCapitalize={'sentences'}
            value={this.state.titleInput}
            returnKeyType={'done'}
            onChangeText={(titleInput) => this.setState({titleInput})}
            underlineColorAndroid='white'/>
          </View>
          <View style={styles.container}>
            <Text style={styles.inputText}>Who</Text>
            <TextInput
            placeholder='Who is the host of the event?'
            style={styles.normInput}
            autoCapitalize={'sentences'}
            value={this.state.whoInput}
            returnKeyType={'done'}
            onChangeText={(whoInput) => this.setState({whoInput})}
            underlineColorAndroid = 'white'/>
          </View>
          <View style={styles.container}>
            <Text style={styles.inputText}>Date</Text>
            <TextInput
            placeholder={'What is the date of the event?'}
            style={styles.normInput}
            autoCapitalize={'sentences'}
            value={this.state.dateInput}
            returnKeyType={'done'}
            onChangeText={(dateInput) => this.setState({dateInput})}
            underlineColorAndroid='white'/>
          </View>
          <View style={styles.container}>
            <Text style={styles.inputText}>Time</Text>
            <TextInput
            placeholder={'What time is the event?'}
            style={styles.normInput}
            autoCapitalize={'sentences'}
            value={this.state.timeInput}
            returnKeyType={'done'}
            onChangeText={(timeInput) => this.setState({timeInput})}
            underlineColorAndroid='white'/>
          </View>
          <View style={styles.container}>
            <Text style={styles.inputText}>Place</Text>
            <TextInput
            placeholder='Where is the event taking place?'
            style={styles.normInput}
            autoCapitalize={'sentences'}
            value={this.state.whereInput}
            returnKeyType={'done'}
            onChangeText={(whereInput) => this.setState({whereInput})}
            underlineColorAndroid = 'white'/>
          </View>
          <View style={styles.container}>
            <Text style={styles.inputText}>Description</Text>
            <TextInput
              multiline={true}
              style={styles.descriptionInput}
              placeholder='Include additional details here (e.g RSVP, cost, food...)'
              autoCapitalize={'sentences'}
              value={this.state.descriptionInput}
              returnKeyType={'done'}
              onChangeText={(descriptionInput) => this.setState({descriptionInput})}
              underlineColorAndroid = 'white'
              textAlignVertical={'top'}/>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
