import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {firebaseApp} from './App';
import Geocoder from 'react-native-geocoding';

Geocoder.setApiKey('AIzaSyCWw2zAT2-MqdG7wP5LoCbw_BIfoFXg4l4');

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
    };
    this.itemsRef = firebaseApp.database().ref().child('items');
    console.ignoredYellowBox = [
         'Setting a timer'
     ];
  }
  static navigationOptions = {
      tabBarLabel: 'Location',
      tabBarIcon: ({tintColor}) => (
        <Icon
          name = {'location on'}
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
          Geocoder.getFromLocation(child.val().where + " Princeton").then(
            json => { var location = json.results[0].geometry.location;
                coords = {
                  latitude: location.lat,
                  longitude: location.lng
                };
                items.push({
                  "key": child.key,
                  "title": child.val().name,
                  "description": child.val().when + " @ " + child.val().where,
                  "latlng": coords,
                });
                this.setState({
                  markers: items
                });
            },
            error => {
              alert(error);
            }
          );
      });
    });
    });
  }
  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }
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
          <MapView.Marker key={marker.key}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          /> ))}
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
