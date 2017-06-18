import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { List, ListItem } from 'react-native-elements';

export default class DetailsScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;
    const { name, who, what, when, where, RSVP } =
     this.props.navigation.state.params;
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.body}>
          <List>
            <ListItem rightTitleStyle={styles.right}
              title="Who:"
              rightTitle={who}
              hideChevron
            />
          </List>
          <List>
            <ListItem rightTitleStyle={styles.right}
              title="When:"
              rightTitle={when}
              hideChevron
            />
            <ListItem rightTitleStyle={styles.right}
              title="Where:"
              rightTitle={where}
              hideChevron
            />
          </List>
          <List>
            <ListItem rightTitleStyle={styles.right}
              rightTitleNumberOfLines={5}
              title="What:"
              rightTitle={what}
              hideChevron
            />
          </List>
          <List>
          <ListItem rightTitleStyle={styles.right}
            title="RSVP Required:"
            rightTitle={RSVP}
            hideChevron
          />
          </List>
        </View>
       <View style={styles.footer}>
        <TouchableHighlight style={styles.button}
         onPress={() => navigate('Home')} underlayColor='#ffd199'>
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
    fontSize: 20,
  },
  right: {
    color: 'black',
    alignSelf: 'flex-start',
  }
})
