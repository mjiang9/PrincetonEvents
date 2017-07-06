import React, {Component} from 'react';
import {ActivityIndicator, View, Text, TouchableHighlight, FlatList} from 'react-native';
import {ListItem, List, ListView} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {firebaseApp} from './App';

export default class MyEventsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
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
        data: items,
        loading: false
      });
    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  static navigationOptions = {
      tabBarLabel: 'My Events',
      tabBarIcon: ({tintColor}) => (
        <Icon
          name = {'account-circle'}
          size = {26}
          style = {{color: tintColor}} />
      )

  }


  render() {
    var styles = require('./Styles');
    const {navigate} = this.props.navigation;
    if (this.state.loading) {
      return (<View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.title}>My Events</Text>
        </View>
        <View style={{flex: 10, backgroundColor: 'white',
                      justifyContent: 'center', alignContent: 'center'}}>
          <ActivityIndicator size='large'/>
        </View>
      </View>);
    } else {
    return (
      <View style={{
        flex: 1
      }}>
        <View style={styles.header}>
          <Text style={styles.title}>My Events</Text>
        </View>
        <View style={styles.body}>
          <List containerStyle={{
            borderTopWidth: 0,
            borderBottomWidth: 0
          }}>
            <FlatList data={this.state.data} renderItem={({item}) =>
              <ListItem style={styles.item} title={item.name} subtitle={item.time} containerStyle={{
              borderBottomWidth: 0
            }} onPress={() => this.onViewMyEvent(item)}/>} keyExtractor={(item) => item.key}/>
          </List>
        </View>
        <View style={styles.footer}>
          <TouchableHighlight style={styles.button} onPress={() => navigate('Home')} underlayColor='#ffd199'>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  }
}
