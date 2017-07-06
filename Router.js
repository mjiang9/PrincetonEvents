import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {TabView} from 'react-navigation'

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

  Edit: {
    screen: EditScreen,
    navigationOptions: {
      header: null
    }
  }
});

export const MapStack = StackNavigator({

  EventMap: {
    screen: MapScreen,
    navigationOptions: {
      header: null

    }
  },

  Details: {
    screen: DetailsScreen,
    navigationOptions: {
      header: null
    }
  }
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
      header: null
    }
  }
});

export const Tabs = TabNavigator({
  Home: {
    screen: EventsStack
  },
  Location: {
    screen: MapStack
  },
  Input: {
    screen: InputScreen
  },
  MyEvents: {
    screen: MyEventsStack
  }
}, {
  tabBarPosition: 'bottom'
},);

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
    screen: Tabs
  }
}, {headerMode: 'none'});
