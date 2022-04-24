import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Entypo, Feather } from '@expo/vector-icons'

import NovoFeedback from '../novoFeedback/NovoFeedback.js'
import Democratizacao from '../democratizacao/Democratizacao.js'
import Dashboard from '../dashboard/Dashboard.js'
import Perfil from '../perfil/Perfil.js'
import Ranking from '../ranking/Ranking.js'

const Tab = createBottomTabNavigator();

function ButtonNew({ size, color }) {
    return (
        <View style={styles.container}>
            {/* <Image
                color={color}
                size={size}
                source={require("../../../assets/imgMobile/btnMais.png")}
                style={styles.imgEntrando}
                resizeMode="contain"
            /> */}
            <Entypo name="plus" color={color} size={size} />
        </View>
    )
}

export default function MainAcompanhar() {
    return (

        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#C20004',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: true,
                tabBarStyle: {
                    //   height: 60,
                    backgroundColor: '#121212',
                    borderTopColor: 'transparent',
                    paddingBottom: 5,
                    paddingTop: 5
                }
            }}
            initialRouteName='NovoFeedback'
        >
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ tabBarIcon: ({ size, color }) => (<Feather name="pie-chart" size={size} color={color} />) }}
            />
            <Tab.Screen
                name="Democratizacao"
                component={Democratizacao}
                options={{ tabBarIcon: ({ size, color }) => (<Entypo name="chat" size={size} color={color} />) }}
            />
            <Tab.Screen
                name="NovoFeedback"
                component={NovoFeedback}
                options={{ tabBarIcon: ({ size, color }) => (<ButtonNew size={40} color={color} />), tabBarLabel: '' }}
            />
            <Tab.Screen
                name="Ranking"
                component={Ranking}
                options={{ tabBarIcon: ({ size, color }) => (<Entypo name="medal" size={size} color={color} />) }}
            />
            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{ tabBarIcon: ({ size, color }) => (<Feather name="user" size={size} color={color} />) }}
            />
        </Tab.Navigator>
    );
};


const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderWidth: 4,
        borderColor: '#f1f1f1'
    },
});