// React Imports
import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions
} from "react-native";

// Expo
import AppLoading from 'expo-app-loading';

// Pacotes
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Fonts
import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from '@expo-google-fonts/montserrat';

import {
  Quicksand_300Light,
  Quicksand_600SemiBold,
} from '@expo-google-fonts/quicksand';

//Services
import api from "../../services/apiGp3";

import imgPadrao from '../../../assets/img-gp3/Perfil.png'


const largura = Dimensions.get('window').width;


export default function ListarDecisao() {

  const navigation = useNavigation();

  //States
  const [listaDecisao, setListaDecisao] = useState([]);

  // Fontes utilizada
  let [fontsLoaded] = useFonts({

    //Montserrat
    Montserrat_500Medium,
    Montserrat_600SemiBold,

    // Quicksand
    Quicksand_300Light,
    Quicksand_600SemiBold,
  })

  const BuscarDecisao = async () => {
    const token = await AsyncStorage.getItem("userToken");

    if (token != null) {
      const resposta = await api.get("Decisoes/Listar", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const dadosDaApi = await resposta.data;
      setListaDecisao(dadosDaApi);
      //console.log(listaDecisao);
    }
  };


  useEffect(() => {
    BuscarDecisao();
  }, []);



  const renderItem = ({ item }) => (


    <TouchableOpacity
      style={styles.itemLineRender}
      //style={styles.containerRenderItem}
      onPress={() =>
        navigation.navigate("CadastrarFeedback", {
          idDecisao: item.idDecisao,
        })
      }
    >

      <View style={styles.imgPerfilCardWrapper}>
        <Image
          source={
            item.idUsuarioNavigation.caminhoFotoPerfil !== undefined
              &&
              item.idUsuarioNavigation.caminhoFotoPerfil !== null
              ?
              { uri: "https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples/" + item.idUsuarioNavigation.caminhoFotoPerfil }
              :
              imgPadrao
          }
          style={styles.img_perfil}
          resizeMode="cover"
        />
      </View>

      <View style={styles.containerTextos}>
        <Text >{`${item.idUsuarioNavigation.nome} propôs: `}</Text>
        <Text >{`${item.descricaoDecisao}`}</Text>
      </View>



      {/* <View style={styles.containerCard}>
            <View style={styles.tituloCardWrapper}>
              <Text style={styles.tituloCard}>
                {item.idUsuarioNavigation.nome} deu essa ideia: "
                {item.descricaoDecisao}"
              </Text>
              <Text style={styles.mensagem}>Clique e de seu feedback!</Text>

            </View>
          </View> */}
    </TouchableOpacity>

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
          <Text style={styles.h1Bold}>Decisão</Text>
        </View>

        <FlatList
          contentContainerStyle={styles.containerFlatList}
          data={listaDecisao}
          keyExtractor={(item) => item.idDecisao}
          renderItem={renderItem}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'column',
    //backgroundColor: 'purple',
  },
  header: {
    alignSelf: "center",
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '5%',
    //backgroundColor: 'cyan',
  },
  imgLogo: {
    alignSelf: "center",
  },
  h1Bold: {
    fontSize: 32,
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
    textTransform: "uppercase",
    color: "#2A2E32",
    paddingTop: 10,
    paddingBottom: '2%'
  },

  itemLineRender: {
    //flex: 1,
    flexDirection: "row",
    width: largura * .9,
    height: largura * .27,
    borderRadius: 5,
    borderTopWidth: 25,
    borderWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.8)",
    borderColor: 'gray',
    alignItems: 'center',
    marginTop: 20,
    //backgroundColor: 'blue'
  },
  containerFlatList: {
    flex: 1,
    width: largura * .9,
    height: '100%',
    alignItems: 'center',
    //backgroundColor: 'orange',
  },
  img_perfil: {
    width: '100%',
    height: '100%',
    borderRadius: 7
  },
  imgPerfilCardWrapper: {
    
    width: 70,
    height: 70,
    borderColor: '#451531',
    borderWidth: 3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '2%',
    //backgroundColor: 'lime',
  },
  containerTextos: {
    flex: 1,
    marginRight: '2%',
    //backgroundColor: 'red',
    marginTop: -25
  }

});