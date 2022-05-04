import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Animated,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Font from 'expo-font';
// import AppLoading from 'expo-app-loading';
import jwt_decode from "jwt-decode";
import apiGp1 from "../../services/apiGp1"

// let customFonts = {
//   'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'),
//   'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
//   'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf')
// }



class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
  };
  
  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
      duration: 200,
    }).start();
  }

  render() {
    const { label, ...props } = this.props;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [11, 0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 12],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', '#000'],
      }),
      // fontFamily: 'Quicksand-Regular',
      paddingLeft:40,
      paddingTop:3,
    };
    return (
      <View >
        <Animated.Text style={labelStyle}>
          {label}
        </Animated.Text>
        <TextInput 
          {...props}
          style={styles.inputLogin}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
        />
      </View>
    );
  }
}

export default class Login extends Component {
  constructor(props){
      super(props);
      this.state = {
          cpf: '0009886654',
          senha: 'v123',
          fontsLoaded: false,
          value: '',
          //erroMensagem: '',
          //isLoading:'',
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
      //this.state({erroMensagem:'', isLoading:true});
      console.warn(this.state.cpf + ' ' + this.state.senha);

      try {

          const resposta = await apiGp1.post('/Login', {
              cpf : this.state.cpf,
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

              // this.state({isLoading:false})

              var certo = jwt_decode(token).role
              //console.warn('certo ' + certo)
             
              this.props.navigation.navigate('Redirecionar');

          }

      } catch (error){
          console.warn(error)
          // this.state({
          //   erroMensagem: 'E-mail ou Senha invalidos',
          //   isLoading: false,
          // })
      }
  };
  


  render() {
    // if (!this.state.fontsLoaded) {
    //   return <AppLoading />;
    // }

    return (
      <View style={styles.body}>
        
            <View style={styles.mainHeader}>
                    <Image source={require('../../../assets/imgMobile/logo_2S.png')}
                        style={styles.imgLogo}
                    />
            </View>

          <View style={styles.container}>

            <Text style={styles.tituloPagina}>{'recursos humanos'.toUpperCase()}</Text>
              <View style={styles.inputs}>

            <FloatingLabelInput
              label="CPF"
              // value={this.state.value}
              style={styles.viewLoginCPF}
              keyboardType="numeric"
              onChangeText={this.handleTextChange}
              //onChangeText={cpf => this.setState({ cpf })}
            />

            <FloatingLabelInput 
              label="Senha"
              // value={this.state.value}
              onChangeText={this.handleTextChange}
              //onChangeText={senha => this.setState({ senha })}
            />
              </View>

              {/* <View style={styles.viewLoginCPF}>
                   <TextInput style={styles.inputLogin}
                placeholder="CPF"
                keyboardType="numeric"
                onChangeText={email => this.setState({ email })}
                //{label}
                //{...props}
                //onFocus={this.handleFocus}
                //onBlur={this.handleBlur}
              /> 
              </View> */}
            
              {/* <View style={styles.TextEmail}>   
                  <TextInput style={styles.inputLogin}
                  placeholder="Senha"
                  keyboardType="default"
                  //onChangeText={senha => this.setState({ senha })}
                  secureTextEntry={true}
                  value={this.state.value}
                  onChangeText={this.handleTextChange}
                />
              </View> */}
           
              
              <View style={styles.erroMsg}>

                <Text style={styles.erroText}> 
                  {/*({this.state= erroMensagem}) */}
                  Email ou senha inválidos!
                </Text>

                <TouchableOpacity>
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
            </View>

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
    // fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    color:'#2A2E32',
    width: 175,
    paddingTop:64,
    paddingBottom:50,
    alignItems:'center',
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
    width: 350,
    height: 46,
    borderWidth: 1,
    borderColor: '#B3B3B3',
    //alignItems: 'center',
    //justifyContent: 'center',
    borderRadius:10,
    //flexDirection:'column',
    //paddingTop:40,
    //  paddingBottom:24
    paddingLeft:15,
    marginBottom:8
  },
  
  viewLoginCPF:{
    // padding: 3345678,
     marginBottom:24,
  },

  erroMsg:{
    paddingTop:20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
  },
  
  erroText:{
    // fontFamily: 'Quicksand-Regular',
    fontSize: 12,
    color: '#C20004',
    paddingRight:100,
  },

  textEsque:{
    // fontFamily: 'Quicksand-Regular',
    fontSize: 12,
    color: '#C20004',
  },

  btnLogin: {
    width: 350,
    height:43,
    fontSize: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    elevation: 16,
    backgroundColor: '#C20004',
    borderRadius: 10,
  },

  btnText: {
    // fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: "#F2F2F2",
    alignItems: 'center',
    justifyContent: 'center',
  },

  
  imgLoginView:{
    //justifyContent:'flex-start',
    marginTop: 93,
   //width: 180,
    //height: 165,
    paddingLeft:40,
    alignItems:'flex-start',
    flexDirection:'column',
  },
  
  imgLogin: {
    // justifyContent: 'flex-start',
    //alignItems:'flex-start',
    //justifyContent: 'space-around',

  },

  // inputs:{
  //   flexDirection:'column',
  //   justifyContent:'space-between'
  // }
  

});