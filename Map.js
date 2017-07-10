import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {firebaseApp} from './App';
import TabBar from './Tab';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text} from 'native-base';


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

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // get children as an array
      var items = [];
      snap.forEach((parent) => {
        parent.forEach((child) => {
        var coords;
            items.push({
              "name": child.val().name,
              "startTime": child.val().startTime,
              "date": parent.key,
              "who": child.val().who,
              "where": child.val().where,
              "what": child.val().what,
              "key": child.key,
              "description": child.val().startTime + " @ " + child.val().where,
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
      <Container>
        <Header>
          <Body>
          <Title>Map</Title>
          </Body>
        </Header>
            <MapView style={{flex: 1}}
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
        <Footer>
          <TabBar navigate={navigate} screen='Map'/>
        </Footer>
      </Container>
    );
  }
}
