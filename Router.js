import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';

import InputScreen from './InputPage';
import HomeScreen from './Home';
import DetailsScreen from './Details';
import MyEventsScreen from './MyEvents';
import EditScreen from './EditPage';
import MapScreen from './Map';


export const Tabs = TabNavigator({
  Home: {screen: HomeScreen},
  EventMap: {screen: MapScreen},
  Input: {screen: InputScreen},
  MyEvents:{screen: MyEventsScreen},
},{
    tabBarOptions: {
      activeTintColors: '#e91e63',
      //swipeEnabled: true,
    }
});

export const EventsStack = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  Details: {
    screen: DetailsScreen,
    navigationOptions: {
      header: null,
      /*navigation: ({ navigation }) => ({
      title: `${navigation.state.params.name.first.toUpperCase()} ${navigation.state.params.name.last.toUpperCase()}`,
    }),*/
    }
  }
});

export const HomeStack = StackNavigator({
  Home: {
    screen: EventsStack,
    navigationOptions: {
      header: null
    }
  },
  MyEvents: {
    screen: MyEventsScreen,
    navigationOptions: {
      header: null
    }
  },
  Input: {
    screen: InputScreen,
    navigationOptions: {
      header: null
    }
  },
  Edit: {
    screen: EditScreen,
    navigationOptions: {
      header: null
    }
  },
  Map: {
    screen: MapScreen,
    navigationOptions: {
      header: null
    }
  }
});

export const Root = StackNavigator({
  HomeStack: {
    screen: HomeStack,
    //screen: Tabs
  }
}, {headerMode: 'none'});
