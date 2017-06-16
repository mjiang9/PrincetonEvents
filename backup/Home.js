import React, { Component } from 'react';
import { View, Text, TouchableHighlight,
  StyleSheet, SectionList } from 'react-native';

export default class HomeScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    const arrayToday = ['Event 1', 'Event 2'];
    const arrayTmr = ['Event 3', 'Event 4', 'Event 5'];
    return (
      <View style={{flex: 1}}>
        <View style={styles.header} >
         <Text style={styles.title}>Princeton Events</Text>
        </View>
        <View style={styles.body} >
         <SectionList
           renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
           renderSectionHeader={({section}) =>
            <Text style={styles.sectionHeader}>{section.key}</Text>}
           sections={[ {data: arrayToday, key: 'TODAY'},
             {data: arrayTmr, key: 'TOMORROW'},
           ]}
           keyExtractor={(item, index) => index}
         />
        </View>
        <View style={styles.footer}>
         <TouchableHighlight style={styles.button}
         onPress={() => navigate('Input')} underlayColor='#ffd199'>
          <Text style={styles.buttonText}>+</Text>
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
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  body: {
    flex: 10,
    backgroundColor: 'white',
  },
  item: {
    color: 'darkorange',
    fontSize: 18,
    padding: 10,
  },
  sectionHeader: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#ffd199',
    fontSize: 16,
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
  },
  footer: {
    flex: 1,
  },
  button: {
    backgroundColor: 'darkorange',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 28,
  }
})
