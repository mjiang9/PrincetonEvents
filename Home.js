import React, {Component} from 'react';
import {View, Text, TouchableHighlight,  SectionList} from 'react-native';
import {ListItem} from 'react-native-elements';
import {firebaseApp} from './App';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {Tabs} from './Router';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
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
          name = {'Home'}
          size = {26}
          style = {{color: tintColor}} />
      )
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
          "when": child.val().when,
          "who": child.val().who,
          "where": child.val().where,
          "what": child.val().what
        });
      });
      items.push({
        data: children,
        key: parent.key.toUpperCase(),
      })
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
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.title}>Princeton Events</Text>
        </View>
        <View style={styles.body}>
        <SectionList renderItem={({item}) => <ListItem style={styles.item}
            title={item.name} subtitle={item.when}
            onPress={() => this.onLearnMore(item)}/>}
            renderSectionHeader={({section}) =>
            <Text style={styles.sectionHeader}>{section.key}</Text>}
            sections={this.state.data} keyExtractor={(item) => item.key}/>
        </View>
        <View style={styles.footer}>

          <TouchableHighlight style={styles.button} onPress={() => navigate('Home')} underlayColor='#ffd199'>
            <Text style={styles.buttonText}>H</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.button} onPress={() => navigate('Input')} underlayColor='#ffd199'>
            <Text style={{
              color: 'white',
              fontSize: 28
            }}>+</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.button} onPress={() => navigate('Map')} underlayColor='#ffd199'>
            <Text style={styles.buttonText}>M</Text>
          </TouchableHighlight>


          <TouchableHighlight style={styles.button} onPress={() => navigate('MyEvents')} underlayColor='#ffd199'>
            <Text style={styles.buttonText}>E</Text>
          </TouchableHighlight>

        </View>
      </View>
    );
  }
}
