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
  constructor(props){
    super(props);
    this.state = {
      titleInput: this.props.name,
      whoInput: this.props.who,
      whereInput: this.props.where,
      descriptionInput: this.props.what,
      whenInput: this.props.when
    }
  }

  render() {
    var styles = require('./Styles');
    return (
      <KeyboardAvoidingView behavior='padding'>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.title}>Edit Event</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.inputText}>Title</Text>
            <TextInput
              autoCapitalize={'sentences'}
              editable={this.props.editing}
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
            editable={this.props.editing}
            style={styles.normInput}
            value={this.state.whoInput}
            returnKeyType={'done'}
            onChangeText={(whoInput) => this.setState({whoInput})}
            underlineColorAndroid='white'/>
          </View>
          <View style={styles.container}>
            <Text style={styles.inputText}>When</Text>
            <TextInput
            autoCapitalize={'sentences'}
            editable={this.props.editing}
            style={styles.normInput}
            value={this.state.whenInput}
            returnKeyType={'done'}
            onChangeText={(whenInput) => this.setState({whenInput})}
            underlineColorAndroid='white'/>
          </View>
          <View style={styles.container}>
            <Text style={styles.inputText}>Where</Text>
            <TextInput
            autoCapitalize={'sentences'}
            editable={this.props.editing}
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
              editable={this.props.editing}
              autoCapitalize={'sentences'}
              style={styles.descriptionInput}
              value={this.state.descriptionInput}
              returnKeyType ={'done'}
              onChangeText={(descriptionInput) => this.setState({descriptionInput})}
              underlineColorAndroid='white'/>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
