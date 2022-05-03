import React from "react";
import { Image, View, StyleSheet, TouchableOpacity, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function Redirecionar() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <Image style={styles.logoSenai} source={require("../../../assets/imgMobile/logo_2S.png")} resizeMode="contain" />

      <View style={styles.containerLinks}>
        <Text style={styles.titulo}>REDIRECIONAR PARA:</Text>

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
  },
  logoSenai: {
    width: "100%",
    height: 40,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  containerLinks: {
    flex: 1,
    // backgroundColor: 'cyan',
    alignItems: "center",
    width: "100%",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: 15
  },
  titulo: {
    fontSize: 32,
    width: '80%',
    textAlign: 'center',
    marginBottom: 15
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "#C20004",
    borderWidth: 2,
    borderColor: 'gray',
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
    marginLeft: 40
  },
});
