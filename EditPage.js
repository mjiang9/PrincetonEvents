import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import Edit from './Edit';

export default class EditScreen extends Component {
  render() {
    const {navigate} = this.props.navigation;
    var styles = require('./Styles');
    const { name, who, what, when, where } =
     this.props.navigation.state.params;
    return (
      <View style={{
        flex: 1
      }}>
        <View style={styles.body}>
          <Edit name={name} who={who} what={what} when={when} where={where} />
        </View>
        <View style={styles.footer}>
          <TouchableHighlight style={styles.button} onPress={() => navigate('Home')} underlayColor='#ffd199'>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
