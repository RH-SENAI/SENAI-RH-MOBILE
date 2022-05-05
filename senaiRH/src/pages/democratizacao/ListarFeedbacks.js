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

export default function ListaFeedback() {
  const [listaFeedback, setListaFeedback] = useState([]);

  const buscarFeedbacks = async () => {
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
    buscarFeedbacks();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <View key={item.idFeedback} style={styles.card}>
        <TouchableOpacity
          key={item.idFeedback}
          onPress={() =>
            navigation.navigate("cadastroFeedback", {
              idDecisao: item.idDecisao,
            })
          }
        >
          <View style={styles.containerCard}>
            <View key={item.idFeedback} style={styles.tituloCardWrapper}>
              <Text key={item.idFeedback} style={styles.tituloCard}>
                {item.idUsuarioNavigation.nome} disse sobre a proposta: "
                {item.idDecisaoNavigation.descricaoDecisao}"
              </Text>
            </View>

            <View key={item.idFeedback} style={styles.textoCard}>
              <Text key={item.idFeedback} style={styles.feedback}>
                {item.comentarioFeedBack}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <View style={styles.mainHeader}>
        <Image
          source={require("../../../assets/imgMobile/logo_2S.png")}
          style={styles.imgLogo}
        /> */}
      {/* </View> */}

      <Text style={styles.h1nonBold}> Feedbacks da</Text>
      <Text style={styles.h1Bold}> DEMOCRATIZAÇÃO</Text>

      <View style={styles.containerFlatlist}>
        <FlatList
          contentContainerStyle={styles.mainBodyContent}
          data={listaFeedback}
          keyExtractor={(item) => item.idFeedback}
          renderItem={renderItem}
        />
      </View>
    </View>
    // <View style={styles.container}>
    //   <FlatList
    //     style={{ marginTop: 35 }}
    //     contentContainerStyle={{ marginHorizontal: 20 }}
    //     data={data}
    //     keyExtractor={(item) => String(item.id)}
    //     renderItem={({ item }) => <ListItem data={item} />}
    //     onEndReached={loadApi}
    //     onEndReachedThreshold={0.15}
    //     ListFooterComponent={<FooterList load={loading} />}
    //   />
    // </View>
  );
}

// function ListItem({ data }) {
//   return (
//     <View style={styles.listItem}>
//       <Text style={styles.listText}>{data.full_name}</Text>
//     </View>
//   );
// }

// function FooterList({ load }) {
//   if (!load) return null;
//   return (
//     <View style={styles.loading}>
//       <ActivityIndicator size={25} color="#121212" />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
  },

  img_perfil: {
    width: 900,
    backgroundColor: "blue",
  },

  mainHeader: {
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

  mainBodyContent: {
    justifyContent: "space-around",
  },

  card: {
    marginBottom: 30,
    marginTop: 15,

  },
  tituloCardWrapper: {
    // backgroundColor: "#9081A6",
    // height: 33,
    justifyContent: "center",
    alignItems: "center",
    alignItems: "flex-start",
    textAlign:"center"
  },

  tituloCard: {
    backgroundColor: "#fff",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    width:250,
    color: "black",
  },



  feedback: {
    color: "red",
    textAlign: "center",
  },

  containerFlatlist: {
    flex: 1,
    width: "100%",
  },
  containerCard: {
    marginLeft: 30,
    marginRight: 30,
    // borderWidth: 2,
    padding: 25,
    // borderColor: "gray",
    borderRadius: 5,
  },

  
});
