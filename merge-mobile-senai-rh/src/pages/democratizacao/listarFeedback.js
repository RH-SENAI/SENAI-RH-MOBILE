// React Imports
import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";

// Pacotes
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  Quicksand_600SemiBold,
} from "@expo-google-fonts/quicksand";

// Services
import api from "../../services/apiGp3";

export default function ListaFeedback() {
  const navigation = useNavigation();

  // States
  const [listaFeedback, setListaFeedback] = useState([]);

  // Fontes utilizada
  let [fontsLoaded] = useFonts({
    //Montserrat
    Montserrat_500Medium,
    Montserrat_600SemiBold,

    // Quicksand
    Quicksand_300Light,
    Quicksand_600SemiBold,
  });

  const BuscarFeedbacks = async () => {
    const token = await AsyncStorage.getItem("userToken");

    if (token != null) {
      const resposta = await api.get("Feedbacks/Listar", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const dadosDaApi = await resposta.data;
      setListaFeedback(dadosDaApi);
    }
  };

  useEffect(() => {
    BuscarFeedbacks();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.containerRenderItem}>
      {/* <View style={styles.Nayara} >
        
      </View> */}
      <View style={styles.cardClicavel}>
        <View style={styles.imgPerfilCardWrapper}>
          <Image
            source={{
              uri:
                "https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples/" +
                item.idUsuarioNavigation.caminhoFotoPerfil,
            }}
            style={styles.img_perfil}
            resizeMode="cover"
          />
        </View>

        <TouchableOpacity
          style={styles.containerCardClicavel}
          onPress={() =>
            navigation.navigate("ListarDecisao", {
              idDecisao: item.idDecisao,
            })
          }
        >
           {/* <View style={styles.quadrado}></View> */}
          <View style={styles.containerCard}>
            <View style={styles.tituloCardWrapper}>
              <Text style={styles.tituloCard}>
                O que {item.idUsuarioNavigation.nome} disse sobre: "
                {item.idDecisaoNavigation.descricaoDecisao}"
              </Text>

              <Text style={styles.mensagem}>{item.comentarioFeedBack}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../../assets/img-geral/logo_2S.png")}
            style={styles.imgLogo}
          />
        </View>

        <Text style={styles.h1Bold}>Feedbacks</Text>

        <FlatList
          contentContainerStyle={styles.mainBodyContent}
          data={listaFeedback}
          keyExtractor={(item) => item.idFeedBack}
          renderItem={renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerRenderItem: {
    // width: 370,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor:'purple'
  },

  imgPerfilCardWrapper: {
    width: 70,
    height: 70,
    borderColor: "#B3B3B3",
    borderWidth: 3,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 32,
  },

  img_perfil: {
    width: "100%",
    height: "100%",
    backgroundColor:"pink"
  },

  // Nayara:{
  //   justifyContent: 'flex-start',
  // },

  cardClicavel: {
    height: 210,
    borderWidth: 1,
    borderColor: '#B3B3B3',
    backgroundColor: 'blue',
    // backgroundColor: '#F2F2F2',
    borderTopWidth:30,
    borderTopColor:'#451531',
    borderRadius: 10,
    marginBottom: 40,
    width: '95%',
    // textAlign:"center",
   // justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },

  containerCard: {
    width: "80%",
    height: 105,
    backgroundColor:"green",
    alignItems: "center",
    // justifyContent:"center",
    marginLeft:120
  },

  tituloCardWrapper: {
    width: 200,
    height: 30
  },

  tituloCard: {
    textAlign: "auto",
    marginBottom: 8,
    height: 60,
    fontFamily: "Quicksand_600SemiBold",
    // color: "black",
    color: "yellow",
    marginLeft: 14,
    
  },

  mensagem: {
    textAlign: "center",
    color: "red",
    // color: "black",
    fontFamily: "Quicksand_300Light",
  },

  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: "5%",
  },

  header: {
    width: 290,
    height: 40,
    alignSelf: "center",
    marginTop: 16,
  },

  imgLogo: {
    alignSelf: "center",
    marginTop: 40
  },

  // h1nonBold: {
  //   fontSize: 30,
  //   fontWeight: "500",
  //   fontFamily: "Montserrat_600SemiBold",
  //   textTransform: "uppercase",
  //   color: "#000000",
  // },

  h1Bold: {
    fontSize: 32,
    width: "80%",
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
    textTransform: "uppercase",
    color: "#2A2E32",
    marginTop: 24,
  },

  mainBodyContent: {
    paddingBottom: 20,
  },

//   quadrado: {
//     backgroundColor: '#451531',
//     height: 28,
//     width: '100%',
//     borderTopRightRadius: 8,
//     borderTopLeftRadius: 8,

// },
});
