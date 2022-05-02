import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Animated,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import jwt_decode from "jwt-decode";
import api from '../../services/apiGp1';
import AnimatedInput from 'react-native-animated-input';
import axios from 'axios';

let customFonts = {
  'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'),
  'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
  'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf')
}


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cpf: '0009886654',
      senha: 'v123',
      fontsLoaded: false,
      error: 'Email ou Senha inválidos!',
      //erroMensagem: '',
      setLoading: false,
    }
  }



  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  realizarLogin = async () => {
    console.warn(this.state.cpf + ' ' + this.state.senha);

    try {

      
      const resposta = await api.post('/Login', {
        cpf: this.state.cpf,
        senha: this.state.senha,
      });

      console.warn(resposta);
      const token = resposta.data.token;

      console.warn(token);

      await AsyncStorage.setItem('userToken', token);
      console.warn(resposta.data);

      if (resposta.status == 200) {

        console.warn('Login Realizado')
        //console.warn(jwt_decode(token).role)

        // this.state({isLoading:false})

        var certo = jwt_decode(token).role
        //console.warn('certo ' + certo)

        this.props.navigation.navigate('Redirecionar');

      }

    } catch (error) {
      console.warn(error)
      //Alert.alert("Email ou Senha inválidos!")
    }

  }

  

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    }

    return (
      <View style={styles.body}>

        <View style={styles.mainHeader}>
          <Image source={require('../../../assets/img-gp1/logoSenai2.png')}
            style={styles.imgLogo}
          />
        </View>

        <View style={styles.container}>

          <Text style={styles.tituloPagina}>{'recursos humanos'.toUpperCase()}</Text>

          {/* ANIMAÇÃO PRECISA FAZER OU NÃO */}
          {/* <View >
            <AnimatedInput 
              placeholder="CPF"
              keyboardType="numeric"
              // valid={isValid}
              //errorText="Error"
              onChangeText={cpf => this.setState({ cpf })}
              value={this.state.value}
              styleLabel={{
                fontFamily: 'Quicksand-Regular',
                paddingLeft: 40,
                paddingTop: 10,
                fontSize: 12,
                borderWidth: 1,
                borderRadius: 10,
                height:46,
                width: 350,                
                alignItems: 'center',
                justifyContent: 'center',
                

              }}
              styleBodyContent={styles.bodyContent}
              

            />
      
            <Animated.Text 
             
              //placeholder="CPF"
              keyboardType="numeric" 
              // valid={isValid}
              //errorText="Error"
              onChangeText={cpf => this.setState({ cpf })}
            //value={this.state.value}
            styleLabel={{ 
              fontFamily: 'Quicksand-Regular', 
              fontSize: 12,
            }}
            CPF
            />

          </View> */}


          <View style={styles.viewLoginCPF}>
            <TextInput style={styles.inputLogin}
              placeholder="CPF"
              keyboardType="numeric"
              onChangeText={cpf => this.setState({ cpf })}
              value={this.state.value}
            />
          </View>

          <View style={styles.TextEmail}>
            <TextInput style={styles.inputLogin}
              placeholder="Senha"
              keyboardType="default"
              onChangeText={senha => this.setState({ senha })}
              secureTextEntry={true}
              value={this.state.value}
            />
          </View>


          <View style={styles.erroMsg}>
            {/* <Text 
              onPress={this.realizarLogin} 
              style={styles.erroText}
              animation="flipInY">
                Email ou Senha inválidos!
            </Text> */}

            
              <TouchableOpacity  onPress={() => this.props.navigation.navigate('alterarSenha')}>
                <Text style={styles.textEsque}> Esqueci a Senha</Text>
              </TouchableOpacity>
           
          </View>

         



          <TouchableOpacity
            style={styles.btnLogin}
            onPress={this.realizarLogin}
          >
            <Text style={styles.btnText}>
              Entrar
            </Text>

          </TouchableOpacity>



        </View>
        <View style={styles.imgLoginView} >
          <Image source={require('../../../assets/img-gp1/imagemLogin.png')} />
        </View>

      </View>

    )
  }
};



const styles = StyleSheet.create({

  body: {
    backgroundColor: '#F2F2F2',
  },

  mainHeader: {
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imgLogo: {
    width: 224,
    height: 31,
  },

  container: {
    alignItems: 'center',
  },

  tituloPagina: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    color: '#2A2E32',
    width: 175,
    paddingTop: 64,
    paddingBottom: 50,
    alignItems: 'center',
  },

  // inputEmail:{
  //   width: 350,
  //   height: 46,
  //   borderWidth: 1,
  //   borderColor: '#B3B3B3',
  // },

  // inputSenha:{
  //   borderWidth: 1,
  //   borderColor: '#B3B3B3',
  // },


  // inputLogin: {
  //   //backgroundColor: 'white',
  //   //borderRadius: 10,
  //   //padding: 30,
  //   //alignItems: 'center',
  //   //justifyContent: 'center',
  //   shadowColor: '#c0c0c0',
  //   shadowOpacity: 0.9,
  //   shadowOffset: {
  //     height: 2,
  //     width: 2,
  //   },
  //   shadowRadius: 8,
  //   //elevation: 6,
  // },

  inputLogin: {
    width: 350,
    height: 46,
    borderWidth: 1,
    borderColor: '#B3B3B3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'column',
    //paddingTop: 8,
    //paddingBottom:24,
    paddingLeft: 15,
  },

  viewLoginCPF: {
    // padding: 3345678,
    marginBottom: 24,
  },

  erroMsg: {
    paddingTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  erroText: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 12,
    color: '#C20004',
    paddingRight: 115,
    //paddingTop: 24,
  },

  textEsque: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 12,
    color: '#C20004',
    //position:'absolute',
    //paddingTop: 1,
    //paddingRight: 50,
  },

  btnLogin: {
    width: 350,
    height: 46,
    fontSize: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    elevation: 16,
    backgroundColor: '#C20004',
    borderRadius: 10,
  },

  btnText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: "#F2F2F2",
    alignItems: 'center',
    justifyContent: 'center',
  },


  imgLoginView: {
    //justifyContent:'flex-start',
    marginTop: 92,
    //width: 180,
    //height: 165,
    paddingLeft: 40,
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
});


