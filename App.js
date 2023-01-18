import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Home from './screens/home.js';
import Quiz from './screens/quiz.js';
import Result from './screens/result.js';
import MyStack from './navigation/index.js'
import { Card } from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
 


// Driver function for entire app
const App = () => {
  return (

      <NavigationContainer>
        <MyStack />
      </NavigationContainer>


  );

};

// Converts to useable mobile app in emulator
export default App;


// Similar CSS sheet for elements of app
const styles = StyleSheet.create({
  container: {
    paddingTop:40,
    paddingHorizontal: 16,
  }
});
