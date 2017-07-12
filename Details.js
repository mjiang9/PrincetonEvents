import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Keyboard } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import MapView from 'react-native-maps';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Subtitle } from 'native-base';

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;

    // if no valid location, does not display Marker
    if(this.params.latitude == 0 && this.params.longitude == 0) {
      this.state = {showMarker: false}
    }
    else {
      this.state = {showMarker: true}
    }
  }
  render() {
    const { goBack } = this.props.navigation;
    const { name, who, what, startTime, endTime, date, where} =
     this.params;
    var styles = require('./Styles');
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => {
              goBack();
              Keyboard.dismiss();
            }}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
          <Title>{name}</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='heart'/>
            </Button>
          </Right>
        </Header>
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
              rightTitle={startTime}
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
              rightTitleNumberOfLines={4}
              title="Description:"
              rightTitle={what}
              hideChevron
            />
          </List>
          <MapView style={{height: 180, margin: 20 }}
              initialRegion={{ latitude: 40.347695, longitude: -74.657995,
              latitudeDelta: .01, longitudeDelta: .012 }} >
              <MapView.Marker
                coordinate={{
                  latitude: this.params.latitude,
                  longitude: this.params.longitude
                }}
                title={name}
                description={date + " " + startTime + " @ " + where} />
            </MapView>
          </View>
     </Container>
    );
  }
}

const s = StyleSheet.create({
  right: {
    color: 'black',
    alignSelf: 'flex-start',
  }
})
