// React Imports
import React, { useState, useEffect, useRef } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  TextInput,
  KeyboardAvoidingView
} from "react-native";

// Pacotes
import AsyncStorage from "@react-native-async-storage/async-storage";

// Expo
import AppLoading from 'expo-app-loading';

// Fonts
import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from '@expo-google-fonts/montserrat';

import {
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_600SemiBold,
} from '@expo-google-fonts/quicksand';

// Services
import api from "../../services/api";
import apiGp1 from "../../services/apiGp1";
import jwtDecode from "jwt-decode";

export default function Perfil() {

  const [usuario, setUsuario] = useState([]);
  const [senhaAtual, setSenhaAtualUsuario] = useState('');
  const [mudarSenha, setMudarSenha] = useState(false);
  const [senhaNova, setSenhaNovaUsuario] = useState('');
  const [senhaConfirmacao, setSenhaConfirmacaoUsuario] = useState('');

  // Fontes utilizada
  let [fontsLoaded] = useFonts({

    //Montserrat
    Montserrat_500Medium,
    Montserrat_600SemiBold,

    // Quicksand
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_600SemiBold,
  })

  const moveTextFb = useRef(new Animated.Value(0)).current;

  const onChangeNovaSenha = (text) => {
    setSenhaNovaUsuario(text);
  };

  // Actions Animação Fb
  const moveTextTopFb = () => {
    Animated.timing(moveTextFb, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const moveTextBottomFb = () => {
    Animated.timing(moveTextFb, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const onFocusHandlerFb = () => {
    if (senhaNova === "") {
      moveTextTopFb();
    }
  };
  const onBlurHandlerFb = () => {
    if (senhaNova === "") {
      moveTextBottomFb();
    }
  };
  // Styles Animação Fb
  const yValFb = moveTextFb.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -20],
  });
  const animStyleFb = {
    transform: [
      {
        translateY: yValFb,
      },
    ],
  };

  const moveTextConfirmacao = useRef(new Animated.Value(0)).current;

  const onChangeConfirmacaoSenha = (text) => {
    setSenhaConfirmacaoUsuario(text);
  };

  // Actions Animação Fb
  const moveTextTopConfirmacaoSenha = () => {
    Animated.timing(moveTextConfirmacao, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const moveTextBottoConfirmacaoSenha = () => {
    Animated.timing(moveTextConfirmacao, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const onFocusHandlerConfirmacaoSenha = () => {
    if (senhaConfirmacao === "") {
      moveTextTopConfirmacaoSenha();
    }
  };
  const onBlurHandlerConfirmacaoSenha = () => {
    if (senhaConfirmacao === "") {
      moveTextBottoConfirmacaoSenha();
    }
  };
  // Styles Animação Fb
  const yValConfirmacao = moveTextConfirmacao.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -20],
  });
  const animStyleConfirmacao = {
    transform: [
      {
        translateY: yValConfirmacao,
      },
    ],
  };

  async function BuscarUsuario() {
    try {
      const token = await AsyncStorage.getItem('userToken');

      const resposta = await api.get('Usuarios/Listar/' + jwtDecode(token).jti, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      if (resposta.status === 200) {
        setUsuario([resposta.data]);
      }
    } catch (error) {
      console.warn(error);
    }
  }

  async function MudarSenha() {
    try {

      setSenhaAtualUsuario("AGORAVAI")

      const token = await AsyncStorage.getItem('userToken');
      console.warn(jwtDecode(token).jti)

      const resposta = await apiGp1.patch('Usuarios/AlteraSenha/' + jwtDecode(token).jti,{}, {
        headers: {
          'Authorization': 'Bearer ' + token,
          'ContentType': 'application/json',
          'senhaUser' : senhaAtual,
          'senhaNova' : senhaNova,
          'senhaConfirmacao' : senhaConfirmacao
        },
      });

      if (resposta.status === 200) {
          console.warn("foi")
      }
    } catch (error) {
      console.warn(error);
    }
  }

  function AlterarSenha() {
    setMudarSenha(!mudarSenha)
  }

  useEffect(() => BuscarUsuario(), [])

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (

      <KeyboardAvoidingView style={styles.container}>

        <Image style={styles.logoSenai} source={require("../../../assets/imgMobile/logo_2S.png")} resizeMode="contain" />

        {usuario.map((usuario) => {

          if (mudarSenha) {
            return (
              <ScrollView contentContainerStyle={styles.conteudo}>
                <Text style={styles.titulo}>Perfil</Text>
                <View style={styles.fotoPerfilContainer}>

                  <Image
                    source={usuario.caminhoFotoPerfil == undefined ? {
                      uri:
                        "https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples/" +
                        usuario.caminhoFotoPerfil,
                    } : require("../../../assets/imgMobile/Perfil.png")}
                    resizeMod="cover"
                  />
                </View>

                <Text style={styles.textInfGeralPerfil}>Atualizar Senha</Text>

                <Animated.View style={[styles.animatedStyle1, animStyleFb]}>
                  <Text style={styles.labelComentarioFeedback}>Insira sua nova senha</Text>
                </Animated.View>

                <TextInput
                  keyboardType="default"
                  onChangeText={campo => onChangeNovaSenha(campo)}
                  value={senhaNova}
                  style={styles.sectionDemocratizacaoInput}
                  editable={true}
                  onFocus={() => onFocusHandlerFb()}
                  onBlur={() => onBlurHandlerFb()}
                  blurOnSubmit
                />

                <Animated.View style={[styles.animatedStyle2, animStyleConfirmacao]}>
                  <Text style={styles.labelComentarioFeedback}>Confirmar senha</Text>
                </Animated.View>

                <TextInput
                  keyboardType="default"
                  onChangeText={campo => onChangeConfirmacaoSenha(campo)}
                  value={senhaConfirmacao}
                  style={styles.sectionDemocratizacaoInput}
                  editable={true}
                  onFocus={() => onFocusHandlerConfirmacaoSenha()}
                  onBlur={() => onBlurHandlerConfirmacaoSenha()}
                  blurOnSubmit
                />

                <TouchableOpacity style={styles.btnCadastro} onPress={() => MudarSenha()}>
                  <Text style={styles.btnCadastroText}>Alterar Senha</Text>
                </TouchableOpacity>

              </ScrollView>
            )
          }
          return (
            <ScrollView contentContainerStyle={styles.conteudo}>

              <Text style={styles.titulo}>Perfil</Text>
              <View style={styles.fotoPerfilContainer}>

                <Image
                  source={usuario.caminhoFotoPerfil == undefined ? {
                    uri:
                      "https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples/" +
                      usuario.caminhoFotoPerfil,
                  } : require("../../../assets/imgMobile/Perfil.png")}
                  resizeMod="cover"
                />

              </View>


              <Text style={styles.textInfGeralPerfil}>Informação Geral</Text>

              <View style={styles.boxPerfil} >

                <View style={styles.line}>
                  <Text style={styles.lineTextPerfil}>{usuario.nome}</Text>
                </View>

                <View style={styles.line}>
                  <Text style={styles.lineTextPerfil}>{usuario.email}</Text>
                </View>

                <View style={styles.line}>
                  <Text style={styles.lineTextPerfil}>{usuario.cpf}</Text>
                </View>

                <View style={styles.line}>
                  <Text style={styles.lineTextPerfil}>{usuario.idCargoNavigation.nomeCargo}</Text>
                </View>

              </View>

              <TouchableOpacity style={styles.btnCadastro} onPress={() => AlterarSenha()}>
                <Text style={styles.btnCadastroText}>Alterar Senha</Text>
              </TouchableOpacity>

            </ScrollView>);
        })}

      </KeyboardAvoidingView>
    );
  }
}



const styles = StyleSheet.create({


  container: {
    flex: 1,
    backgroundColor: '#F2F2F2'
  },
  fotoPerfilContainer: {
    width: 111,
    height: 110,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'gray',
    marginVertical: 20
  },
  sectionDemocratizacaoInput: {
    width: '86%',
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#B3B3B3',
    paddingLeft: 16,
    marginBottom: 18
  },
  animatedStyle1: {
    top: 246,
    left: 43,
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: '#F2F2F2',
    width: 135,
    alignItems: 'center',
  },
  animatedStyle2: {
    top: 307,
    left: 40,
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: '#F2F2F2',
    width: 110,
    alignItems: 'center',
  },
  labelComentarioFeedback: {
    color: '#636466',
    fontSize: 12,
    fontFamily: 'Quicksand_300Light',
  },
  textInfGeralPerfil: {
    fontFamily: 'Quicksand_400Regular',
    fontSize: 20,
    color: 'black',
    marginRight: 203,
    marginBottom: 20
  },
  btnCadastro: {
    width: '86%',
    height: 43,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#C20004',
  },
  btnCadastroText: {
    fontFamily: 'Montserrat_500Medium',
    color: '#F2F2F2'
  },
  lineTextPerfil: {
    fontFamily: 'Quicksand_400Regular',
    fontSize: 20,
    color: '#B3B3B3'
  },

  logoSenai: {
    width: "100%",
    height: 40,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 20,
  },

  titulo: {
    fontSize: 32,
    width: '80%',
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'Montserrat_600SemiBold',
    textTransform: 'uppercase',
    color: '#2A2E32'
  },

  conteudo: {
    alignItems: 'center',
    paddingBottom: 20
  },

  boxPerfil: {
    backgroundColor: "#F2F2F2",
    paddingHorizontal: '5%',
    width: '100%'

  },
  titulos: {
    color: '#0A0A0A',
    fontSize: 16,
    fontWeight: 'bold'
  },
  line: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    paddingHorizontal: '3%',
    paddingVertical: 5,
    borderColor: '#C2C2C2',
    borderWidth: 3,
    marginBottom: 10,
    justifyContent: 'center',
    borderRadius: 10
  },

  sobreTrofeu: {
    width: 270,
    height: 50,
    fontSize: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: 16,
    backgroundColor: '#F2F2F2',
    //boxShadow: '19px',
    borderRadius: 5,
    flexDirection: 'row',


  },
  textTrofeu: {
    color: 'black',
    marginLeft: 10
  }
});