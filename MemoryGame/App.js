import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {Ionicons, FontAwesome, Entypo} from '@expo/vector-icons'

import Header from './src/component/Header'
import Score from './src/component/Score'
import Card from './src/component/Card'
import Helper from './src/helpers/helpers'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
