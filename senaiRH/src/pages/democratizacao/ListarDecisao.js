import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ListarDecisao() {
  const [listaDecisao, setListaDecisao] = useState([]);
  const navigation = useNavigation();

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
    }
  };

  useEffect(() => {
    BuscarDecisao();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.container}>
<<<<<<< HEAD
      <View key={item.idDecisao} style={styles.card}>
        <TouchableOpacity
          key={item.idDecisao}
          onPress={() =>
            navigation.navigate("CadastrarFeedback", {
              idDecisao: item.idDecisao,
            })
          }
        >
          <View style={styles.containerCard}>
            <View key={item.idDecisao} style={styles.tituloCardWrapper}>
              <Text key={item.idDecisao} style={styles.tituloCard}>
                {item.idUsuarioNavigation.nome} deu essa ideia: "
                {item.descricaoDecisao}"
              </Text>   

              <Text>Clique e de seu feedback!</Text>
=======
      <View style={styles.imgPerfilCardWrapper}>
        <View key={item.idDecisao} style={styles.cardClicavel}>
          <TouchableOpacity
            key={item.idDecisao}
            onPress={() =>
              navigation.navigate("cadastroFeedback", {
                idDecisao: item.idDecisao,
              })
            }
          >
            <View style={styles.containerCard}>
              <View key={item.idDecisao} style={styles.tituloCardWrapper}>
                <Text key={item.idDecisao} style={styles.tituloCard}>
                  {item.idUsuarioNavigation.nome} deu essa ideia: "
                  {item.descricaoDecisao}"
                </Text>
                <Text style={styles.mensagem}>Clique e de seu feedback!</Text>
              </View>
>>>>>>> 43793d47930c0b4644cb8a1eb4a96692c568ce52
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.imgPerfilCardWrapper}>
      <View key={item.idFeedback} style={styles.fotoPerfil}>
        <Image
          key={item.idFeedback}
          source={{
            uri:
              "http://192.168.3.107:5000/api/StaticFiles/Images/" +
              item.caminhoFotoPerfil,
          }}
          style={styles.img_perfil}
        />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/imgMobile/logo_2S.png")}
          style={styles.imgLogo}
        />
      </View>

      <Text style={styles.h1nonBold}> Listagem de</Text>
      <Text style={styles.h1Bold}> DECISÃO</Text>

      <View style={styles.containerFlatlist}>
        <FlatList
          contentContainerStyle={styles.mainBodyContent}
          data={listaDecisao}
          keyExtractor={(item) => item.idDecisao}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
   marginHorizontal:'5%'
  },

  img_perfil: {
    width: 900,
    backgroundColor: "blue",
  },

  header: {
    width: 290,
    height: 40,
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 32,
  },

  imgLogo: {
    width: "100%",
    height: 40,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  h1nonBold: {
    fontSize: 32,
    fontWeight: "500",
    textTransform: "uppercase",
    color: "#000000",
    marginTop: 32,
  },

  h1Bold: {
    fontSize: 32,
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#000000",
    marginBottom: 30,
  },

  cardClicavel:{
    borderWidth:2,
    borderColor:"gray",
    borderRadius:10,
    padding:10,
    marginTop:16,
   
    
  },

  containerCard:{
    width:250
  },

  tituloCard:{
    textAlign:"center",
    marginBottom:8
  },
  mensagem:{
    textAlign:"center"
  }
});
