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


const Tab = createBottomTabNavigator();

import Atividades from "../atividades/Atividades.js";
import AtividadesExtras from "../atividades/AtividadesExtras";
import MinhasAtividades from "../minhasAtividades/MinhasAtividades.js";
import RankingGp1 from "../rankingGp1/RankingGp1.js";
import Perfil from "../perfil/Perfil.js";
// let [fontsLoaded] = useFonts({
//         'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'),
//         'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
//         'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'),
//         'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'),
//         'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf'),
//         'Quicksand-Light': require('../../../assets/fonts/Quicksand-Light.ttf'),
//         'Quicksand-SemiBold': require('../../../assets/fonts/Quicksand-SemiBold.ttf')
//       });
    
//       if (!fontsLoaded) {
//         return <AppLoading />;
//       }


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
        <Text>deu CERTO</Text>
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

export default function MainMotivar() {
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
      initialRouteName="Redirecionar"
    >
       <Tab.Screen
        name="Atividades"
        component={Atividades}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="pie-chart" size={size} color={color} />
          ),
        }}
      />
       <Tab.Screen
        name="RankingGp1"
        component={RankingGp1}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="pie-chart" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="MinhasAtividades"
        component={MinhasAtividades}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="chat" size={size} color={color} />
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
});

