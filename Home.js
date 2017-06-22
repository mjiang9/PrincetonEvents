import React, {Component} from 'react';
import {View, Text, TouchableHighlight,  SectionList} from 'react-native';
import {ListItem} from 'react-native-elements';
import {today, tomorrow} from './Data';

export default class HomeScreen extends Component {
  onLearnMore = (item) => {
    this.props.navigation.navigate('Details', {
      ...item
    });
  };
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
            title={item.name} subtitle={item.when} onPress={() => this.onLearnMore(item)}/>}
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
