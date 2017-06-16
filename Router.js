import React from 'react';
import { StackNavigator } from 'react-navigation';

import InputScreen from './Input';
import HomeScreen from './Home';
import DetailsScreen from './Details';

export const EventsStack = StackNavigator({
  Home: {
     screen: HomeScreen,
     navigationOptions: {
       header: null,
     },
   },
  Details: {
    screen: DetailsScreen,
    navigationOptions: {
      header: null,
      /*navigation: ({ navigation }) => ({
      title: `${navigation.state.params.name.first.toUpperCase()} ${navigation.state.params.name.last.toUpperCase()}`,
    }),*/
    },
  },
});

export const HomeStack = StackNavigator({
  Home: {
     screen: EventsStack,
     navigationOptions: {
       header: null,
     },
   },
  Input: {
    screen: InputScreen,
    navigationOptions: {
      header: null,
    },
  },
});


export const Root = StackNavigator({
  HomeStack: {
    screen: HomeStack,
  },
}, {
  headerMode: 'none',
});
