import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './screens/Home';
import RecordSoundScreen from './screens/RecordSound';

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import reducers from './reducers'

const store = createStore(reducers);

const RootStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  RecordSound: {
    screen: RecordSoundScreen,
  }
});

export default class App extends React.Component {
  render() {
    return <Provider store={store}>
      <RootStack />
    </Provider>;
  }
}