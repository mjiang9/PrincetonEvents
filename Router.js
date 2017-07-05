import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';

import InputScreen from './InputPage';
import HomeScreen from './Home';
import DetailsScreen from './Details';
import MyEventsScreen from './MyEvents';
import EditScreen from './EditPage';
import MapScreen from './Map';
import CreateAccountScreen from './CreateAccount';
import LoginScreen from './Login';

export const MyEventsStack = StackNavigator({

  MyEvents: {
    screen: MyEventsScreen,
    navigationOptions: {
      header: null
    }
  },
  MyEventsDetails: {
    screen: EditScreen,
    navigationOptions: {
      header: null,
    },
  },
});


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
    },
  },
});

export const Tabs = TabNavigator({
  Home: {screen: EventsStack},
  EventMap: {screen: MapScreen},
  Input: {screen: InputScreen},
  MyEvents:{screen: MyEventsStack},
},{
    tabBarOptions: {
      activeTintColors: '#e91e63',
    }
});

export const LoginNav = StackNavigator({
  Login: { screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
  CreateAccount: { screen: CreateAccountScreen,
    navigationOptions: {
      header: null,
    }
  },
  Home: { screen: Tabs,
    navigationOptions: {
      header: null,
    }
  }
});

export const SuccessLoginNav = StackNavigator({
  Main: { screen: Tabs,
    navigationOptions: {
      header: null,
    }
  },
});


export const Root = StackNavigator({
  TabNav: {
    screen: Tabs,
  }
}, {headerMode: 'none'});
