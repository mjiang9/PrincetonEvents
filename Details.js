import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { List, ListItem } from 'react-native-elements';

export default class DetailsScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    const { name, who, what, when, where, RSVP } =
     this.props.navigation.state.params;
    var styles = require('./Styles');
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.body}>
          <List>
            <ListItem rightTitleStyle={s.right}
              title="Who:"
              rightTitle={who}
              hideChevron
            />
          </List>
          <List>
            <ListItem rightTitleStyle={s.right}
              title="When:"
              rightTitle={when}
              hideChevron
            />
            <ListItem rightTitleStyle={s.right}
              title="Where:"
              rightTitle={where}
              hideChevron
            />
          </List>
          <List>
            <ListItem rightTitleStyle={s.right}
              rightTitleNumberOfLines={5}
              title="What:"
              rightTitle={what}
              hideChevron
            />
          </List>
          <List>
          <ListItem rightTitleStyle={s.right}
            title="RSVP Required:"
            rightTitle={RSVP}
            hideChevron
          />
          </List>
        </View>
       <View style={styles.footer}>
        <TouchableHighlight style={styles.button}
         onPress={() => navigate('Home')} underlayColor='#ffd199'>
         <Text style={{color: 'white', fontSize: 20}}>Back</Text>
        </TouchableHighlight>
       </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  right: {
    color: 'black',
    alignSelf: 'flex-start',
  }
})
