import React, { useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';


const Perfil = () => {

  return (

    <View style={styles.container}>
      <Image style={styles.logoSenai} source={require("../../../assets/imgMobile/logo_2S.png")} resizeMode="contain" />

      <Text style={styles.titulo}>PERFIL</Text>

      <View style={styles.conteudo}>

        <View style={styles.fotoPerfilContainer}>
          <Image
            source={require("../../../assets/imgMobile/Perfil.png")}
            //style={styles.imgEntrando}
            resizeMode="contain"
          />
        </View>

        <View style={styles.boxPerfil} >
          <View style={styles.line}>
            <Text style={styles.titulos}>Email</Text>
            <Text>Email@email.com</Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.titulos}>Senha</Text>
            <Text>********</Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.titulos}>Cargo</Text>
            <Text>Nome Cargo</Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.titulos}>CPF</Text>
            <Text>***.*56.78*-**</Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.titulos}>Endereço</Text>
            <Text>Rua abcd, nº1234</Text>
          </View>

        </View>

        <View style={styles.sobreTrofeu}>
          <Image source={require('../../../assets/imgMobile/trofeu.png')} />
          <Text style={styles.textTrofeu}> 20 troféus</Text>
        </View>

      </View>

    </View>

  );


}



const styles = StyleSheet.create({


  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    // alignItems:'center'

  },
  fotoPerfilContainer: {
    width: 110,
    height: 110,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'gray',
    marginVertical: 20
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
    // backgroundColor: 'blue',
    alignSelf: 'center'
  },

  conteudo: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'yellow',
    // paddingTop: 20,

  },

  boxPerfil: {
    backgroundColor: "#F2F2F2",
    paddingHorizontal: '5%',
    width: '100%'

  },
  titulos: {
    color: '#0A0A0A',
    //fontFamily:'Montserrat-SemiBold',
    fontSize: 16,
    fontWeight: 'bold'
  },
  line: {
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: '3%',
    paddingVertical: 5,
    borderColor: '#C2C2C2',
    borderWidth: 3,
    marginBottom: 10
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
    marginLeft: 10,
    //fontFamily:'Montserrat-Regular',


  }



});

export default Perfil;

