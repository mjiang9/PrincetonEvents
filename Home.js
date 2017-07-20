import React, {Component} from 'react';
import {ActivityIndicator, SectionList, Text, Keyboard} from 'react-native';
import {ListItem} from 'react-native-elements';
import {firebaseApp} from './App';
import Details from './Details';
import {StyleProvider, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Item, Input, Label} from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

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
      isSaved: false,
    };
    this.itemsRef = firebaseApp.database().ref('items');
    let uid = firebaseApp.auth().currentUser.uid;
    this.userRef = firebaseApp.database().ref('users').child(uid).child("saved_events");
    console.ignoredYellowBox = ['Setting a timer'];
  }

// manages whether to display details of item or not
  onLearnMore = (item, userRef) => {
    let isCurItemSaved = false;
    // get key of event + check if it is in user's saved events. if it is, color=red
      key = item.key;
      console.log(key);
      userRef.child(item.date).once('value').then((snap) => {
        snap.forEach((child) => {
          console.log('key: ' + child.val().key)
          if (child.val().key === key) {
            isCurItemSaved = true;
          }
        });
        this.setState({
          viewDetails: true,
          curItem: item,
          isSaved: isCurItemSaved,
        })
      });
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
      children.sort((a, b) => { // sort children by time
        timeA = this.time(a.startTime);
        timeB = this.time(b.startTime);
        return new Date('2017/01/01 ' + timeA) - new Date('2017/01/01 ' + timeB);
      });
      items.push({
        data: children,
        key: parent.key.toUpperCase(),
      })
      });
      let sorted = items.sort((a, b) => { // sort parents by date
        var month = {"JAN": 1, "FEB": 2, "MAR": 3, "APR": 4, "MAY": 5, "JUN": 6,
                      "JUL": 7, "AUG": 8, "SEP": 9, "OCT": 10, "NOV": 11, "DEC": 12};
        month1 = month[a.key.substring(0, 3)];
        month2 = month[b.key.substring(0, 3)];
        if (month1 - month2 > 10) { return -1; } // December, January
        else if (month1 - month2 < -10){ return 1; } // January, December
        else if (month1 < month2) { return -1; }
        else if (month1 == month2) {
          if (parseInt(a.key.substring(4)) < parseInt(b.key.substring(4))) {
            return -1;
          } else {
            return 1;
          }
        }
        else { return 1; }
      });
      this.setState({
        dataSource: items,
        data: items,
        loading: false
      });
    });
  }
  // transform time into a format that javascript can easily sort
  time(time) {
    var newTime = time;
    if (time.charAt(1) == ':') newTime = '0' + time;
    newTime = newTime.substring(0, 6);
    if (time.charAt(6) == 'a') newTime = newTime + "am";
    else newTime = newTime + "pm";
    return newTime;
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
      <StyleProvider style={getTheme(material)}>
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
              <Text style={{fontSize: 12}}>Cancel</Text>
            </Label>
          </Item>
        </Header>}
      <Content style={{backgroundColor: 'white'}}>
        {this.state.loading && <ActivityIndicator size="large" style={{marginTop: 200}}/>}
        {!this.state.loading && <SectionList renderItem={({item}) =>
            <ListItem style={styles.item}
            title={item.name} subtitle={item.startTime}
            onPress={() => this.onLearnMore(item, this.userRef)}/>}
            renderSectionHeader={({section}) =>
            <Text style={styles.sectionHeader}>{section.key}</Text>}
            sections={this.state.data} keyExtractor={(item) => item.key}/>}
      </Content>
      </Container>
      </StyleProvider>
    );
  }
  else {
    return(
    <Details goBack={this.goBack} item={this.state.curItem} isSaved={this.state.isSaved}/>
   );
  }
 }
}
