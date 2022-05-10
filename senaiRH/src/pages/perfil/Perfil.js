// React Imports
import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView
} from "react-native";

// Pacotes
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Expo
import AppLoading from 'expo-app-loading';

// Fonts
import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from '@expo-google-fonts/montserrat';

import {
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_600SemiBold,
} from '@expo-google-fonts/quicksand';

// Services
import api from "../../services/api";
import jwtDecode from "jwt-decode";

export default function Perfil() {

  const [usuario, setUsuario] = useState([])

  // Fontes utilizada
  let [fontsLoaded] = useFonts({

    //Montserrat
    Montserrat_500Medium,
    Montserrat_600SemiBold,

    // Quicksand
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_600SemiBold,
  })

  async function BuscarUsuario() {
    try {
      const token = await AsyncStorage.getItem('userToken');

      const resposta = await api.get('Usuarios/Listar/' + jwtDecode(token).jti, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      if (resposta.status === 200) {
        setUsuario([resposta.data]);
      }
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => BuscarUsuario(), [])

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (

      <SafeAreaView style={styles.container}>
        <Image style={styles.logoSenai} source={require("../../../assets/imgMobile/logo_2S.png")} resizeMode="contain" />

        {usuario.map((usuario) => {
          return (
            <ScrollView contentContainerStyle={styles.conteudo}>

              <Text style={styles.titulo}>Perfil</Text>
              <View style={styles.fotoPerfilContainer}>

                <Image
                  source={usuario.caminhoFotoPerfil == undefined ? {
                    uri:
                      "https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples/" +
                      item.idUsuarioNavigation.caminhoFotoPerfil,
                  } : require("../../../assets/imgMobile/Perfil.png")}
                  resizeMod="cover"
                />

              </View>
              
              <Text style={styles.textInfGeralPerfil}>Informação Geral</Text>
              
              <View style={styles.boxPerfil} >

                <View style={styles.line}>
                  <Text style={styles.lineTextPerfil}>{usuario.nome}</Text>
                </View>

                <View style={styles.line}>
                  <Text style={styles.lineTextPerfil}>{usuario.email}</Text>
                </View>

                <View style={styles.line}>
                  <Text style={styles.lineTextPerfil}>{usuario.cpf}</Text>
                </View>

                <View style={styles.line}>
                  <Text style={styles.lineTextPerfil}>{usuario.idCargoNavigation.nomeCargo}</Text>
                </View>

              </View>

            </ScrollView>);
        })}

      </SafeAreaView>
    );
  }
}



const styles = StyleSheet.create({


  container: {
    flex: 1,
    backgroundColor: '#F2F2F2'
  },
  fotoPerfilContainer: {
    width: 111,
    height: 110,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'gray',
    marginVertical: 20
  },

  textInfGeralPerfil : {
    fontFamily : 'Quicksand_400Regular',
    fontSize : 20,
    color : 'black',
    marginRight : 179,
    marginBottom : 20
  },

  lineTextPerfil : {
    fontFamily : 'Quicksand_400Regular',
    fontSize : 20,
    color : '#B3B3B3'
  },

  logoSenai: {
    width: "100%",
    height: 40,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 40,
  },

  titulo: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 35,
    color: "#000000",
    color: "#2A2E32",

    textAlign:"center",
    textTransform: "uppercase",
  },

  conteudo: {
    alignItems: 'center',
    paddingBottom : 20
  },

  boxPerfil: {
    backgroundColor: "#F2F2F2",
    paddingHorizontal: '5%',
    width: '100%'

  },
  titulos: {
    color: '#0A0A0A',
    fontSize: 16,
    fontWeight: 'bold'
  },
  line: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    paddingHorizontal: '3%',
    paddingVertical: 5,
    borderColor: '#C2C2C2',
    borderWidth: 3,
    marginBottom: 10,
    justifyContent : 'center',
    borderRadius : 10
  },

  sobreTrofeu: {
    width: 270,
    height: 50,
    fontSize: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: 16,
    backgroundColor: '#F2F2F2',
    //boxShadow: '19px',
    borderRadius: 5,
    flexDirection: 'row',


  },
  textTrofeu: {
    color: 'black',
    marginLeft: 10,
    //fontFamily:'Montserrat-Regular',


  }



});