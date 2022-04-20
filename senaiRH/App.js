import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Welcome from './src/pages/welcome/Welcome.js'
import SignIn from './src/pages/signin/SignIn.js'
import Redirecionar from './src/pages/redirecionar/Redirecionar.js'
import MainAcompanhar from './src/pages/main/MainAcompanhar.js'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#C20004'} barStyle="light-content" />
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="Redirecionar" component={Redirecionar} />
        <Stack.Screen name="MainAcompanhar" component={MainAcompanhar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;