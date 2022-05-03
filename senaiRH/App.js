import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Welcome from './src/pages/welcome/Welcome.js';
import Redirecionar from './src/pages/redirecionar/Redirecionar.js';
import MainMotivar from './src/pages/main/MainMotivar.js';
import AtividadesExtras from './src/pages/atividades/AtividadesExtras.js';
import Login from './src/pages/login/Login.js';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#C20004'} barStyle="light-content" />
      <Stack.Navigator>
        {/* <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
<<<<<<< HEAD
        <Stack.Screen name="Redirecionar" component={Redirecionar} />
        <Stack.Screen name="AtividadesExtras" component={AtividadesExtras} />
=======
        <Stack.Screen name="Redirecionar" component={Redirecionar} /> */}
>>>>>>> b57b34514fc181816a0bfeda6c03cf21365c8d4f
        <Stack.Screen name="MainMotivar" component={MainMotivar} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;