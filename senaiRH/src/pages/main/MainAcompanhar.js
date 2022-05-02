import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, StyleSheet, Text, Image, Modal } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Entypo, Feather, AntDesign } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import NovoFeedback from "../novoFeedback/NovoFeedback.js";
import Democratizacao from "../democratizacao/Democratizacao.js";
import Dashboard from "../dashboard/Dashboard.js";
import Perfil from "../perfil/Perfil.js";
import Ranking from "../ranking/Ranking.js";
import Redirecionar from "../redirecionar/Redirecionar.js";
// import { useState } from "react/cjs/react.development";

const Tab = createBottomTabNavigator();

function ButtonNew({ size, color }) {
  return (
    <View style={styles.container}>
      <Entypo name="plus" color={color} size={size} />
    </View>
  );
}

function ModalDemocratizacao(props) {
  const [modalAberto, setModalAberto] = useState(props.a);

  return (
    <Modal animationType="slide" visible={modalAberto}>
      <View style={styles.conteudoModal}>
        <AntDesign
          name="close"
          size={50}
          color="black"
          onPress={() => {setModalAberto(false)
          }}
        />
        <Text>modal abriu</Text>
      </View>
    </Modal>
  );
}

export default function MainAcompanhar() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#C20004",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: true,
        tabBarStyle: {
          //   height: 60,
          // backgroundColor: '#121212',
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
        name="Democratização"
        component={props => <ModalDemocratizacao {...props} a = {true} />}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="chat" size={size} color={color} />
          ),
          headerShown: false,
        }}
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
});
