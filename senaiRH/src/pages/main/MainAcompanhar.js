import React from "react";
import { useNavigation } from "@react-navigation/native";

<<<<<<< HEAD
import {
  View,
  StyleSheet
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Feather } from "@expo/vector-icons";
import NovoFeedback from "../novoFeedback/NovoFeedback.js";

import Dashboard from "../dashboard/Dashboard.js";
import Perfil from "../perfil/Perfil.js";
import Ranking from "../ranking/Ranking.js";
// import ModalDemocratizacao from "../modalDemocratizacao/ModalAcompanhar.js";
=======
import { View, StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Entypo,
  Feather,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";

import Redirecionar from "../redirecionar/Redirecionar";
import Dashboard from "../dashboard/Dashboard.js";
import Perfil from "../perfil/Perfil.js";
import Feedback from "../democratizacao/ListarFeedbacks.js";
import Decisao from "../democratizacao/ListarDecisao.js";
>>>>>>> mobile-gp-3

const Tab = createBottomTabNavigator();

function ButtonNew({ size, color }) {
  return (
    <View style={styles.container}>
      <Entypo name="plus" color={color} size={size} />
    </View>
  );
}

<<<<<<< HEAD


export default function MainAcompanhar() {

  
=======
export default function MainAcompanhar() {
>>>>>>> mobile-gp-3
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#C20004",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: true,
        headerShown: false,
<<<<<<< HEAD
=======
        tabBarHideOnKeyboard: true,
>>>>>>> mobile-gp-3
        tabBarStyle: {
          backgroundColor: "#f1f1f1",
          borderTopColor: "gray",
          paddingBottom: 5,
          paddingTop: 5,
        },
<<<<<<< HEAD
        headerLeft: () => null
=======
        headerLeft: () => null,
>>>>>>> mobile-gp-3
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
<<<<<<< HEAD
        name="Democratização"
        component={ModalDemocratizacao}
        options={{ tabBarIcon: ({ size, color }) => (<Entypo name="chat" size={size} color={color} />), headerShown: false }}
      />

      <Tab.Screen
        name="NovoFeedback"
        component={NovoFeedback}
        options={{
          tabBarIcon: ({ size, color }) => (
            <ButtonNew size={40} color={color} />
          ),
=======
        name="Decisões"
        component={Decisao}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="chatbox-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Redirecionar"
        component={Redirecionar}
        options={{
          tabBarIcon: ({ color }) => <ButtonNew size={40} color={color} />,
>>>>>>> mobile-gp-3
          tabBarLabel: "",
          headerShown: false,
        }}
        listeners={{
<<<<<<< HEAD
          tabPress: e => {
            // Prevent default action
            navigation.goBack();
          }
        }}
      />
      <Tab.Screen
        name="Ranking"
        component={Ranking}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="medal" size={size} color={color} />
=======
          tabPress: (e) => {
            // Prevent default action
            navigation.goBack();
          },
        }}
      />
      <Tab.Screen
        name="Feedbacks"
        component={Feedback}
        options={{
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="exclamationcircleo" size={size} color={color} />
>>>>>>> mobile-gp-3
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
<<<<<<< HEAD
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
=======
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "5%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconFechar: {
    marginTop: 16,
    alignSelf: "flex-start",
>>>>>>> mobile-gp-3
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
<<<<<<< HEAD
    backgroundColor: 'transparent'
  },
  button: {
    //backgroundColor: '#C20004',
=======
    backgroundColor: "transparent",
  },
  button: {
>>>>>>> mobile-gp-3
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
<<<<<<< HEAD
});
=======
});
>>>>>>> mobile-gp-3
