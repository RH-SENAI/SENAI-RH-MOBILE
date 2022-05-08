import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Feather, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import NovoFeedback from "../novoFeedback/NovoFeedback.js";
import CadastrarFeedback from "../democratizacao/CadastrarFeedback.js";
import ListarFeedbacks from "../democratizacao/ListarFeedbacks.js"
import ListarDecisao from "../democratizacao/ListarDecisao.js"

import Dashboard from "../dashboard/Dashboard.js";
import Perfil from "../perfil/Perfil.js";
import Ranking from "../ranking/Ranking.js";
import Redirecionar from "../redirecionar/Redirecionar.js";

const Tab = createBottomTabNavigator();

function ButtonNew({ size, color }) {
  return (
    <View style={styles.container}>
      <Entypo name="plus" color={color} size={size} />
    </View>
  );
}



export default function MainAcompanhar() {

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  function Teste() {
    return (

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
          setModalVisible(false);
          navigation.navigate('Dashboard');
        }}
      >

        <View style={styles.modalView}>
          <AntDesign
            style={styles.iconFechar}
            name="close"
            size={30}
            color="black"
            onPress={() => {
              (setModalVisible(false), navigation.navigate('Dashboard'));
            }}
          />
          <View style={styles.containerLinks}>
            <Text style={styles.titulo}>ÁREA DE DEMOCRATIZAÇÃO</Text>
            <Text style={styles.titulo}>O que você gostaria de fazer?</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListarDecisao')}>
              <Text style={styles.texto}>Visualisar decisões</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListarFeedbacks')}>
              <Text style={styles.texto}>Visualisar feedbacks</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CadastrarFeedback')}>
              <Text style={styles.texto}>Cadastrar um novo feedback</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Modal>

    );
  };


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#C20004",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#f1f1f1",
          borderTopColor: "gray",
          paddingBottom: 5,
          paddingTop: 5,
        },
      }}
      initialRouteName="Dashboard"
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="pie-chart" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Teste"
        component={Teste}
        options={{ tabBarIcon: ({ size, color }) => (<Entypo name="chat" size={size} color={color} />), headerShown: false }}
        listeners={() => ({
          tabPress: () => {
            setModalVisible(true)
          }
        })}
      />

      <Tab.Screen
        name="NovoFeedback"
        component={NovoFeedback}
        options={{
          tabBarIcon: ({ size, color }) => (
            <ButtonNew size={40} color={color} />
          ),
          tabBarLabel: "",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Ranking"
        component={Ranking}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="medal" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    borderWidth: 4,
    borderColor: "#C20004",
  },

  modalView: {
    flex: 1,
    backgroundColor: "white",
    //borderRadius: 20,
    alignItems: "center",
    justifyContent: 'center',
    paddingHorizontal: '5%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  iconFechar: {
    marginTop: 16,
    alignSelf: 'flex-start'
  },
  titulo: {
    fontSize: 28,
    width: "80%",
    textAlign: "center",
    marginBottom: 15,
  },
  containerLinks: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: 15,
    backgroundColor: 'transparent'
  },
  button: {
    //backgroundColor: '#C20004',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "gray",
    width: "100%",
    height: 85,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 15,
  },
  texto: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
  },
});
