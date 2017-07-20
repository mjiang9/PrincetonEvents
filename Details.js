import React, { Component } from 'react';
import { Text, View, StyleSheet, Keyboard, ScrollView, BackHandler } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import MapView from 'react-native-maps';
import { StyleProvider, Container, Header, Title, Content, Footer, Toast,
  FooterTab, Button, Left, Right, Body, Icon} from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import {firebaseApp} from './App';

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    let showMarker = true;

    // if no valid location, does not display Marker
    if(this.props.item.latitude === 0 && this.props.item.longitude === 0) {
      showMarker = false;
    }

    this.extraKey; // key created by firebase for when pushing new data

    if(this.props.isSaved) {
    this.state = {
      heartColor: 'red',
      savedEvent: true,
      showMarker: showMarker,
    }
  }
  else {
    this.state = {
      heartColor: 'white',
      savedEvent: false,
      showMarker: showMarker,
    }
  }

    let uid = firebaseApp.auth().currentUser.uid;
    this.userRef = firebaseApp.database().ref('users').child(uid).child("saved_events");

    console.ignoredYellowBox = ['Setting a timer'];
  }

// handles hardwar back button pressed on Android
componentDidMount() {
  BackHandler.addEventListener('hardwareBackPress', () => {
    this.props.goBack();
    return true;
  });
}

save(date, key) {
  if(this.state.savedEvent) {
    if (this.extraKey == null) {
      this.userRef.child(date).on('value', (snap) => {
        snap.forEach((child) => {
          if (child.val().key == key) {
            this.userRef.child(date).child(child.key).remove();
          }
        })
      })
    } else { this.userRef.child(date).child(this.extraKey).remove(); }
    this.setState({heartColor: 'white', savedEvent: false});
    Toast.show({
        text: 'Event Unsaved!',
        position: 'bottom',
        duration: 1800,
    })
  }
  else {
    this.extraKey = this.userRef.child(date).push({key}).key;
    this.setState({heartColor: 'red', savedEvent: true});
    Toast.show({
        text: 'Event Saved!',
        position: 'bottom',
        duration: 1800,
    })
  }
}

  render() {
    // data fields from the selected item
    const { key, name, who, what, startTime, endTime, date, where, indexBack} =
     this.props.item;
    // checks if an endTime exists, if so, appends it to startTime
    var time = startTime;
    if (endTime !== "N") { time = startTime + " - " + endTime;}
    var styles = require('./Styles');
    return (
      <StyleProvider style={getTheme(material)}>
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => {
              this.props.goBack();
            }}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
          <Title>Event Details</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => {
              this.save(date, key);
            }}>
              <Icon style={{color: this.state.heartColor}} name='heart'/>
            </Button>
          </Right>
        </Header>
        <ScrollView style={{backgroundColor: 'white'}}>
        <List containerStyle={{
          borderTopWidth: 0,
          borderBottomWidth: 0
        }}>
        <ListItem
          style={styles.item}
          title={<View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold', flexWrap: 'wrap'}}>{name}</Text>
                 </View>}
          hideChevron
        />
            <ListItem
              style={styles.item}
              title={<View style={{flexDirection: 'row'}}>
                      <Icon name='person'/>
                      <Text style={{paddingLeft: 20, paddingRight: 20, paddingTop: 5, flexWrap: 'wrap'}}>{who}</Text>
                     </View>}
              hideChevron
            />
            <ListItem
              style={styles.item}
              title={<View style={{flexDirection: 'row'}}>
                      <Icon name='calendar'/>
                      <Text style={{paddingLeft: 20, paddingRight: 20, paddingTop: 5, flexWrap: 'wrap'}}>{date}</Text>
                     </View>}
              hideChevron
            />
            <ListItem
              style={styles.item}
              title={<View style={{flexDirection: 'row'}}>
                      <Icon name='time'/>
                      <Text style={{paddingLeft: 20, paddingRight: 20, paddingTop: 5, flexWrap: 'wrap'}}>{time}</Text>
                     </View>}
              hideChevron
            />
            <ListItem
              style={styles.item}
              title={<View style={{flexDirection: 'row'}}>
                      <Icon name='pin'/>
                      <Text style={{paddingLeft: 20, paddingRight: 20, paddingTop: 5, flexWrap: 'wrap'}}>{where}</Text>
                     </View>}
              hideChevron
            />
            <ListItem
              style={styles.item}
              title={<View style={{flexDirection: 'row'}}>
                      <Icon name='list'/>
                      <Text style={{paddingLeft: 20, paddingRight: 20, flexWrap: 'wrap'}}>{what}</Text>
                     </View>}
              hideChevron
            />
          </List>
          <MapView style={{height: 180, margin: 20, marginBottom: 40 }}
              initialRegion={{ latitude: 40.347695, longitude: -74.657995,
              latitudeDelta: .01, longitudeDelta: .012 }} >
              <MapView.Marker
                coordinate={{
                  latitude: this.props.item.latitude,
                  longitude: this.props.item.longitude
                }}
                title={name}
                description={date + " " + time + " @ " + where} />
            </MapView>
          </ScrollView>
     </Container>
     </StyleProvider>
    );
  }
}
