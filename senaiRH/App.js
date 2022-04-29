import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Welcome from './src/pages/welcome/Welcome.js';
import SignIn from './src/pages/signin/SignIn.js';
import Redirecionar from './src/pages/redirecionar/Redirecionar.js';
import MainAcompanhar from './src/pages/main/MainAcompanhar.js';
import MainVantagem from './src/pages/main/MainVantagem.js';
import Perfil from './src/pages/perfil/Perfil.js';
import Atividades from './src/pages/atividades/Atividades.js';
import AtividadesExtras from './src/pages/atividades/AtividadesExtras.js';
import Login from './src/pages/login/Login.js';
import MinhasAtividades from './src/pages/minhasAtividades/MinhasAtividades.js';
import MinhasExtras from './src/pages/minhasAtividades/MinhasExtras.js';
import RankingGp1 from './src/pages/rankingGp1/RankingGp1.js';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#C20004'} barStyle="light-content" />
      <Stack.Navigator>
        {/* <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Redirecionar" component={Redirecionar} options={{ headerShown: false }} />
        <Stack.Screen name="MainAcompanhar" component={MainAcompanhar} />
        <Stack.Screen name="MainVantagem" component={MainVantagem} options={{ headerShown: false }} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Atividades" component={Atividades} options={{ headerShown: false }} />
        <Stack.Screen name="AtividadesExtras" component={AtividadesExtras} options={{ headerShown: false }} />
        <Stack.Screen name="MinhasAtividades" component={MinhasAtividades} options={{ headerShown: false }} />
        <Stack.Screen name="MinhasExtras" component={MinhasExtras} options={{ headerShown: false }} />
        <Stack.Screen name="RankingGp1" component={RankingGp1} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;