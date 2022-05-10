import React from 'react';
import * as Animatable from 'react-native-animatable'
import {
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

import { useNavigation } from '@react-navigation/native'

export default function Welcome() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Image
          style={styles.tituLogo}
          animation="fadeInDown"
          source={require("../../../assets/imgMobile/logo_2S.png")}

          resizeMode="contain"
        />
        <Animatable.Text animation="flipInY" style={styles.tituloRH}>RECURSOS HUMANOS</Animatable.Text>
        <Animatable.Image
          animation="flipInY"
          source={require("../../../assets/imgMobile/welcome2.png")}
          style={styles.imagem}
          resizeMode="contain"
        />
      </View>

      <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Pensando sempre no conforto de nossos funcionários!</Text>
        <Text style={styles.text}>Faça seu login para começar</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </Animatable.View>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  containerLogo: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',

  },
  containerForm: {
    flex: 1,
    backgroundColor: '#C20004',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  tituLogo: {
    width: '100%',
    marginBottom: '10%',
    height:35
  },
  tituloRH: {
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2A2E32',

  },
  containerForm: {
    flex: 1,
    backgroundColor: '#636466',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingStart: '5%',
    paddingEnd: '5%',
 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
    color: 'white',
    alignSelf: 'center',
    textAlign:"center"
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20
  },
  button: {
    position: 'absolute',
    backgroundColor: '#C20004',
    borderRadius: 10,
    paddingVertical: 8,
    width: '70%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:20,
    height:40
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },

  imagem:{
  height:200
  }
})