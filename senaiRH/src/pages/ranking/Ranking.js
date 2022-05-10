// React Imports
import react from "react";
import { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

// Pacotes
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Leaderboard from "react-native-leaderboard";

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

// Services
import api from "../../services/api";
import jwtDecode from "jwt-decode";
import { Touchable } from "react-native-web";

export default function Ranking() {
  const [avaliacaoUsuario, setAvaliacaoFuncionario] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const buscarDados = async () => {
    const token = await AsyncStorage.getItem;
  };

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

  const BuscarAvaliacao = async () => {
    const token = await AsyncStorage.getItem("userToken");

    if (token != null) {
        const resposta = await api.get("/AvaliacaoUsuarios/Listar", {
            headers: {
                Authorization: "Bearer " + token,
            },
        });

        const dadosDaApi = await resposta.data;
        setAvaliacaoFuncionario(dadosDaApi);
    }
};

useEffect(()=>{
  BuscarAvaliacao();
}, []);

  async function BuscarUsuario() {
      try {
          const token = await AsyncStorage.getItem('userToken');

          const resposta = await api.get('Usuarios/Listar', {
              headers: {
                  Authorization: 'Bearer ' + token,
              },
          });

          if (resposta.status === 200) {
              setUsuario(resposta.data);
          }

      } catch (error) {
          console.warn(error)
      }
  }
  useEffect(() => BuscarUsuario(), [])

  return (
    <View style={styles.container}>
      <Image
        style={styles.logoSenai}
        source={require("../../../assets/imgMobile/logo_2S.png")}
        resizeMode="contain"
      />
      <View style={styles.text}>
        <Text style={styles.h1bold}>RANKING</Text>
        <Text style={styles.h1nonBold}>de funcionários</Text>
      </View>

      <View style={styles.containerUsuario}>
        <TouchableOpacity style={styles.usuario}></TouchableOpacity>
      </View>

      <Leaderboard 
      data={usuario} 
      sortBy="mediaAvaliacao"
      labelBy="nome"/>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
  },

  logoSenai: {
    width: 300,
    height: 40,
    marginTop: 40,
    marginBottom: 20,
  },
  
  h1nonBold: {
    fontSize: 32,
    fontWeight: "500",
    textTransform: "uppercase",
    color: "#000000",
    textAlign:"center",
    marginBottom:24,
    fontFamily: "Montserrat_600SemiBold",
    marginBottom:40
  },

  h1bold: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 35,
    color: "#000000",
    color: "#2A2E32",
    marginTop: 30,
    textAlign:"center",
   
  },
});
