import React from 'react';
import {
    View,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import ListagemCurso from '../listagemCurso/ListagemCurso.js';
import ListagemDesconto from '../listagemDesconto/ListagemDesconto.js';
import Favoritos from '../favoritos/Favoritos.js'
import Perfil from '../perfil/Perfil.js';

const Tab = createBottomTabNavigator();

export default function MainAcompanhar() {
    return (

        <Tab.Navigator initialRouteName='NovoFeedback'>
            <Tab.Screen name="Cursos" component={ListagemCurso} options={{ headerShown: false }} />
            <Tab.Screen name='Descontos' component={ListagemDesconto} options={{ headerShown: false }} />
            <Tab.Screen name="Favoritos" component={Favoritos} options={{ headerShown: false }} />
            <Tab.Screen name="Perfil" component={Perfil} />
        </Tab.Navigator>
    );
};