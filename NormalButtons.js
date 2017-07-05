import React, {Component} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

export default class NormalButtons extends Component {
  render() {
    var styles = require('./Styles');
    return (
      <View style={styles.footer}>
        <TouchableHighlight style={styles.button} onPress={() => navigate('Home')} underlayColor='#ffd199'>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => this.props.edit()}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
