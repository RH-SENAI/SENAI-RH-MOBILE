import * as React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//LogBox.ignoreAllLogs(true)

import Welcome from './src/pages/welcome/Welcome.js';
import Login from './src/pages/login/Login.js';
import SignIn from './src/pages/signin/SignIn.js'
import Redirecionar from './src/pages/redirecionar/Redirecionar.js'
import MainAcompanhar from './src/pages/main/MainAcompanhar.js'
import CadastrarFeedback from "./src/pages/democratizacao/CadastrarFeedback";
import ListarFeedback from "./src/pages/democratizacao/ListarFeedbacks"
import ListarDecisao from "./src/pages/democratizacao/ListarDecisao"
import MainMotivar from './src/pages/main/MainMotivar.js';
import recuperarSenha from "./src/pages/alterarSenha/recuperarSenha";
import primeiroAcesso from './src/pages/alterarSenha/primeiroAcesso.js';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#C20004'} barStyle="light-content" />
      <Stack.Navigator screenOptions={{headerShown : false}}>
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="Redirecionar" component={Redirecionar} />
        <Stack.Screen name="MainAcompanhar" component={MainAcompanhar} />
        <Stack.Screen name="CadastrarFeedback" component={CadastrarFeedback} initialParams={{a : true}} />
        <Stack.Screen name="ListarFeedbacks" component={ListarFeedback} />
        <Stack.Screen name="ListarDecisao" component={ListarDecisao} />
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Redirecionar" component={Redirecionar} options={{ headerShown: false }}/>
        <Stack.Screen name="MainMotivar" component={MainMotivar} options={{ headerShown: false }} />
        <Stack.Screen name="recuperarSenha" component={recuperarSenha} options={{ headerShown: false }} />
        <Stack.Screen name="primeiroAcesso" component={primeiroAcesso} options={{ headerShown: false }} />
        {/* <Stack.Screen name="RankingGp1" component={RankingGp1} options={{ headerShown: false }} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;