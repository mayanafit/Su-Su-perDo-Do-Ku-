import React from 'react';
import { Game, Home, Finish } from './pages';
import { Provider } from 'react-redux';
import store from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Home" component={Home}></Stack.Screen>
            <Stack.Screen name="Game" component={Game}></Stack.Screen>
            <Stack.Screen name="Finish" component={Finish}></Stack.Screen>
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
