import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {firebaseApp} from './App';
import TabBar from './Tab';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text} from 'native-base';
import Details from './Details';


export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      viewDetails: false,
      curItem: null,
    };
    this.itemsRef = firebaseApp.database().ref('items');
    console.ignoredYellowBox = [
         'Setting a timer'
     ];
  }

  listenForItems(itemsRef) {
    months = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    today = new Date();
    today = months[today.getMonth()] + " " + today.getDate();
    var items = [];
    itemsRef.child(today).orderByChild("latitude").once('value', (snap) => { // test if on works later
      var prevLat = "";
      var prevLon = "";
      var count = 0;
      snap.forEach((child) => {
        // if a valid location, push event to markers
        if(child.val().latitude !== 0 && child.val().longitude !== 0) {
        if (child.val().latitude == prevLat && child.val().longitude == prevLon) {
          count++;
        } else { // new location
          prevLat = child.val().latitude;
          prevLon = child.val().longitude;
          count = 0;
        }
          items.push({
            "name": child.val().name,
            "startTime": child.val().startTime,
            "date": today,
            "who": child.val().who,
            "where": child.val().where,
            "what": child.val().what,
            "key": child.key,
            "description": child.val().startTime + " @ " + child.val().where,
            "latitude": child.val().latitude + .0002*count,
            "longitude": child.val().longitude
          });
        }
        });
        this.setState({
          markers: items
        });
      });
  };

  // manages whether to display details of item or not
    onLearnMore = (item) => {
      this.setState({
        viewDetails: true,
        curItem: item,
      })
    };

    goBack = () => {
      this.setState({
        viewDetails: false
      })
    }

  // autoupdates on new event
  componentDidMount() {
    this.listenForItems(this.itemsRef);
  };

  render() {
    var styles = require('./Styles');
    if(!this.state.viewDetails) {
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
      </Container>
    );
  }
  else {
    return(
    <Details goBack={this.goBack} item={this.state.curItem}/>
   );
  }
 }
}
