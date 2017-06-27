import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {TabView} from 'react-navigation'

import InputScreen from './InputPage';
import HomeScreen from './Home';
import DetailsScreen from './Details';
import MyEventsScreen from './MyEvents';
import EditScreen from './EditPage';
import MapScreen from './Map';

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
},
{
tabBarPosition: 'bottom',
},
);

/*export const HomeStack = StackNavigator({
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
  },
  TabNav: {
    screen: Tabs,
  }
});*/

export const Root = StackNavigator({
  TabNav: {
    screen: Tabs,
  }


}, {headerMode: 'none'});
