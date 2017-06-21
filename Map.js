import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import MapView from 'react-native-maps';

export default class Map extends Component {
  render() {
    const { navigate } = this.props.navigation;
    var styles = require('./Styles');
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.title}>Map</Text>
        </View>
        <MapView style={{flex: 10}}
          initialRegion={{ latitude: 40.346695, longitude: -74.657995,
          latitudeDelta: .01, longitudeDelta: .012 }} />
        <View style={styles.footer}>
          <TouchableHighlight style={styles.button} onPress={() => navigate('Home')} underlayColor='#ffd199'>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}