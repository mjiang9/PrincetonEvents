import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

Geocoder.setApiKey('AIzaSyCWw2zAT2-MqdG7wP5LoCbw_BIfoFXg4l4');

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: {
        latitude: 40.3440,
        longitude: 74.6514
      }
    }
  }
  componentDidMount() {
    Geocoder.getFromLocation(this.props.navigation.state.params.where + " Princeton").then(
      json => { var location = json.results[0].geometry.location;
        this.setState({
          coords: {
            latitude: location.lat,
            longitude: location.lng
          }
        });
    },
      error => {
        alert(error);
      }
    );
  }
  render() {
    const { navigate } = this.props.navigation;
    const { name, who, what, time, date, where } =
     this.props.navigation.state.params;
    var styles = require('./Styles');
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.body}>
          <List containerStyle={{
            borderTopWidth: 0,
            borderBottomWidth: 0
          }}>
            <ListItem
              style={styles.item}
              rightTitleStyle={s.right}
              title="Who:"
              rightTitle={who}
              hideChevron
            />
            <ListItem
              style={styles.item}
              rightTitleStyle={s.right}
              title="Date:"
              rightTitle={date}
              hideChevron
            />
            <ListItem
              style={styles.item}
              rightTitleStyle={s.right}
              title="Time:"
              rightTitle={time}
              hideChevron
            />
            <ListItem
              style={styles.item}
              rightTitleStyle={s.right}
              title="Where:"
              rightTitle={where}
              hideChevron
            />
            <ListItem
              style={styles.item}
              rightTitleStyle={s.right}
              rightTitleNumberOfLines={5}
              title="Description:"
              rightTitle={what}
              hideChevron
            />
          </List>
          <MapView style={{height: 180, margin: 20 }}
            initialRegion={{ latitude: 40.347695, longitude: -74.657995,
            latitudeDelta: .01, longitudeDelta: .012 }} >
            <MapView.Marker
              coordinate={this.state.coords}
              title={name}
              description={date + " " + time + " @ " + where} />
          </MapView>
        </View>
       <View style={styles.footer}>
        <TouchableHighlight style={styles.button}
         onPress={() => navigate('Home')} underlayColor='#ffd199'>
         <Text style={{color: 'white', fontSize: 20}}>Back</Text>
        </TouchableHighlight>
       </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  right: {
    color: 'black',
    alignSelf: 'flex-start',
  }
})
