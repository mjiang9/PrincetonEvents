import React, {Component} from 'react';
import {View, Text, TouchableHighlight, FlatList} from 'react-native';
import {ListItem, List, ListView} from 'react-native-elements';
import {firebaseApp} from './App';
import TabBar from './Tab';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon} from 'native-base';

export default class MyEventsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.itemsRef = firebaseApp.database().ref().child('items');
    console.ignoredYellowBox = ['Setting a timer'];
  }

  onViewMyEvent = (item) => {
    this.props.navigation.navigate('Edit', {
      ...item
    });
  };

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // get children as an array
      var items = [];
      snap.forEach((parent) => {
        parent.forEach((child) => {
        items.push({
          "key": child.key,
          "name": child.val().name,
          "time": child.val().when, //change eventually to time
          "date": parent.key,
          "who": child.val().who,
          "where": child.val().where,
          "what": child.val().what
        });
      });

      });
      this.setState({
        data: items
      });
    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  render() {
    var styles = require('./Styles');
    const {navigate} = this.props.navigation;
    return (
      <Container>
        <Header>
          <Title>My Events</Title>
        </Header>
        <Content>
            <FlatList data={this.state.data} renderItem={({item}) =>
              <ListItem style={styles.item} title={item.name} subtitle={item.time} containerStyle={{
              borderBottomWidth: 0
            }} onPress={() => this.onViewMyEvent(item)}/>} keyExtractor={(item) => item.key}/>
        </Content>
        <Footer>
          <TabBar navigate={navigate} screen='MyEvents'/>
        </Footer>
      </Container>
    );
  }
}
