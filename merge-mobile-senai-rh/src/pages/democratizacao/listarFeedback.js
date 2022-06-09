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

import moment from 'moment';
import 'moment/locale/pt-br'


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
          <Text style={styles.tituloDecisao} >{`Em ${moment(item.dataDecisao).locale('pt-BR').format('LLL')}, ${item.idUsuarioNavigation.nome} propôs: `}</Text>
          <Text style={styles.textoDecisao} >{`${item.descricaoDecisao}`}</Text>
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
                  // onPress={() =>
                  //   navigation.navigate("CadastrarFeedback", {
                  //     idDecisao: item.idDecisao,
                  //   })
                  // }
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
                      <Text style={styles.tituloFeedback} >{`Em ${moment(feedback.dataPublicacao).locale('pt-BR').format('LLL')}, ${feedback.idUsuarioNavigation.nome} comentou: `}</Text>
                      <Text style={styles.textoFeedback} >{`${feedback.comentarioFeedBack}`}</Text>
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
        <Text style={styles.instrucoes}  >Veja abaixo os comentários que outros usuários também deixaram sobre as decisões dos gestores: </Text>
        <ScrollView>
        <FlatList
          contentContainerStyle={styles.containerFlatList}
          data={listaDecisao}
          keyExtractor={(item) => item.idDecisao}
          renderItem={renderDecisao}
          scrollEnabled={true}
        />
        </ScrollView>
      </View>
    );
  }
}


if (Dimensions.get('window').width > 700) {

  var styles = StyleSheet.create({

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
    instrucoes: {
      fontSize: 20,
      textAlign: 'justify',
      fontFamily: 'Quicksand_300Light',
      color: "#2A2E32",
      marginTop: '5%',
      marginHorizontal: '5%'
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
      maxHeight: largura * .5,
      borderRadius: 5,
      //borderTopWidth: 25,
      //borderWidth: 1,
      borderTopColor: "rgba(0, 0, 0, 0.8)",
      borderColor: 'gray',
      alignItems: 'flex-start',
      marginTop: 20,
      paddingBottom: 10,
      // backgroundColor: 'blue'
    },

    imgPerfilCardWrapper: {
      flexDirection: 'row',
      width: "80%",
      height: 120,
      borderColor: '#451531',
      borderWidth: 3,
      borderRadius: 10,
      alignItems: 'flex-start',
      justifyContent: 'center',
      //marginHorizontal: '2%',
      marginTop: 10,
      backgroundColor: '#451531',
    },
    img_perfil: {
      width: 100,
      height: '90%',
      borderRadius: 5,
      alignSelf: 'center',
      marginLeft: 5
    },
    containerTextos: {
      flex: 1,
      margin: 5,
      
      // backgroundColor: 'red',
      
    },
    tituloDecisao: {
      fontSize: 18,
      color: 'white'
      
    },
    textoDecisao: {
      fontSize: 22,
      marginLeft: 20,
      marginTop: 5,
      color: 'white',
      fontStyle: 'italic'
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
      marginTop: 15,
      //backgroundColor: 'gold'
    },
    imgPerfilCardWrapper_feedback: {
      flexDirection: 'row',
      width: "80%",
      height: 100,
      borderColor: '#451531',
      borderWidth: 3,
      borderRadius: 5,
      alignItems: 'flex-start',
      justifyContent: 'center',
      //marginHorizontal: '2%',
      // backgroundColor: 'yellow',
    },
    img_perfil_feedback: {
      width: 90,
      height: '90%',
      borderRadius: 7,
      alignSelf: 'center',
      marginLeft: 5
    },
    containerTextos_feedback: {
      flex: 1,
      margin: 10,
      // backgroundColor: 'gray',
    },
    tituloFeedback: {
      fontSize: 18
      
    },
    textoFeedback: {
      fontSize: 22,
      marginLeft: 20,
      fontStyle: 'italic'
    },

  });
}
else {
  var styles = StyleSheet.create({

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
      paddingTop: '10%',
      // backgroundColor: 'cyan',
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
      paddingTop: '5%',
    },
    instrucoes: {
      fontSize: 18,
      textAlign: 'justify',
      fontFamily: 'Quicksand_300Light',
      color: "#2A2E32",
      marginTop: 10,
      marginHorizontal: '5%'
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
      //borderTopWidth: 25,
      //borderWidth: 1,
      borderTopColor: "rgba(0, 0, 0, 0.8)",
      borderColor: 'gray',
      alignItems: 'flex-start',
      marginTop: 20,
      paddingBottom: 10,
      // backgroundColor: 'blue'
    },

    imgPerfilCardWrapper: {
      flexDirection: 'row',
      width: "90%",
      height: 100,
      borderColor: '#451531',
      borderWidth: 3,
      borderRadius: 10,
      alignItems: 'flex-start',
      justifyContent: 'center',
      //marginHorizontal: '2%',
      marginTop: 10,
      backgroundColor: '#451531',
    },
    img_perfil: {
      width: 50,
      height: '55%',
      borderRadius: 5,
      alignSelf: 'baseline',
      marginLeft: 5,
      marginTop: 5
    },
    containerTextos: {
      flex: 1,
      margin: 5,
      
      // backgroundColor: 'red',
      
    },
    tituloDecisao: {
      fontSize: 12,
      color: 'white',
      marginLeft: 5
    },
    textoDecisao: {
      fontSize: 16,
      marginLeft: 5,
      marginTop: 0,
      color: 'white',
      fontStyle: 'italic',
      fontWeight: 'bold'
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
      marginTop: 15,
      //backgroundColor: 'gold'
    },
    imgPerfilCardWrapper_feedback: {
      flexDirection: 'row',
      width: "90%",
      //height: 100,
      borderColor: '#451531',
      borderWidth: 3,
      borderRadius: 10,
      alignItems: 'flex-start',
      justifyContent: 'center',
      //marginHorizontal: '2%',
      marginTop: 10
      //backgroundColor: 'yellow',
    },
    img_perfil_feedback: {
      width: 50,
      height: 50,
      borderRadius: 7,
      alignSelf: 'baseline',
      marginLeft: 5,
      marginTop: 5
    },
    containerTextos_feedback: {
      flex: 1,
      margin: 10,
      // backgroundColor: 'gray',
    },
    tituloFeedback: {
      fontSize: 12,
      color: 'black',
      marginLeft: 0,
      textAlign: 'left'
      
    },
    textoFeedback: {
      fontSize: 16,
      marginLeft: 0,
      marginTop: 0,
      color: 'black',
      fontStyle: 'italic',
      fontWeight: 'bold'
    },

  });
}

