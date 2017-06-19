import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet, FlatList} from 'react-native';
import {ListItem, List} from 'react-native-elements';


export default class MyEventsScreen extends Component {
  onViewMyEvent = (item) => {
    this.props.navigation.navigate('Details', {
      ...item
    });
  };
  render() {
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
            <FlatList data={[
              {
                "name": "Event 1",
                "who": "E-Club",
                "what": "description goes here description goes here description goes here",
                "when": "1:00",
                "where": "Ehub",
                "RSVP": "yes"
              }, {
                "name": "Event 2",
                "who": "Club 2",
                "what": "description goes here",
                "when": "2:00",
                "where": "Location 2",
                "RSVP": "no"
              }
            ]} renderItem={({item}) => <ListItem style={styles.item} title={item.name} subtitle={item.when} containerStyle={{
              borderBottomWidth: 0
            }} onPress={() => this.onViewMyEvent(item)}/>} keyExtractor={(item, index) => index}/>
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
const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: 'darkorange',
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white'
  },
  body: {
    flex: 10,
    backgroundColor: 'white'
  },
  item: {
    padding: 10
  },
  sectionHeader: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#ffd199',
    fontSize: 16,
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2
  },
  footer: {
    flex: 1,
    flexDirection: 'row'
  },
  button: {
    backgroundColor: 'darkorange',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 28
  }
})
