import React, {Component} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {ListItem, List, ListView} from 'react-native-elements';
import {firebaseApp} from './App';
import { StyleProvider, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon} from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import Edit from './EditPage';

export default class MyEventsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      viewEdit: false,
      curItem: null,
      userEmail: null,
      uid: null,
      userName: null,
    };
    this.itemsRef = firebaseApp.database().ref().child('items');
    let uid = firebaseApp.auth().currentUser.uid;
    this.userRef = firebaseApp.database().ref('users').child(uid).child("my_events");
    console.ignoredYellowBox = ['Setting a timer'];
  }

  // manages whether to display edit page or not
  onViewMyEvent = (item) => {
    this.setState({
      viewEdit: true,
      curItem: item,
    })
  };

  goBack = () => {
    this.setState({
      viewEdit: false,
    })
  }

  listenForItems = (itemsRef, userRef) => {
    userRef.on('value', (snap) => {
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
          child = ref.child(datum).once('value', (snap) => {
            if (snap.val() != null) {
              events.push({
                "key": snap.key,
                "name": snap.val().name,
                "startTime": snap.val().startTime,
                "endTime": snap.val().endTime,
                "date": item.date,
                "who": snap.val().who,
                "where": snap.val().where,
                "what": snap.val().what
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

  // autoupdates on new event
  componentDidMount() {
   this.listenForItems(this.itemsRef, this.userRef);
 }

 // removes listener
 componentWillUnmount() {
   this.userRef.off();
 }

  render() {
    var styles = require('./Styles');
    if(!this.state.viewEdit) {
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
          <Title>My Events</Title>
          </Body>
        </Header>
        <Content style={{backgroundColor: 'white'}}>
          {this.state.loading && <ActivityIndicator size="large" style={{marginTop: 200}}/>}
            {!this.state.loading && <FlatList data={this.state.data} renderItem={({item}) =>
              <ListItem style={styles.item} title={item.name} subtitle={item.startTime} containerStyle={{
              borderBottomWidth: 0
            }} onPress={() => this.onViewMyEvent(item)}/>} keyExtractor={(item) => item.key}/>}
        </Content>
      </Container>
      </StyleProvider>
    );
  }
  else {
    return(
    <Edit goBack={this.goBack} item={this.state.curItem}/>
   );
  }
 }
}
