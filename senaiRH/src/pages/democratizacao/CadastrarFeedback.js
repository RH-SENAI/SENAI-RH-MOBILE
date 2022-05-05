// React Imports
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';

// Pacotes
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import moment from 'moment';
import AppLoading from 'expo-app-loading';

// Services
import api from '../../services/api';

// Fonts
let customFonts = {
  'Montserrat-Regular': require('../../../assets/fonts/montserrat/Montserrat-Regular.ttf'),
  'Montserrat-Bold': require('../../../assets/fonts/montserrat/Montserrat-Bold.ttf'),
  'Montserrat-SemiBold': require('../../../assets/fonts/montserrat/Montserrat-SemiBold.ttf'),
  'Montserrat-Medium': require('../../../assets/fonts/montserrat/Montserrat-Medium.ttf'),
  'Quicksand-Regular': require('../../../assets/fonts/quicksand/Quicksand-Regular.ttf'),
  'Quicksand-SemiBold': require('../../../assets/fonts/quicksand/Quicksand-SemiBold.ttf')
}

export default function CadastroFeedback({ route }) {

  // States
  const [idUsuario, setIdUsuario] = useState(0);
  const [idDecisao, setIdDecisao] = useState(1);
  const [listaFeedbacks, setListaFeedbacks] = useState([]);
  const [listaDecisao, setListaDecisao] = useState([]);
  const [descricaoDecisao, setDescricaoDecisao] = useState('');
  const [comentarioFeedback, setComentarioFeedback] = useState('');
  const [valorMoedas, setValorMoedas] = useState(0);
  const [notaDecisao, setNotaDecisao] = useState('');
  const [dataPublicacao] = useState(moment().format('YYYY-MM-DD'));
  const [nomeFuncionario, setNomeFuncionario] = useState('');

  async function _loadFontsAsync(){
    await Font.loadAsync(customFonts);
    useState({ fontsLoaded: true });
  }

  
  async function CadastarFeedback() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const data = {
        idUsuario: idUsuario,
        idDecisao: route.params.idDecisao,
        comentarioFeedBack: comentarioFeedback,
        notaDecisao: notaDecisao,
        dataPublicacao: dataPublicacao,
        valorMoedas: valorMoedas,
        notaDecisao: notaDecisao,
      };

      
      const resposta = await api.post('Feedbacks/Cadastrar', data, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      
      if (resposta.status == 201) {
        console.warn('Cadastro de Feedback realizado!');
      } else {
        console.warn('Falha ao realizar o cadastro.');
      }

      
    } catch (error) {
      console.warn(error);
    }
  };
  
  async function BuscarFeedbacks() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      const resposta = await api.get('Feedbacks/Listar', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      
      if (resposta.status === 200) {
        setListaFeedbacks(resposta.data);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  
  async function BuscarDecisoes() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      const resposta = await api.get('/Decisoes/Listar', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      if (resposta.status === 200) {
        setListaDecisao(resposta.data);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => { BuscarFeedbacks() }, []);
  useEffect(() => { BuscarDecisoes() }, []);
  useEffect(() => { async () => setIdUsuario(await AsyncStorage.getItem('userToken')) }, []);
  useEffect(() => _loadFontsAsync,[])


  return (
    <View style={styles.container}>
      <View style={styles.mainHeader}>
        <Image style={styles.logoSenai} source={require("../../../assets/imgMobile/logo_2S.png")} resizeMode="contain" />
      </View>
        <Text style={styles.titulo_democratizacao}>{'Democratização'.toUpperCase()}</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTxt}>

          {listaDecisao.map(decisao => {

            if (decisao.idDecisao == route.params.idDecisao) {
              return (
                <Text key={decisao.idDecisao} style={styles.feedback}>
                  <Text style={styles.boxFeedback}>
                    <Text style={styles.tituloDecisao}>
                      O gerente tomou a seguinte decisão:
                    </Text>
                    <Text style={styles.paragrafoDecisao}> {decisao.descricaoDecisao}</Text>
                  </Text>
                </Text>
              );
            }
          })}

        </Text>
      </View>

      <TextInput
        placeholder="Deseja adicionar algum feedback?"
        keyboardType="default"
        onChangeText={campo => setComentarioFeedback(campo)}
        value={comentarioFeedback}
        style={styles.inputCadastro}>
      </TextInput>

      <TextInput
        placeholder="Insira  uma nota para a decisão"
        keyboardType="numeric"
        onChangeText={campo => setNotaDecisao(campo)}
        value={notaDecisao}
        style={styles.inputCadastro}>
      </TextInput>

      <TouchableOpacity style={styles.btnCadastro} onPress={() => CadastarFeedback}>
        <Text style={styles.btnCadastroText}>Enviar Feedback</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  mainHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    width: '100%',
  },

  logoSenai: {
    width: "100%",
    height: 40,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  h1nonBold: {
    fontSize: 20,
    fontWeight: '500',
    textTransform: 'uppercase',
    color: '#000000',
    marginTop: 60,
  },

  titulo_democratizacao: {
    fontSize: 35,
    color: '#000000',
    fontFamily: 'Montserrat-SemiBold'
  },

  tituloDecisao: {
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#000000',
  },

  paragrafoDecisao: {
    fontSize: 15,
    fontWeight: '500',
    textTransform: 'uppercase',
    color: '#000000',
    marginTop: 60,
  },

  section: {
    backgroundColor: '#f2f2f2',
    marginTop: 20,
    marginBottom: 20,
  },

  inputCadastro: {
    width: '80%',
    height: 42,
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },

  btnCadastro: {
    width: 229,
    height: 42,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 10,
  },

  btnCadastroText: {
    color: '#CB334B',
    textTransform: 'uppercase',
  },

  imgCadastro: {
    marginTop: 80,
    marginLeft: 180
  },

  boxFeedback: {
    backgroundColor: '#ffffff',
    height: 33,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
})
