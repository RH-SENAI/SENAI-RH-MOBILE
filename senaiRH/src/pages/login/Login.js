import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
<<<<<<< HEAD
  Alert,
  Pressable,
=======
  Animated,
  Alert,
  ColorPropType,
>>>>>>> mobile-gp-2
} from 'react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import jwt_decode from "jwt-decode";
<<<<<<< HEAD
//import api from '../../services/apiGp1';
import api from '../../services/apiGp1';
import recuperar from "../alterarSenha/recuperarSenha.js"
import AwesomeAlert from 'react-native-awesome-alerts';
=======
import api from '../../services/apiGp3';
import AwesomeAlert from 'react-native-awesome-alerts';
import AnimatedInput from 'react-native-animated-input';
import axios from 'axios';
import { Colors } from 'react-native/Libraries/NewAppScreen';
>>>>>>> mobile-gp-2


let customFonts = {
  'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'),
<<<<<<< HEAD
  'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'),
=======
  'Montserrat-Medium' : require('../../../assets/fonts/Montserrat-Medium.ttf'),
>>>>>>> mobile-gp-2
  'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
  'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf')
}


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      cpf: '11111111176',
=======
      cpf: '71696553067',
>>>>>>> mobile-gp-2
      senha: 'Sesisenai@2022',
      fontsLoaded: false,
      error: 'Email ou Senha inválidos!',
      //erroMensagem: '',
      setLoading: false,
<<<<<<< HEAD
      showAlert: false,
    }
  }

  showAlert = () => {
    this.setState({ showAlert: true })
  }

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };


=======
      showAlert: false
    }
  }

  showAlert = () => {
    this.setState({showAlert: true})
  }
  
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };


>>>>>>> mobile-gp-2
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  realizarLogin = async () => {
<<<<<<< HEAD


    try {


      const resposta = await api.post('/Login', {
        cpf: this.state.cpf,
        senha: this.state.senha,
      });

      //console.warn(resposta);
      const token = resposta.data.token;

      //console.warn(token);

      await AsyncStorage.setItem('userToken', token);
      //console.warn(resposta.data);

      if (resposta.status === 200) {

        // console.warn('Login Realizado')
        //console.warn(jwt_decode(token).role)

        // this.state({isLoading:false})

        var certo = jwt_decode(token).role
        // console.warn('certo ' + certo)

        //this.showAlertSuce();
        this.props.navigation.navigate('Redirecionar');

      }

    } catch (error) {
      console.warn(error)
      this.showAlertSuce();
    }

  }

=======
    

    try {

      
      const resposta = await api.post('/Login', {
        cpf: this.state.cpf,
        senha: this.state.senha,
      });

      // console.warn(resposta);
      const token = resposta.data.token;

      // console.warn(token);

      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('idUsuario', jwt_decode(token).jti)
      // console.warn(resposta.data);

      if (resposta.status === 200) {

        // console.warn('Login Realizado')
        //console.warn(jwt_decode(token).role)

        // this.state({isLoading:false})

        var certo = jwt_decode(token).role
        //console.warn('certo ' + certo)

        this.props.navigation.navigate('Redirecionar');

      }
>>>>>>> mobile-gp-2

    } catch (error) {
      console.warn(error)
      this.showAlert();
    }

  }

  

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    }
    


    return (
<<<<<<< HEAD


      <View style={styles.body}>

        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="Oops !"
=======
      
      
      <View style={styles.body}>
        
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="Login Inválido!"
>>>>>>> mobile-gp-2
          titleStyle={
            styles.tituloModalLogin
          }
          message="O CPF ou a senha inserídos são inválidos!"
          messageStyle={styles.textoModalLogin}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          confirmButtonStyle={styles.confirmButton}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Voltar"
          confirmButtonColor="#C20004"
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
<<<<<<< HEAD


        <View style={styles.mainHeader}>
          <Image source={require('../../../assets/img-gp1/logoSenai2.png')}
=======
        <View style={styles.mainHeader}>
          <Image source={require("../../../assets/imgMobile/logo_2S.png")}
>>>>>>> mobile-gp-2
            style={styles.imgLogo}
          />
        </View>

        <View style={styles.container}>

          <Text style={styles.tituloPagina}>{'recursos humanos'.toUpperCase()}</Text>

<<<<<<< HEAD
=======
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


>>>>>>> mobile-gp-2
          <View style={styles.viewLoginCPF}>
            <TextInput style={styles.inputLogin}
              placeholder="CPF"
              keyboardType="numeric"
              placeholderTextColor="#B3B3B3"
              onChangeText={cpf => this.setState({ cpf })}
              value={this.state.value}
            />
          </View>

          <View style={styles.TextEmail}>
            <TextInput style={styles.inputLogin}
              placeholder="Senha"
              placeholderTextColor="#B3B3B3"
              keyboardType="default"
              onChangeText={senha => this.setState({ senha })}
              secureTextEntry={true}
              value={this.state.value}
            />
          </View>


          <View style={styles.erroMsg}>
<<<<<<< HEAD

            <Pressable onPress={() => this.props.navigation.navigate('primeiroAcesso')}>
              <Text style={styles.textEsque}> Esqueci a Senha</Text>
            </Pressable>

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
          <Image source={require('../../../assets/imgMobile/welcome.png')} />
=======
            {/* <Animated.Text 
              onPress={this.realizarLogin} 
              style={styles.erroText}
              animation="flipInY">
                Email ou Senha inválidos!
            </Animated.Text> */}

            
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
          <Image source={require('../../../assets/imgMobile/imagemLogin.png')} />
>>>>>>> mobile-gp-2
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
<<<<<<< HEAD
  },
  tituloModalLogin:
  {
    color: '#C20004',
    fontFamily: 'Montserrat-Medium',
    fontSize: 23,
    fontWeight: 'bold'
  },
=======
  },
  tituloModalLogin:
  {
    color: '#C20004',
    fontFamily: 'Montserrat-Medium',
    fontSize: 23,
    fontWeight: 'bold'
  },
>>>>>>> mobile-gp-2
  textoModalLogin:
  {
    width: 200,
    textAlign: 'center'
  },
<<<<<<< HEAD
  confirmButton: {
    width: 100,

    paddingLeft: 32
  },
=======
  confirmButton:{
    width: 100,
   
    paddingLeft: 32
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
>>>>>>> mobile-gp-2


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
    fontSize: 14,
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
    marginLeft: 250
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
<<<<<<< HEAD
=======
    //justifyContent:'flex-start',
>>>>>>> mobile-gp-2
    marginTop: 92,
    //width: 180,
    //height: 165,
    paddingLeft: 40,
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
<<<<<<< HEAD
});


=======
});
>>>>>>> mobile-gp-2
