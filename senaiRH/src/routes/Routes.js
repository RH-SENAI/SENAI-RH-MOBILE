import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ListagemCurso from '../screens/ListagemCurso/listagemCurso.js';

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ListagemCurso"
                component={ListagemCurso}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};