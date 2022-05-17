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
import jwt_decode from "jwt-decode";
import api from '../../services/apiGp1';
import { render } from 'react-dom';

export default class AlterarSenha extends Component {




    render() {
        return (
            <View style={styles.body}>

                <View style={styles.mainHeader}>
                    <Image source={require('../../../assets/img-gp1/logoSenai2.png')}
                        style={styles.imgLogo}
                    />
                </View>

                <View style={styles.container}>

                    <Text style={styles.tituloPagina}>{'alterar senha'.toUpperCase()}</Text>
                    <Text style={styles.textoPagina}> Insira o email da conta que será recuperada, e depois, insira o codigo que foi enviado por email!</Text>

                    <View style={styles.text1}>
                        <TextInput style={styles.inputs}
                            placeholder="Email"
                            keyboardType="default"
                            placeholderTextColor="#B3B3B3"
                        />
                        <TouchableOpacity
                            style={styles.btnEmail}
                        //onPress={this.realizarLogin}
                        >
                            <Text style={styles.btnText}> Enviar Email</Text>
                        </TouchableOpacity>
                    </View>

                    <View >
                        <TextInput style={styles.inputs}
                            placeholder="Código"
                            keyboardType="numeric"
                            secureTextEntry={true}
                            placeholderTextColor="#B3B3B3"
                        />

                        <TouchableOpacity
                            style={styles.btnCodigo}
                        //onPress={this.realizarLogin}
                        >
                            <Text style={styles.btnText}> Enviar Código</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }
}

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

    textoPagina:{

    },

    text1: {

    },

    inputs: {
        width: 350,
        height: 48,
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

    btnEmail: {
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

    btnCodigo:{
        width: 350,
        height: 46,
        fontSize: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
        elevation: 16,
        backgroundColor: '#2A2E32',
        borderRadius: 10,
    },

    btnText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        color: "#F2F2F2",
        alignItems: 'center',
        justifyContent: 'center',
    },

});