import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Welcome from './src/pages/welcome/Welcome.js';
import Redirecionar from './src/pages/redirecionar/Redirecionar.js';
import MainMotivar from './src/pages/main/MainMotivar.js';
import Login from './src/pages/login/Login.js';
import MinhasExtras from './src/pages/minhasAtividades/MinhasExtras'
import AtividadesExtras from './src/pages/atividades/AtividadesExtras.js';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#C20004'} barStyle="light-content" />
      <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="AtividadesExtras" component={AtividadesExtras} />
        {/* <Stack.Screen name="MinhasExtras" component={MinhasExtras} /> */}
        {/* <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Redirecionar" component={Redirecionar} options={{ headerShown: false }} />
        <Stack.Screen name="MainMotivar" component={MainMotivar} options={{ headerShown: false }}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;