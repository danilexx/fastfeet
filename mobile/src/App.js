// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import { ThemeProvider } from 'styled-components';
import theme from './lib/Theme';
import { StoreProvider } from 'easy-peasy';
import store from './lib/Store';

const Stack = createStackNavigator();

function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator headerMode="none" initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={MainScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
