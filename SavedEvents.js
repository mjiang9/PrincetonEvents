import React, {Component} from 'react';
import {ActivityIndicator, FlatList, BackHandler} from 'react-native';
import {ListItem, List, ListView} from 'react-native-elements';
import {firebaseApp} from './App';
import { StyleProvider, Container, Header, Title, Content, Button, Left, Right, Body, Icon} from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import Details from './Details';

export default class SavedEventsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      viewDetails: false,
      curItem: null,
      userEmail: null,
      uid: null,
      userName: null,
    };
    this.itemsRef = firebaseApp.database().ref().child('items');
    let uid = firebaseApp.auth().currentUser.uid;
    this.userRef = firebaseApp.database().ref('users').child(uid).child("saved_events");
    console.ignoredYellowBox = ['Setting a timer'];
  }

  // manages whether to display edit page or not
  onViewSavedEvent = (item) => {
    this.setState({
      viewDetails: true,
      curItem: item,
    })
  };

  // takes details page back to saved events
  goBack = () => {
    this.setState({
      viewDetails: false,
      loading: true,
    })
    this.listenForItems(this.itemsRef, this.userRef);
  }

  listenForItems = (itemsRef, userRef) => {
    userRef.once('value').then((snap) => {
      var items = [];
      snap.forEach((parent) => {
        var children = [];
        parent.forEach((child) => {
          children.push(child.val().key);
        });
        items.push({
          date: parent.key,
          data: children,
        })
      });
      var events = [];
      items.forEach((item) => {
        ref = itemsRef.child(item.date);
        item.data.forEach((datum) => {
          child = ref.child(datum).once('value').then((snap) => {
            if (snap.val() != null) {
              events.push({
                "key": snap.key,
                "name": snap.val().name,
                "startTime": snap.val().startTime,
                "endTime": snap.val().endTime,
                "date": item.date,
                "who": snap.val().who,
                "where": snap.val().where,
                "what": snap.val().what,
                "latitude": snap.val().latitude,
                "longitude": snap.val().longitude,
              });
            } else {
              let eventRef = userRef.child("saved_events").child(item.date);
              eventRef.once('value', (snap) => {
                snap.forEach((child) => {
                  if (child.val().key == datum) {
                    eventRef.child(child.key).remove();
                  }
                })
              });
            }
        });
        });
      });
      this.setState({
        data: events,
        loading: false
      });
    });
  }

  // handles hardware back button pressed on Android
  // gets events from users' saved_events section
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.goBack();
      return true;
    });
    this.listenForItems(this.itemsRef, this.userRef);
  }


  render() {
    var styles = require('./Styles');
    if(!this.state.viewDetails) {
    return (
      <StyleProvider style={getTheme(material)}>
      <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => this.props.goBack()}>
            <Icon name='arrow-back'/>
          </Button>
        </Left>
        <Body>
        <Title>Saved Events</Title>
        </Body>
        <Right/>
      </Header>
        <Content style={{backgroundColor: 'white'}}>
          {this.state.loading && <ActivityIndicator size="large" style={{marginTop: 200}}/>}
            {!this.state.loading && <FlatList data={this.state.data} renderItem={({item}) =>
              <ListItem style={styles.item} title={item.name} subtitle={item.startTime} containerStyle={{
              borderBottomWidth: 0
            }} onPress={() => this.onViewSavedEvent(item)}/>} keyExtractor={(item) => item.key}/>}
        </Content>
      </Container>
      </StyleProvider>
    );
  }
  else {
    return(
    <Details goBack={this.goBack} item={this.state.curItem} isSaved={true}/>
   );
  }
 }
}
