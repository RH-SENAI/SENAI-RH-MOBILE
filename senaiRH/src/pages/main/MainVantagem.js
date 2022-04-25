import React from 'react';
import {
    View,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import ListagemCurso from '../listagemCurso/ListagemCurso.js';
import Perfil from '../perfil/Perfil.js';

const Tab = createBottomTabNavigator();

export default function MainAcompanhar() {
    return (

        <Tab.Navigator initialRouteName='NovoFeedback'>
            <Tab.Screen name="Perfil" component={Perfil} />
            <Tab.Screen name="ListagemCurso" component={ListagemCurso} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};