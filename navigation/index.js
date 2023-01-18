import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from '../screens/home.js';
import Quiz from '../screens/quiz.js';
import Result from '../screens/result.js';
import {NavigationContainer} from '@react-navigation/native';
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Stack.Screen name="Quiz" component={Quiz} options={{headerShown: false}} />
      <Stack.Screen name="Result" component={Result} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

export default MyStack;