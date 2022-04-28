import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Feather, AntDesign, MaterialCommunityIcons  } from "@expo/vector-icons";
import api from "../../services/api.js";
import { AsyncStorage } from 'react-native';


import NovoFeedback from "../novoFeedback/NovoFeedback.js";
import Democratizacao from "../democratizacao/Democratizacao.js";
import Dashboard from "../dashboard/Dashboard.js";
import Perfil from "../perfil/Perfil.js";
import Ranking from "../ranking/Ranking.js";

import { useFonts } from "expo-font"; 
import AppLoading from 'expo-app-loading';



const Tab = createBottomTabNavigator();

logout = async () => {
  await AsyncStorage.removeItem("userToken");
  this.props.navigate("Login");
};

function ButtonNew({ size, color }) {
  const [modalAberto, setModalAberto] = useState(false);
  return (
    <View style={StyleSheet.container}>
      <Modal visible={modalAberto} animationType="slide">
        <AntDesign
          name="close"
          size={30}
          color="black"
          style={styles.iconClose}
          onPress={() => setModalAberto(false)}
        />

        <View style={styles.containerLinks}>
          <Text style={styles.titulo}>REDIRECIONAR PARA:</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("MainAcompanhar")}
          >
            <Image
              style={styles.icone}
              source={require("../../../assets/imgMobile/computador.png")}
            />
            <Text style={styles.texto}>Acompanhamento</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Image
              style={styles.icone}
              source={require("../../../assets/imgMobile/porco.png")}
            />
            <Text style={styles.texto}>Motivações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Image
              style={styles.icone}
              source={require("../../../assets/imgMobile/etiqueta.png")}
            />
            <Text style={styles.texto}>Minhas Vantagens</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={this.logout} >
            <Image source={require('../../assets/images/iconSair.png')}
            style={styles.logout}
            >
          </Image> */}

          <MaterialCommunityIcons
          name="logout"
          size={30}
          color="black"
          style={styles.iconClose}
          onPress={this.logout}
        />
        </View>
      </Modal>

      <View style={StyleSheet.botao}>
        <Entypo
          name="plus"
          color={color}
          size={size}
          onPress={() => setModalAberto(true)}
        />
      </View>
    </View>
  );
}

export default function MainAcompanhar() {
  
  // let [ customFonts]= useFonts({
  //   // 'Montserrat-Regular': require('../../../assets/fonts/'),
  //   'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
  //   'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf')
  // })
  // if(!customFonts){
  
  //   return<AppLoading />;
  // }
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
      initialRouteName="NovoFeedback"
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="pie-chart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Democratização"
        component={Democratizacao}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="chat" size={size} color={color} />
          ),
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
        }}
      />
      <Tab.Screen
        name="Ranking"
        component={Ranking}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="medal" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 20,
  },

  botao: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    borderWidth: 3,
    borderColor: "#C20004",
  },

  iconClose: {
    marginTop: 16,
    marginLeft: 16,
  },
  containerLinks: {
    flex: 1,
    // backgroundColor: 'cyan',
    alignItems: "center",
    width: "100%",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: 15,
  },
  titulo: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    width: "80%",
    textAlign: "center",
    marginBottom: 15,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#C20004",
    borderWidth: 2,
    borderColor: "gray",
    width: "100%",
    height: 85,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 15,
  },
  texto: {
    // backgroundColor: 'blue',
    color: "black",
    textAlign: "center",
    fontSize: 25,
    // fontWeight: "bold",
    marginLeft: 40,
    fontFamily:'Montserrat-Bold'
  },
});
