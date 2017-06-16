import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

export default class InputScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <View style={styles.header} >
         <Text style={styles.title}>Add Event</Text>
        </View>
        <View style={styles.body} >
         <Text style={styles.item}>Add Event!</Text>
        </View>
        <View style={styles.footer}>
         <TouchableHighlight style={styles.button}
         onPress={() => navigate('Home')} underlayColor='#ffd199'>
          <Text style={styles.buttonText}>Back</Text>
         </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: 'darkorange',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  body: {
    flex: 10,
    backgroundColor: 'white',
  },
  item: {
    color: 'darkorange',
    fontSize: 18,
    padding: 10,
  },
  footer: {
    flex: 1,
  },
  button: {
    backgroundColor: 'darkorange',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  }
})
