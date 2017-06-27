import React, {Component} from 'react';
import {View, Text, TouchableHighlight, FlatList} from 'react-native';
import {ListItem, List, ListView} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {firebaseApp} from './App';

export default class MyEventsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.itemsRef = firebaseApp.database().ref('items/today');
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
      snap.forEach((child) => {
        items.push({
          "key": child.key,
          "name": child.val().name,
          "when": child.val().when,
          "who": child.val().who,
          "where": child.val().where,
          "what": child.val().what
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

  static navigationOptions = {
      tabBarLabel: 'MyEvents',
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
              <ListItem style={styles.item} title={item.name} subtitle={item.when} containerStyle={{
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
