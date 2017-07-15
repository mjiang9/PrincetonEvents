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
import Tab from './Tab';

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

export const HomeStack = StackNavigator({
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

export const Navigator = StackNavigator({
  Tab: {
    screen: Tab,
    navigationOptions: {
      header: null
    }
  },
  Home: {
    screen: HomeStack
  },
  Map: {
    screen: MapStack
  },
  Input: {
    screen: InputScreen,
    navigationOptions: {
      header: null
    }
  },
  MyEvents: {
    screen: MyEventsStack
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
  Home: { screen: Navigator,
    navigationOptions: {
      header: null,
    }
  }
});

export const SuccessLoginNav = StackNavigator({
  Main: { screen: Navigator,
    navigationOptions: {
      header: null,
    }
  },
});


export const Root = StackNavigator({
  MainNav: {
    screen: Navigator
  }
}, {headerMode: 'none'});
