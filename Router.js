import React from 'react';
import {StackNavigator} from 'react-navigation';

import InputScreen from './InputPage';
import HomeScreen from './Home';
import DetailsScreen from './Details';
import MyEventsScreen from './MyEvents';
import EditScreen from './EditPage';
import MapScreen from './Map';
import CreateAccountScreen from './CreateAccount';
import LoginScreen from './Login';
import Tab from './Tab';

export const Navigator = StackNavigator({
  Tab: {
    screen: Tab,
    navigationOptions: {
      header: null
    }
  },
  LogOut: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
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
