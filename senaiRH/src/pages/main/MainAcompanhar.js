import React from 'react';
import {
    View,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import NovoFeedback from '../novoFeedback/NovoFeedback.js';
import Democratizacao from '../democratizacao/Democratizacao.js';
import Dashboard from '../dashboard/Dashboard.js';
import Perfil from '../perfil/Perfil.js';
import Ranking from '../ranking/Ranking.js';

const Tab = createBottomTabNavigator();

export default function MainAcompanhar() {
    return (

        <Tab.Navigator initialRouteName='NovoFeedback'>
            <Tab.Screen name="Dashboard" component={Dashboard} />
            <Tab.Screen name="Democratizacao" component={Democratizacao} />
            <Tab.Screen name="NovoFeedback" component={NovoFeedback} />
            <Tab.Screen name="Ranking" component={Ranking} />
            <Tab.Screen name="Perfil" component={Perfil} />
        </Tab.Navigator>
    );
};
