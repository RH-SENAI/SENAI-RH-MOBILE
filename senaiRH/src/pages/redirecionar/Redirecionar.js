import React from "react";
import { Image, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
        <Text style={styles.titulo}>Olá, Fulano</Text>
        <Text style={styles.msg}>Qual o seu interesse?</Text>
        <View style={styles.containerButtons}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MainAcompanhar")}>
            <Image style={styles.icone} source={require("../../../assets/imgMobile/computador.png")} />
            <Text style={styles.texto}>Acompanhamento</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Image style={styles.icone} source={require("../../../assets/imgMobile/porco.png")} />
            <Text style={styles.texto}>Motivações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Image style={styles.icone} source={require("../../../assets/imgMobile/etiqueta.png")} />
            <Text style={styles.texto}>Minhas Vantagens</Text>
          </TouchableOpacity>

        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gold",
  },
  logoSenai: {
    width: "100%",
    height: 40,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'gray'
  },
  containerLinks: {
    flex: 1,
    backgroundColor: 'cyan',
    alignItems: "center",
    width: "100%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  titulo: {
    fontSize: 32,
    width: '100%',
    textAlign: 'center',
    fontFamily: "Montserrat_600SemiBold",
    backgroundColor: 'blue'
  },
  msg: {
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
    fontFamily: "Montserrat_600SemiBold",
    backgroundColor: 'purple'
  },
  containerButtons: {
    backgroundColor: 'green',
    flex: 1,
    justifyContent: 'center',
    width: '100%'

  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#C20004",
    borderWidth: 2,
    borderColor: 'gray',
    width: "100%",
    height: 70,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 15,
  },
  
  texto: {
    //backgroundColor: 'blue',
    color: "black",
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Quicksand_300Light",
    // fontWeight: "bold",
    marginLeft: 40
  },
});
