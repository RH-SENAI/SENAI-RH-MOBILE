import React from "react";
import { Image, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo, Feather } from "@expo/vector-icons";

// Expo
import AppLoading from "expo-app-loading";

// Fonts
import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";

import {
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_600SemiBold,
} from "@expo-google-fonts/quicksand";

export default function Redirecionar() {
  // Fontes utilizada
  let [fontsLoaded] = useFonts({
    //Montserrat
    Montserrat_500Medium,
    Montserrat_600SemiBold,

    // Quicksand
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_600SemiBold,
  });
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <Image style={styles.logoSenai} source={require("../../../assets/imgMobile/logo_2S.png")} resizeMode="contain" />

      <View style={styles.containerLinks}>
        <Image
          style={styles.fotoPerfilContainer}
          source={require("../../../assets/imgMobile/Perfil.png")}
          resizeMod="cover"
        />
        <Text style={styles.titulo}>Olá, Fulano</Text>
        <Text style={styles.msg}>O que você deseja acessar?</Text>
        <View style={styles.containerButtons}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MainAcompanhar")}>
            {/* <Image style={styles.icone} source={require("../../../assets/imgMobile/line-graph.svg")} /> */}
            <Entypo name="line-graph" size={40} color={'white'} />
            <View style={styles.containerTextoLink}>
              <Text style={styles.texto}>Acompanhamento</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            {/* <Image style={styles.icone} source={require("../../../assets/imgMobile/porco.png")} /> */}
            <Entypo name="price-ribbon" size={40} color={'white'} />
            <View style={styles.containerTextoLink}>
              <Text style={styles.texto}>Motivações</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            {/* <Image style={styles.icone} source={require("../../../assets/imgMobile/etiqueta.png")} /> */}
            <Entypo name="shopping-cart" size={40} color={'white'} />
            <View style={styles.containerTextoLink}>
              <Text style={styles.texto}>Minhas Vantagens</Text>
            </View>
          </TouchableOpacity>

        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "gold",
  },
  logoSenai: {
    width: "100%",
    height: 40,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    //backgroundColor: 'gray'
  },
  containerLinks: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingLeft: "5%",
    paddingRight: "5%",
    //backgroundColor: 'cyan',
  },
  fotoPerfilContainer: {
    width: 110,
    height: 110,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'gray',
    marginBottom: 20,
    marginTop: 20,
    //backgroundColor: 'blue'
  },
  titulo: {
    fontSize: 32,
    width: '100%',
    textAlign: 'center',
    fontFamily: "Montserrat_600SemiBold",
    //backgroundColor: 'blue'
  },
  msg: {
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
    fontFamily: "Montserrat_600SemiBold",
    //backgroundColor: 'purple'
  },
  containerButtons: {
    flex: 1,
    justifyContent: 'space-evenly',
    width: '100%',
    //backgroundColor: 'green',
    paddingVertical: '5%',
    //marginBottom: '5%'
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#C20004",
    //borderWidth: 2,
    //borderColor: 'gray',
    width: "100%",
    height: 70,
    borderRadius: 10,
    paddingHorizontal: '10%'
    //marginTop: 20,
    //marginBottom: 20,
  },
  containerTextoLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    //backgroundColor: 'blue',
  },
  texto: {
    //backgroundColor: 'blue',
    color: "white",
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Quicksand_300Light",
    width: '100%'
    // fontWeight: "bold",
  },
  icone: {
    color: 'white',
    backgroundColor: 'blue',
    width: 75,
    height: 75
  }
});
