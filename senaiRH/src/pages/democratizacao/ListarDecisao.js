import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import api from "../../services/api";

export default function ListarDecisao() {
  const [listaDecisao, setListaDecisao] = useState([]);

  const buscarDecisao = async () => {
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
    buscarDecisao();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <View key={item.idDecisao} style={styles.card}>
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

              <Text>Clique e de seu feedback!</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.mainHeader}>
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

const styles = StyleSheet.create({})
