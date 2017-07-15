import React, { Component } from 'react';
import { Text, View, StyleSheet, BackHandler, Keyboard, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import MapView from 'react-native-maps';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Subtitle } from 'native-base';
import Tab from './Tab';

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    // if no valid location, does not display Marker
    if(this.props.item.latitude == 0 && this.props.item.longitude == 0) {
      this.state = {showMarker: false}
    }
    else {
      this.state = {showMarker: true}
    }
  }

// handles hardwar back button pressed on Android
componentDidMount() {
  BackHandler.addEventListener('hardwareBackPress', () => {
    this.props.goBack();
    return true;
  });
}

  render() {
    // data fields from the selected item
    const { name, who, what, startTime, endTime, date, where, indexBack} =
     this.props.item;
    // checks if an endTime exists, if so, appends it to startTime
    var time = startTime;
    if (endTime != "N") { time = startTime + " - " + endTime;}
    var styles = require('./Styles');
    return (
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
            <Button transparent>
              <Icon name='heart'/>
            </Button>
          </Right>
        </Header>
        <ScrollView style={styles.body}>
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
    );
  }
}
