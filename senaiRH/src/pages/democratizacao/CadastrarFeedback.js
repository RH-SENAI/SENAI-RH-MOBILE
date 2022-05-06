// React Imports
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Animated,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';

// Expo
import AppLoading from 'expo-app-loading';

// Pacotes
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

// Services
import api from '../../services/api';

// Fonts
import {
  useFonts,
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light_Italic,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black_Italic,
} from '@expo-google-fonts/montserrat';

import {
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import { transform } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

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


  const sizeChanging = useRef(new Animated.Value(100)).current;


  // Float Label Animação
  const moveText = useRef(new Animated.Value(0)).current;

  const ChangeSizeUp = () => {
    Animated.timing(sizeChanging, {
      toValue : 150,
      useNativeDriver: false,
    }).start()
  }

  const ChangeSizeDown = () => {
    Animated.timing(sizeChanging, {
      toValue : 100,
      useNativeDriver: false,
    }).start()
  }

  const onChangeText = (text) => {
    setComentarioFeedback(text);
  };
  const onFocusHandler = () => {
    if (comentarioFeedback !== "") {
      moveTextTop();
      moveTextLeft();
    }
  };
  const onBlurHandler = () => {
    if (comentarioFeedback === "") {
      moveTextBottom();
    }
  };
  const moveTextTop = () => {
    Animated.timing(moveText, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const moveTextBottom = () => {
    Animated.timing(moveText, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const yVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -20],
  });
  const animStyle = {
    transform: [
      {
        translateY: yVal,
      },
    ],
  };

  // Fontes utilizada
  let [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light_Italic,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black_Italic,

    // Quicksand
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  })


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

  useEffect(() => { BuscarFeedbacks();
                    ChangeSizeUp(); }, []);
  useEffect(() => { BuscarDecisoes() }, []);
  useEffect(() => { async () => setIdUsuario(await AsyncStorage.getItem('userToken')) }, []);
  useEffect(() => {
    if (comentarioFeedback !== "") {
      moveTextTop();
    } else if (comentarioFeedback === "") {
      moveTextBottom();
    }
  }, [comentarioFeedback])
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(!keyboardStatus);
      ChangeSizeDown();
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(keyboardStatus);
      ChangeSizeUp();

    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const boxStyle = {
    height : sizeChanging 
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.mainHeader}>
          <Image style={styles.logoSenai} source={require("../../../assets/imgMobile/logo_2S.png")} resizeMode="contain" />
        </View>

        <Text style={styles.tituloDemocratizacao}>Democratização</Text>

        <Animated.View style={[styles.sectionDemocratizacao, boxStyle]} >

          <Text style={styles.sectionDemocratizacaoTxt}>
            Seu gerente tomou a seguinte decisão:
          </Text>
          <Text style={styles.sectionDemocratizacaoDecisao}>
            {/* {
              listaDecisao.map((decisao) => {
                return decisao.
              })
            } */}

            “Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...”
          </Text>
        </Animated.View>

        <View style={styles.sectionDemocratizacaoBox}>
          <Animated.View style={[styles.animatedStyle, animStyle]}>
            <Text style={styles.label}>Insira seu feedback</Text>
          </Animated.View>
          <TextInput

            keyboardType="default"
            onChangeText={campo => onChangeText(campo)}
            value={comentarioFeedback}
            style={styles.sectionDemocratizacaoInput}
            editable={true}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            blurOnSubmit
          >
          </TextInput>
          <TextInput
            placeholder="Insira  uma nota para a decisão"
            keyboardType="numeric"
            onChangeText={campo => setNotaDecisao(campo)}
            value={notaDecisao}
            style={styles.sectionDemocratizacaoInput}>
          </TextInput>
        </View>
        <TouchableOpacity style={styles.btnCadastro} onPress={() => CadastarFeedback}>
          <Text style={styles.btnCadastroText}>Enviar Feedback</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F2F2F2'
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

  tituloDemocratizacao: {
    fontSize: 35,
    color: '#2A2E32',
    fontFamily: 'Montserrat_600SemiBold',
    marginTop: 32,
    marginBottom: 32,
    textTransform: 'uppercase',
    width: '86%'
  },

  sectionDemocratizacao:
  {
    borderColor: '#B3B3B3',
    width: '86%',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'flex-start',
    paddingLeft: 10,
    marginBottom: 18
  },

  sectionDemocratizacaoTxt: {
    fontFamily: 'Quicksand_600SemiBold',
    fontSize: 15,
    color: '#000000',
    paddingTop: 16,
    paddingBottom: 8,
    paddingLeft: 3
  },


  sectionDemocratizacaoDecisao: {
    fontFamily: 'Quicksand_300Light',
    color: '#000000',
    fontSize: 12,
    paddingLeft: 4,
    paddingRight: 12
  },

  sectionDemocratizacaoBox: {
    width: '86%',
    height: 100
  },

  sectionDemocratizacaoInput: {
    width: '100%',
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#B3B3B3',
    paddingLeft: 16
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
  },

  label: {
    color: '#636466',
    fontSize: 10,
    fontFamily: 'Quicksand_300Light',
  },
  animatedStyle: {
    top: 9,
    left: 20,
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: '#F2F2F2',
    width: 95,
    alignItems : 'center'
  }
})