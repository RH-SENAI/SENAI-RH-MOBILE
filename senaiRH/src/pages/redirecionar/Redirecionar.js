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

export default function Redirecionar() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../../assets/imgWeb/logo.png")}

        resizeMode="contain"
      />
      <View style={styles.titulos}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainAcompanhar')} >
          <Text style={styles.links}>Acompanhamento</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} >
          <Text style={styles.links}>Motivações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} >
          <Text style={styles.links}>Minhas Vantagens</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  logo: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 0,
  },
  titulos: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'cyan',
    paddingTop: 80,
    paddingBottom: 80,
    width: '100%',
    paddingLeft: '5%',
    paddingRight: '5%'

  },
  button: {
    flex: 3,
    justifyContent: 'center',
    backgroundColor: '#C20004',
    marginTop: 35,
    marginBottom: 35,
    width: '100%',
    borderRadius: 4,
    // marginLeft: '5%',
    // marginEnd: '5%'
  },
  links: {
    // backgroundColor: 'blue',
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  }

})
