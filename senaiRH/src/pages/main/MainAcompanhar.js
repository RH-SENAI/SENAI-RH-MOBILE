import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Image, Pressable, Modal, Alert
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { useNavigation } from "@react-navigation/native";

import { Entypo, Feather } from '@expo/vector-icons'

//import NovoFeedback from '../novoFeedback/NovoFeedback.js'
import Democratizacao from '../democratizacao/Democratizacao'
//import Teste from '../democratizacao/Teste.js'
import Dashboard from '../dashboard/Dashboard.js'
import Perfil from '../perfil/Perfil.js'
import Ranking from '../ranking/Ranking.js'
import Redirecionar from '../redirecionar/Redirecionar.js';


const Tab = createBottomTabNavigator();

function ButtonNew({ size, color }) {
    return (
        <View style={styles.container}>
            <Entypo name="plus" color={color} size={size} />
        </View>
    )
}

export default function MainAcompanhar() {

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    function Teste () {
        return (

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable style={[styles.button, styles.buttonClose]} onPress={() => navigation.navigate('Ranking')}>
                            <Text style={styles.textStyle}>Chamar tela de Ranking</Text>
                        </Pressable>
                        <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        );
    };

    return (

        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#C20004',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: true,
                tabBarStyle: {
                    //   height: 60,
                    // backgroundColor: '#121212',
                    backgroundColor: '#f1f1f1',
                    borderTopColor: 'gray',
                    paddingBottom: 5,
                    paddingTop: 5
                },
            }}
            initialRouteName='Dashboard'
            backBehavior='initialRoute'
        >
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ tabBarIcon: ({ size, color }) => (<Feather name="pie-chart" size={size} color={color} />), headerShown: false }}
            />
            <Tab.Screen
                name="Teste"
                component={Teste}
                options={{ tabBarIcon: ({ size, color }) => (<Entypo name="chat" size={size} color={color} />), headerShown: false }}
                listeners={{
                    tabPress: event => {
                        if (modalVisible === false) {
                            event.preventDefault();
                            setModalVisible(true);
                        }
                    }
                }}
            />
            <Tab.Screen
                name="Redirecionar"
                component={Redirecionar}
                options={{ tabBarIcon: ({ size, color, navigation }) => (<ButtonNew size={40} color={color} navigation={navigation} />), tabBarLabel: '', headerShown: false }}
            />
            <Tab.Screen
                name="Ranking"
                component={Ranking}
                options={{ tabBarIcon: ({ size, color }) => (<Entypo name="medal" size={size} color={color} />), headerShown: false }}
            />
            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{ tabBarIcon: ({ size, color }) => (<Feather name="user" size={size} color={color} />), headerShown: false }}
            />
        </Tab.Navigator>
    );
};


const styles = StyleSheet.create({
    container: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        borderWidth: 4,
        borderColor: '#C20004'
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        //alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
        marginHorizontal: '5%'
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
});