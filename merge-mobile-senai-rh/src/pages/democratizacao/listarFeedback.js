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
import { ScrollView } from "react-native-gesture-handler";


const largura = Dimensions.get('window').width;


export default function ListarDecisao() {

  const navigation = useNavigation();

  //States
  const [listaDecisao, setListaDecisao] = useState([]);
  const [listaFeedback, setListaFeedback] = useState([]);

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
      //console.log(listaFeedback);
    }
  };


  useEffect(() => {
    BuscarDecisao();
  }, []);

  useEffect(() => {
    BuscarFeedbacks();
  }, []);



  const renderDecisao = ({ item }) => (

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
          <View style={styles.containerTextos}>
            <Text >{`${item.idUsuarioNavigation.nome} propôs: `}</Text>
            <Text >{`${item.descricaoDecisao}`}</Text>
          </View>
        </View>

      <ScrollView nestedScrollEnabled={true}>
      {/* ----------- LISTA DE FEEDBACKS DENTRO DE CADA DECISÃO --------------- */}
      {
        listaFeedback
          .filter(f => f.idDecisao === item.idDecisao)
          .map(feedback => {
            return (

              <TouchableOpacity
                style={styles.itemLineRender_feedback}
                //style={styles.containerRenderItem}
                onPress={() =>
                  navigation.navigate("CadastrarFeedback", {
                    idDecisao: item.idDecisao,
                  })
                }
              >
                <View style={styles.imgPerfilCardWrapper_feedback}>
                  <Image
                    source={
                      feedback.idUsuarioNavigation.caminhoFotoPerfil !== undefined
                        &&
                        feedback.idUsuarioNavigation.caminhoFotoPerfil !== null
                        ?
                        { uri: "https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples/" + feedback.idUsuarioNavigation.caminhoFotoPerfil }
                        :
                        imgPadrao
                    }
                    style={styles.img_perfil_feedback}
                    resizeMode="cover"
                  />
                  <View style={styles.containerTextos_feedback}>
                    <Text >{`${feedback.idUsuarioNavigation.nome} comentou: `}</Text>
                    <Text >{`${feedback.comentarioFeedBack}`}</Text>
                  </View>
                </View>
              </TouchableOpacity>

            )
          })
      }
      </ScrollView>
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
          <Text style={styles.h1Bold}>FeedBacks</Text>
        </View>
        {/* <ScrollView> */}
          <FlatList
            contentContainerStyle={styles.containerFlatList}
            data={listaDecisao}
            keyExtractor={(item) => item.idDecisao}
            renderItem={renderDecisao}
            scrollEnabled={true}
          />
        {/* </ScrollView> */}
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
  },

  containerFlatList: {
    flex: 1,
    width: largura * .9,
    height: '100%',
    alignItems: 'center',
    //backgroundColor: 'orange',
  },
  itemLineRender: {
    //flex: 1,
    flexDirection: 'column',
    width: largura * .9,
    //height: 300,
    maxHeight: largura * .7,
    borderRadius: 5,
    borderTopWidth: 25,
    borderWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.8)",
    borderColor: 'gray',
    alignItems: 'flex-start',
    marginTop: 20,
    //backgroundColor: 'blue'
  },

  imgPerfilCardWrapper: {
    flexDirection: 'row',
    width: "80%",
    height: 75,
    borderColor: '#451531',
    borderWidth: 3,
    borderRadius: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginHorizontal: '2%',
    marginTop: 10,
    backgroundColor: 'purple',
  },
  img_perfil: {
    width: 70,
    height: 70,
    borderRadius: 5
  },
  containerTextos: {
    flex: 1,
    //backgroundColor: 'red',
  },

  // --------- cards de feedbacks/styles, abaixo

  itemLineRender_feedback: {
    //flex: 1,
    flexDirection: 'column',
    width: largura * .9,
    //height: 300,
    borderRadius: 5,
    //borderTopWidth: 25,
    //borderWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.8)",
    borderColor: 'gray',
    alignItems: 'flex-end',
    marginTop: 10,
    //backgroundColor: 'gold'
  },
  imgPerfilCardWrapper_feedback: {
    flexDirection: 'row',
    width: "80%",
    height: 75,
    borderColor: '#451531',
    borderWidth: 3,
    borderRadius: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginHorizontal: '2%',
    //backgroundColor: 'yellow',
  },
  img_perfil_feedback: {
    width: 70,
    height: 70,
    borderRadius: 7
  },
  containerTextos_feedback: {
    flex: 1,
    //backgroundColor: 'gray',
  }

});