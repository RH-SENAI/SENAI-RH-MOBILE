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
          source={require("../../../assets/imgWeb/logo.png")}

          resizeMode="contain"
        />
        <Animatable.Text animation="flipInY" style={styles.tituloRH}>nomePojeto || logo</Animatable.Text>
        <Animatable.Image
          animation="flipInY"
          source={require("../../../assets/imgMobile/welcome.png")}
          style={{ width: '100%' }}
          resizeMode="contain"
        />
      </View>

      <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Acompanhe sua motivação e benefícios, tudo num só App!</Text>
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
  tituLogo: {
    width: '100%',
    marginBottom: '10%'
  },
  tituloRH: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: '3%',
    color: '#C20004',
    fontStyle:'italic'
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#C20004',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
    color: 'white',
    alignSelf: 'center'
  },
  text: {
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold'
  }
})
