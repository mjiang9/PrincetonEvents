import React, {Component} from 'react';
import {ActivityIndicator, View, Text, TouchableHighlight,  SectionList, StatusBar} from 'react-native';
import {ListItem} from 'react-native-elements';
import {firebaseApp} from './App';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Tabs} from './Router';

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

  static navigationOptions = {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => (
        <Icon
          name = {'home'}
          size = {26}
          style = {{color: tintColor}} />
      ),
  }

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
    if (this.state.loading) {
      return (<View style={{flex: 1}}>
        <StatusBar hidden={true}/>
        <View style={styles.header}>
          <Text style={styles.title}>Princeton Events</Text>
        </View>
        <View style={{flex: 10, backgroundColor: 'white',
                      justifyContent: 'center', alignContent: 'center'}}>
          <ActivityIndicator size='large'/>
        </View>
      </View>);
    } else {
    return (
      <View style={{flex: 1}}>
        <StatusBar hidden={true}/>
        <View style={styles.header}>
          <Text style={styles.title}>Princeton Events</Text>
        </View>
        <View style={styles.body}>
        <SectionList renderItem={({item}) => <ListItem style={styles.item}
            title={item.name} subtitle={item.time}
            onPress={() => this.onLearnMore(item)}/>}
            renderSectionHeader={({section}) =>
            <Text style={styles.sectionHeader}>{section.key}</Text>}
            sections={this.state.data} keyExtractor={(item) => item.key}/>
        </View>
      </View>
    );
  }
  }
}
