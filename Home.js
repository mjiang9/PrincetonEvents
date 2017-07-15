import React, {Component} from 'react';
import {ActivityIndicator, SectionList, Text, Keyboard} from 'react-native';
import {ListItem} from 'react-native-elements';
import {firebaseApp} from './App';
import TabBar from './Tab';
import Details from './Details';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Item, Input, Label} from 'native-base';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      data: [],
      loading: true,
      searchText: "",
      searching: false,
      viewDetails: false,
      curItem: null,
    };
    this.itemsRef = firebaseApp.database().ref().child('items');
    console.ignoredYellowBox = [
         'Setting a timer'
     ];
  }

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

  firstSearch() {
    this.searchEvents(this.itemsRef);
  }
  // only return events with names/descriptions containing search text
  searchEvents(itemsRef) {
    var searchText = this.state.searchText.toString().toLowerCase();
    var results = [];
    if (searchText == ""){
      this.listenForItems(itemsRef);
    } else {
      items = this.state.dataSource;
      items.forEach((parent) => {
        var children = [];
        parent.data.forEach((child) => {
          if (child.name.toLowerCase().includes(searchText) ||
              child.what.toLowerCase().includes(searchText) ||
              child.who.toLowerCase().includes(searchText)) {
                children.push(child);
              }
        });
        if (children.length != 0) {
        results.push({
          data: children,
          key: parent.key.toUpperCase()
        })
      }
      });
   }
   this.setState({data: results});
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // get children as an array
      var items = [];
      snap.forEach((parent) => {
        var children = [];
        parent.forEach((child) => {
        children.push({
          "key": child.key,
          "name": child.val().name,
          "startTime": child.val().startTime,
          "endTime": child.val().endTime,
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
      let sorted = items.sort((a, b) => {
        if (parseInt(a.key.substring(4)) <= parseInt(b.key.substring(4))) {
          return -1;
        } else {
          return 1;
        }
      });
      this.setState({
        dataSource: items,
        data: items,
        loading: false
      });
    });
  }

  // autoupdates on new event
  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  // removes listener
  componentWillUnmount() {
    this.itemsRef.off();
  }

  render() {
    var styles = require('./Styles');
    if(!this.state.viewDetails) {
    return (
      <Container>
        {!this.state.searching &&
          <Header>
            <Body><Title>Princeton Events</Title></Body>
            <Right><Button transparent onPress={() => this.setState({searching: true})}>
              <Icon name="ios-search"/></Button>
            </Right>
          </Header>
        }
        {this.state.searching && <Header searchBar rounded>
          <Item>
            <Icon name="ios-search"/>
            <Input placeholder="Search..." returnKeyType='search'
            onChangeText={(text) => {this.setState({searchText:text}); this.firstSearch();}}
            onSearch={() => this.firstSearch()}/>
            <Label style={{color: 'black'}} onPress={() => {
              Keyboard.dismiss();
              this.setState({data: this.state.dataSource, searching: false})}}>
              <Text>Cancel</Text>
            </Label>
          </Item>
        </Header>}
      <Content style={{backgroundColor: 'white'}}>
        {this.state.loading && <ActivityIndicator size="large" style={{marginTop: 200}}/>}
        {!this.state.loading && <SectionList renderItem={({item}) =>
            <ListItem style={styles.item}
            title={item.name} subtitle={item.startTime}
            onPress={() => this.onLearnMore(item)}/>}
            renderSectionHeader={({section}) =>
            <Text style={styles.sectionHeader}>{section.key}</Text>}
            sections={this.state.data} keyExtractor={(item) => item.key}/>}
      </Content>
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
