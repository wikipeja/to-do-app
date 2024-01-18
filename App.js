import React from 'react';
import Landing from './components/Landing';
import Details from './components/Details'
import Add from './components/Add'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Landing} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Add" component={Add} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

