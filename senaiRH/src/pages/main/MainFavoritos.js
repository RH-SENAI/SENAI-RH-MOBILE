import React from 'react';
import {
    View,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import FavoritosDesconto from '../favoritos/FavoritosCurso.js';
import FavoritosCurso from '../favoritos/FavoritosCurso.js';

const Tab = createBottomTabNavigator();

export default function MainFavoritos() {
    return (

        <Tab.Navigator>
            <Tab.Screen name="Favoritos" component={FavoritosCurso} options={{ headerShown: false }} />
            <Tab.Screen name="FavoritosDesconto" component={FavoritosDesconto} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};