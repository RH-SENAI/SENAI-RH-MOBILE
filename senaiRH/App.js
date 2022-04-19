import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AuthStack = createNativeStackNavigator();

import Login from './src/screens/login';

function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />

      <AuthStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <AuthStack.Screen name="Login" component={Login} /> 
        {/* <AuthStack.Screen name="MinhasAtividades" component={MinhasAtividades} />
        <AuthStack.Screen name="Perfil" component={Perfil} />
        <AuthStack.Screen name="Redirecionamento" component={Redirecionamento} />
        <AuthStack.Screen name="Atividades" component={Atividades} />
        <AuthStack.Screen name="AtividadeComum" component={AtividadeComum} /> */}
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

export default App;