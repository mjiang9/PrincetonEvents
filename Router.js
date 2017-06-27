import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';

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
  MyEventsDetails: {
    screen: EditScreen,
    navigationOptions: {
      header: null,
      /*navigation: ({ navigation }) => ({
      title: `${navigation.state.params.name.first.toUpperCase()} ${navigation.state.params.name.last.toUpperCase()}`,
    }),*/
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
      //swipeEnabled: true,
    }
});

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
