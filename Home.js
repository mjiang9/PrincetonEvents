import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet, SectionList} from 'react-native';
import {ListItem} from 'react-native-elements';
import {today, tomorrow} from './Data';

export default class HomeScreen extends Component {
  onLearnMore = (item) => {
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
          <Text style={styles.title}>Princeton Events</Text>
        </View>
        <View style={styles.body}>
          <SectionList renderItem={({item}) =>
            <ListItem style={styles.item} title={item.name} subtitle={item.when}
              onPress={() => this.onLearnMore(item)}/>}
              renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.key}</Text>} sections={[
            {
              data: today,
              key: 'TODAY'
            }, {
              data: tomorrow,
              key: 'TOMORROW'
            }
          ]} keyExtractor={(item, index) => index}/>
        </View>
        <View style={styles.footer}>
          <TouchableHighlight style={styles.button} onPress={() => navigate('Input')} underlayColor='#ffd199'>
            <Text style={styles.buttonText}>+</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={() => navigate('MyEvents')} underlayColor='#ffd199'>
            <Text style={styles.buttonText}>My Events</Text>
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
