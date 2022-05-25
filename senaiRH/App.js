import * as React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//LogBox.ignoreAllLogs(true)


//telas juntas
import Welcome from './src/pages/welcome/Welcome.js';
import Login from './src/pages/login/Login.js';
import Redirecionar from './src/pages/redirecionar/Redirecionar.js'
import Perfil from './src/pages/perfil/Perfil.js';

//mains
import MainAcompanhar from './src/pages/main/MainAcompanhar.js'
import MainMotivar from './src/pages/main/MainMotivar.js';
import MainVantagem from './src/pages/main/MainVantagem'

//gp1
import recuperarSenha from "./src/pages/alterarSenha/recuperarSenha";
import primeiroAcesso from './src/pages/alterarSenha/primeiroAcesso.js';
import Atividades from './src/pages/atividades/Atividades.js';
import RankingGp1 from './src/pages/rankingGp1/RankingGp1.js';
import MinhasAtividades from './src/pages/minhasAtividades/MinhasAtividades.js';

//gp2
import FavoritosCurso from './src/pages/favoritos/FavoritosCurso.js';
import FavoritosDesconto from './src/pages/favoritos/FavoritosDesconto.js';
import ComentarioDesconto from './src/pages/listagemDesconto/ComentarioDesconto';

//gp3
import CadastrarFeedback from "./src/pages/democratizacao/CadastrarFeedback";
import ListarFeedback from "./src/pages/democratizacao/ListarFeedbacks"
import ListarDecisao from "./src/pages/democratizacao/ListarDecisao"

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

const Stack = createNativeStackNavigator();

function App() {
  if (!global.Intl) {
    global.Intl = require('intl');
  }
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#C20004'} barStyle="light-content" />

      <Stack.Navigator screenOptions={{headerShown : false}}>

      {/* conjuntas */}
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Redirecionar" component={Redirecionar} />
        <Stack.Screen name="Perfil" component={Perfil} />

      {/* mains */}
        <Stack.Screen name="MainAcompanhar" component={MainAcompanhar} />
        <Stack.Screen name="MainMotivar" component={MainMotivar} options={{ headerShown: false }} />
        <Stack.Screen name="MainVantagem" component={MainVantagem} options={{ headerShown: false }} />

      {/* gp1 */}

        <Stack.Screen name="recuperarSenha" component={recuperarSenha} options={{ headerShown: false }} />
        <Stack.Screen name="primeiroAcesso" component={primeiroAcesso} options={{ headerShown: false }} />
        <Stack.Screen name="Atividades" component={Atividades} options={{ headerShown: false }} />
        <Stack.Screen name="MinhasAtividades" component={MinhasAtividades} options={{ headerShown: false }} />
        
      {/* gp2 */}
        <Stack.Screen name="FavoritosDesconto" component={FavoritosDesconto} options={{ headerShown: false }} />
        <Stack.Screen name="RankingGp1" component={RankingGp1} options={{ headerShown: false }} /> 
        <Stack.Screen name="Favoritos" component={FavoritosCurso} options={{ headerShown: false }} />
        <Stack.Screen name="ComentarioDesconto" component={ComentarioDesconto} options={{ headerShown: false }} />

      {/* gp3 */}
        <Stack.Screen name="CadastrarFeedback" component={CadastrarFeedback} initialParams={{a : true}} />
        <Stack.Screen name="ListarFeedbacks" component={ListarFeedback} />
        <Stack.Screen name="ListarDecisao" component={ListarDecisao} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;