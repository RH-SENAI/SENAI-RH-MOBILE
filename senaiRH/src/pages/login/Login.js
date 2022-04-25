import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

let customFonts = {
  'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'),
  'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
  'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf')
}

// import jwt_decode from "jwt-decode";
//import api from '../services/api';

export default class Login extends Component {
  constructor(props){
      super(props);
      this.state = {
          email: 'gp1_comum@email.com',
          senha: '12345678',
          fontsLoaded: false
      }
  }

  async _loadFontsAsync(){
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount(){
    this._loadFontsAsync();
  }

  realizarLogin = async () => {
      console.warn(this.state.email + ' ' + this.state.senha);

      try {

          const resposta = await api.post('/Login', {
              email : this.state.email,
              senha : this.state.senha,
          });

          console.warn(resposta);
          const token = resposta.data.token;

          console.warn(token);

          await AsyncStorage.setItem('userToken', token);
          console.warn(resposta.data);

          if (resposta.status == 200) {

              console.warn('Login Realizado')
              //console.warn(jwt_decode(token).role)

              var certo = jwt_decode(token).role
              //console.warn('certo ' + certo)
             
              this.props.navigation.navigate('Atividades');

              // switch (certo) {

              //     case '1':
                      
              //         break;

              //     default:
              //         break;
              // } 

          }

      } catch (error) {
          console.warn(error)
      }
  };


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

            {/* <View style={styles.inputLogin}>
            </View> */}

              {/* <Text style={styles.TextEmail}>
                Email
              </Text> */}
              <View style={styles.viewLoginEmail}>
                   <TextInput style={styles.inputLogin}
                placeholder=" Email"
                keyboardType="email-address"
                onChangeText={email => this.setState({ email })}
              /> 
              </View>
            
<View style={styles.viewLogin}>   
    <TextInput style={styles.inputLogin}
                placeholder="Senha"
                keyboardType="default"
                onChangeText={senha => this.setState({ senha })}
                secureTextEntry={true}
              />
              </View>
           
              

            {/* <View style={styles.inputLogin}>
              <Text style={styles.TextSenha}>
                Senha
              </Text>
              <TextInput style={styles.inputSenha}
                
                keyboardType="default"
                onChangeText={senha => this.setState({ senha })}
                secureTextEntry={true}
              />
            </View> */}

             <TouchableOpacity  style={styles.Esqueci}>
              <Text style={styles.textEsque}> Esqueci a Senha</Text>
             </TouchableOpacity>
            

            <TouchableOpacity
              style={styles.btnLogin}
              onPress={this.realizarLogin}
            >
              <Text style={styles.btnText}>
                Entrar
              </Text>

            </TouchableOpacity>

            

          </View>
             <View style={styles.imgLoginView} ><Image style={styles.imgLogin} source={require('../../../assets/img-gp1/imagemLogin.png')}/></View>

      </View>

    )
  }
};



const styles = StyleSheet.create({

  body: {
    backgroundColor: '#F2F2F2',
  },
  
  mainHeader:{
    paddingTop:40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imgLogo:{
    width: 224,
    height: 31,
  },

  container:{
    alignItems: 'center',
  },

  tituloPagina:{
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    color:'#2A2E32',
    width: 175,
    paddingTop:64,
    paddingBottom:32,
    alignItems:'center'
  },

  // inputEmail:{
  //   borderWidth: 1,
  //   borderColor: '#B3B3B3',
  // },

  // inputSenha:{
  //   borderWidth: 1,
  //   borderColor: '#B3B3B3',
  // },

  inputLogin: {
    width: 300,
    height: 43,
    borderWidth: 1,
    borderColor: '#B3B3B3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10,
    fontFamily: 'Quicksand-Regular',
    fontSize: 12,
    flexDirection:'column',
    //  paddingTop:32,
    //  paddingBottom:24

  },

  viewLoginEmail:{
     paddingBottom:24
  },

  TextEmail: {
    width: 230,
    height: 24,
    fontSize: 12,
    color: '#636466',
    alignItems: 'center',
    marginTop: 10,
    fontFamily: 'Quicksand-Regular',
    marginBottom: 10

  },

  TextSenha: {
    width: 230,
    height: 24,
    fontSize: 12,
    color: '#636466',
    //fontWeight: 'bold',
    alignItems: 'center',
    marginTop: 30,
    fontFamily: 'Quicksand-Regular',
    marginBottom: 10

  },

  Esqueci:{
    // paddingLeft:230,
    paddingTop:20
  },

  textEsque:{
    fontFamily: 'Quicksand-Regular',
    fontSize: 12,
    color: '#C20004',
    flexDirection:'row',
  },

  btnLogin: {
    width: 300,
    height:43,
    fontSize: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
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

  imgLogin: {
    width: 172,
    height: 157,
    // justifyContent: 'flex-start',
    // flexDirection:'row-reverse',
    alignItems:'flex-start',
    paddingRight:30

  },

  imgLoginView:{
    justifyContent:'flex-start',
    paddingTop:60 
  },

  

});