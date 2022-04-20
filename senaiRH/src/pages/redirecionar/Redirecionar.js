import React from "react";
import * as Animatable from "react-native-animatable";
import { Image, View, StyleSheet, TouchableOpacity, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function Redirecionar() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../../assets/imgMobile/logo_2S.png")}
        resizeMode="contain"
      />
      <View style={styles.titulos}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MainAcompanhar")}
        >
          <Text style={styles.links}>Acompanhamento</Text>
          <Image
            source={require("../../../assets/imgMobile/computador.png")}
            style={styles.imagemRedirecionar}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.links}>Motivações</Text>
    
          <Image
            source={require("../../../assets/imgMobile/porco.png")}
            style={styles.imagemRedirecionar}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.links}>Minhas Vantagens</Text>
          <Image
            source={require("../../../assets/imgMobile/etiqueta.png")}
            style={styles.imagemRedirecionar}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  logo: {
    width: "100%",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 0,
  },
  titulos: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'cyan',
    paddingTop: 75,
    paddingBottom: 75,
    width: "100%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#C20004",
    marginTop: "15%",
    marginBottom: "15%",
    width: "100%",
    borderRadius: 4,
    paddingVertical: 8,
  },
  links: {
    // backgroundColor: 'blue',
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
