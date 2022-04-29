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
import { Entypo, Feather, AntDesign } from "@expo/vector-icons";

import NovoFeedback from "../novoFeedback/NovoFeedback.js";
import Democratizacao from "../democratizacao/Democratizacao.js";
import Dashboard from "../dashboard/Dashboard.js";
import Perfil from "../perfil/Perfil.js";
import Ranking from "../ranking/Ranking.js";

// import { useFonts } from "expo-font";
// import AppLoading from "expo-app-loading";
// import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();


function ButtonNew({ size, color }) {
  return (
    <View style={StyleSheet.botao}>
      <Entypo name="plus" color={color} size={size} />
    </View>
  );
}


export default function MainAcompanhar() {


    const [modalAberto, setModalAberto] = useState(false);
  //   return (
  //     <View style={styles.container}>
  //       <Modal 
  //        animationType="slide"
  //        transparent={true}
  //        visible={modalAberto}
  //        onRequestClose={() => {
  //            Alert.alert("Modal has been closed.");
  //            setModalVisible(!modalAberto);
  //        }}
        
  //       >
  //         <View style={styles.conteudoModal}>
  //         <AntDesign
  //             name="close"
  //             size={24}
  //             color="black"
  //             onPress={() => setModalAberto(false)}
  //           />
  //           <Text style={styles.tituloModal}>O que você deseja fazer:</Text>
  //         </View>
  //       </Modal>
  //     </View>
  //   );
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
      <Modal
        animationType="slide"
             transparent={true}
             visible={modalAberto}
             onRequestClose={() => {
                 Alert.alert("Modal has been closed.");
                 setModalVisible(!modalAberto);
             }}
      >

      <Tab.Screen

        onPress={() => setModalVisible(true)}
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="pie-chart" size={size} color={color} />
          ),
        }}
      //  < Modal
      //       //  animationType="slide"
      //       //  transparent={true}
      //       //  visible={modalAberto}
      //       //  onRequestClose={() => {
      //       //      Alert.alert("Modal has been closed.");
      //       //      setModalVisible(!modalAberto);
      //       //  }}
            
      //       >
      //         <View style={styles.conteudoModal}>
      //         <AntDesign
      //             name="close"
      //             size={24}
      //             color="black"
      //             onPress={() => setModalAberto(false)}
      //           />
      //           <Text style={styles.tituloModal}>O que você deseja fazer:</Text>
      //         </View>
      //       </Modal>
      />
      </Modal>
      <Tab.Screen
      
           


        name="Democratização"
        onPress={() => setModalVisible(true)}
        // component={ModalDemocratizacao}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="chat" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        // onPress={() => navigation.navigate("Redirecionar")}
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
    fontFamily: "Montserrat-Bold",
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
    fontFamily: "Montserrat-Bold",
  },
});

// let [ customFonts]= useFonts({
//   // 'Montserrat-Regular': require('../../../assets/fonts/'),
//   'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
//   // 'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf')
// })
// if(!customFonts){

//   return<AppLoading />;
// }
