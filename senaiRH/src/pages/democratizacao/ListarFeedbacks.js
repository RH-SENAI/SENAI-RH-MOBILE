import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

import api from '../../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ListaFeedback() {

  const [listaFeedback, setListaFeedback] = useState([])
 

  const navigation = useNavigation();

  async function buscarFeedbacks() {
    const token = await AsyncStorage.getItem('userToken');
    
    
    if (token != null) {
      const resposta = await api.get('Feedbacks/Listar', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      
      const dadosDaApi = await resposta.data;
      
      setListaFeedback(dadosDaApi);
    }
  };
  
  useEffect(() => {
    buscarFeedbacks()
  },[])


  const renderItem = ({ item }) => (
    <View key = {item.idFeedback} style={styles.card}>
      <TouchableOpacity
         key = {item.idFeedback} onPress={() => navigation.navigate('cadastroFeedback', {idDecisao: item.idDecisao})}
      >
        <View key = {item.idFeedback} style={styles.tituloCardWrapper}>
          <Text key = {item.idFeedback} style={styles.tituloCard}>
            {item.idUsuarioNavigation.nome} disse sobre a proposta "
            {item.idDecisaoNavigation.descricaoDecisao}"
          </Text>

        </View>

        <View key = {item.idFeedback} style={styles.textoCard}>
          <Text key = {item.idFeedback} style={styles.feedback}>{item.comentarioFeedBack}</Text>
        </View>
        <View key = {item.idFeedback} style={styles.fotoPerfil}>
          <Image key = {item.idFeedback}
            source={{ uri:
              'http://192.168.3.156:5000/api/api/StaticFiles/Images/' +
              item.caminhoFotoPerfil}
            }
            style={styles.img_perfil}
          />
        </View>

      </TouchableOpacity>
    </View>
  );


  return (
    <View style={styles.container}>
      <View style={styles.mainHeader}>
        <Image
          source={require('../../../assets/imgMobile/logo_2S.png')}
          style={styles.imgLogo}
        />
      </View>

      <Text style={styles.h1nonBold}> Feedbacks da</Text>
      <Text style={styles.h1Bold}> DEMOCRATIZAÇÃO</Text>

      <View style={styles.containerFlatlist}>
        <FlatList
          contentContainerStyle={styles.mainBodyContent}
          data={listaFeedback}
          keyExtractor={item => item.idFeedback}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
  },

  img_perfil: {
    width: 900,
    backgroundColor: 'blue',
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
    fontWeight: '500',
    textTransform: 'uppercase',
    color: '#000000',
    marginTop: 60,
  },

  h1Bold: {
    fontSize: 32,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#000000',
    marginBottom: 30,
  },

  mainBodyContent: {
    justifyContent: 'space-around',
  },

  card: {
    width: '85%',
    marginBottom: 30,
  },

  tituloCard: {
    color: 'black',
    fontSize: 15,
    height: 50,
    fontWeight: '600',
  },

  tituloCardWrapper: {
    backgroundColor: '#f2f2f2',
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  textoCard: {
    backgroundColor: '#f2f2f2',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
  },

  containerFlatlist: {
    flex: 1,
    width: '100%',
    marginLeft: 60,
  }
});



// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
// import axios from 'axios';

// export default function Democratizacao() {

//     const baseUrl = 'https://api.github.com';
//     const perPage = 10;

//     const [data, setData] = useState([
//     ]);
//     const [loading, setLoading] = useState(false);
//     const [page, setPage] = useState(1);

//     useEffect(() => {
//         loadApi();
//     }, []);

//     async function loadApi() {
//         if (loading) return;

//         setLoading(true);

//         const response = await axios.get(`${baseUrl}/search/repositories?q=react&per_page=${perPage}&page=${page}`);

//         setData([...data, ...response.data.items]);
//         setPage(page + 1);
//         setLoading(false);
//     }

//     return (
//         <View style={styles.container}>
//             <FlatList style={{ marginTop: 35 }}
//                 contentContainerStyle={{ marginHorizontal: 20 }}
//                 data={data}
//                 keyExtractor={item => String(item.id)}
//                 renderItem={({ item }) => <ListItem data={item} />}
//                 onEndReached={loadApi}
//                 onEndReachedThreshold={0.15}
//                 ListFooterComponent={<FooterList load={loading} />} />
//         </View>
//     );
// }

// function ListItem({ data }) {
//     return (
//         <View style={styles.listItem}>
//             <Text style={styles.listText}>{data.full_name}</Text>
//         </View>
//     )
// }

// function FooterList({ load }) {
//     if ( ! load) return null; 
//     return (
//         <View style={styles.loading}>
//             <ActivityIndicator size={25} color='#121212'/>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     listItem: {
//         // backgroundColor: '#C20004',
//         padding: 25,
//         marginTop: 20,
//         borderRadius: 10,
//         borderColor: '#C20004',
//         borderWidth: 2,
//     },
//     listText: {
//         fontSize: 16,
//         color: 'black'
//     },
//     loading: {
//         padding: 10,
//         marginBottom: 15
//     }
// });