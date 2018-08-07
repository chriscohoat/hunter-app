import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo';

const styles = StyleSheet.create({

});

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Record New Sound',
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#476C9B'}}>

      </View>

    );
  }
}
