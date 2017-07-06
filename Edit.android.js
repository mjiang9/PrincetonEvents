import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';

export default class Edit extends Component {
  constructor(props){
    super(props);
    this.state = {
      titleInput: this.props.title,
      whoInput: this.props.who,
      whereInput: this.props.where,
      dateInput: this.props.date,
      timeInput: this.props.time,
      descriptionInput: this.props.description
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.saving) {
    this.props.pushData(this.state.titleInput, this.state.whoInput, this.state.whereInput,
      this.state.timeInput, this.state.dateInput, this.state.descriptionInput);
    }
    else if(nextProps.cancel != this.props.cancel) {
      this.setState({
        titleInput: this.props.title,
        whoInput: this.props.who,
        whereInput: this.props.where,
        timeInput: this.props.time,
        dateInput: this.props.date,
        descriptionInput: this.props.description
      });
    }
};

componentWillUpdate(nextProps, nextState) {
  if (nextState != this.state && nextProps.cancel == this.props.cancel) {
    this.props.change();
  }
}

  render() {
    var styles = require('./Styles');
    return (
      <Container>
          <View style={styles.container}>
            <Text style={styles.inputText}>Title</Text>
            <TextInput
              autoCapitalize={'sentences'}
              style={styles.normInput}
              value={this.state.titleInput}
              returnKeyType={'done'}
              onChangeText={(titleInput) => this.setState({titleInput})}
              underlineColorAndroid='white'/>
          </View>
          <View style={styles.container}>
            <Text style={styles.inputText}>Who</Text>
            <TextInput
            autoCapitalize={'sentences'}
            style={styles.normInput}
            value={this.state.whoInput}
            returnKeyType={'done'}
            onChangeText={(whoInput) => this.setState({whoInput})}
            underlineColorAndroid='white'/>
          </View>
          <View style={styles.container}>
            <Text style={styles.inputText}>Date</Text>
            <TextInput
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
            style={styles.normInput}
            autoCapitalize={'sentences'}
            value={this.state.timeInput}
            returnKeyType={'done'}
            onChangeText={(timeInput) => this.setState({timeInput})}
            underlineColorAndroid='white'/>
          </View>
          <View style={styles.container}>
            <Text style={styles.inputText}>Where</Text>
            <TextInput
            autoCapitalize={'sentences'}
            style={styles.normInput}
            value={this.state.whereInput}
            returnKeyType={'done'}
            onChangeText={(whereInput) => this.setState({whereInput})}
            underlineColorAndroid='white'/>
          </View>
          <View style={styles.container}>
            <Text style={styles.inputText}>Description</Text>
            <TextInput
              multiline={true}
              textAlignVertical={'top'}
              autoCapitalize={'sentences'}
              style={styles.descriptionInput}
              value={this.state.descriptionInput}
              returnKeyType ={'done'}
              onChangeText={(descriptionInput) => this.setState({descriptionInput})}
              underlineColorAndroid='white'/>
          </View>
      </Container>
    );
  }
}
