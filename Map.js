import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {firebaseApp} from './App';

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
    };
    this.itemsRef = firebaseApp.database().ref('items');
    console.ignoredYellowBox = [
         'Setting a timer'
     ];
  }
  static navigationOptions = {
      tabBarLabel: 'Map',
      tabBarIcon: ({tintColor}) => (
        <Icon
          name = {'location-on'}
          size = {26}
          style = {{color: tintColor}} />
      )
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // get children as an array
      var items = [];
      snap.forEach((parent) => {
        parent.forEach((child) => {
        var coords;
            items.push({
              "name": child.val().name,
              "time": child.val().when, //change eventually to time
              "date": parent.key,
              "who": child.val().who,
              "where": child.val().where,
              "what": child.val().what,
              "key": child.key,
              "description": child.val().when + " @ " + child.val().where,
              "latitude": child.val().latitude,
              "longitude": child.val().longitude
            });
            this.setState({
              markers: items
            });
          });
      });
    });
  };

  onLearnMore = (item) => {
    this.props.navigation.navigate('Details', {
      ...item
    });
  };

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  };

  render() {
    const { navigate } = this.props.navigation;
    var styles = require('./Styles');
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.title}>Map</Text>
        </View>
        <MapView style={{flex: 10}}
          initialRegion={{ latitude: 40.347695, longitude: -74.657995,
          latitudeDelta: .012, longitudeDelta: .012 }} >
          {this.state.markers.map(marker => (
          <MapView.Marker
            key={marker.key}
            coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
            title={marker.name}
            description={marker.description} onCalloutPress={() => this.onLearnMore(marker)}>
          </MapView.Marker> ))}
        </MapView>
        <View style={styles.footer}>
          <TouchableHighlight style={styles.button} onPress={() => navigate('Home')} underlayColor='#ffd199'>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
