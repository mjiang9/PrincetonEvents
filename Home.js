import React, {Component} from 'react';
import {ActivityIndicator, View, Text, TouchableHighlight,  SectionList} from 'react-native';
import {ListItem} from 'react-native-elements';
import {firebaseApp} from './App';
import TabBar from './Tab';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Spinner} from 'native-base';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
    this.itemsRef = firebaseApp.database().ref().child('items');
    console.ignoredYellowBox = [
         'Setting a timer'
     ];
  }
  onLearnMore = (item) => {
    this.props.navigation.navigate('Details', {
      ...item
    });
  };

  listenForItems(itemsRef) {
    itemsRef.orderByKey().on('value', (snap) => {
      // get children as an array
      var items = [];
      snap.forEach((parent) => {
        var children = [];
        parent.forEach((child) => {
        children.push({
          "key": child.key,
          "name": child.val().name,
          "time": child.val().when, //change eventually to time
          "date": parent.key,
          "who": child.val().who,
          "where": child.val().where,
          "what": child.val().what,
          "latitude": child.val().latitude,
          "longitude": child.val().longitude
        });
      });
      items.push({
        data: children,
        key: parent.key.toUpperCase(),
      })
      });
      this.setState({
        data: items,
        loading: false
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
          <Body>
          <Title>Princeton Events</Title>
          </Body>
        </Header>
      <Content>
        {this.state.loading && <Spinner/>}
        {!this.state.loading && <SectionList renderItem={({item}) => <ListItem style={styles.item}
            title={item.name} subtitle={item.time}
            onPress={() => this.onLearnMore(item)}/>}
            renderSectionHeader={({section}) =>
            <Text style={styles.sectionHeader}>{section.key}</Text>}
            sections={this.state.data} keyExtractor={(item) => item.key}/>}
      </Content>
      <Footer>
        <TabBar navigate={navigate} screen='Home'/>
      </Footer>
      </Container>
    );
  }
}
