// React Imports
import React, { useState, useEffect } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView
} from "react-native";

// Pacotes
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Expo
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

// Fonts
import {
    Montserrat_500Medium,
    Montserrat_600SemiBold,
} from '@expo-google-fonts/montserrat';

import {
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_600SemiBold,
} from '@expo-google-fonts/quicksand';

// Services
import api from "../../services/apiGp3";
import jwtDecode from "jwt-decode";

export default function Perfil() {

    const [usuario, setUsuario] = useState([])



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
            // console.warn(error);
        }
    }

    useEffect(() => BuscarUsuario(), [])

    let [fontsLoaded] = useFonts({

        //Montserrat
        Montserrat_500Medium,
        Montserrat_600SemiBold,

        // Quicksand
        Quicksand_300Light,
        Quicksand_400Regular,
        Quicksand_600SemiBold,
    })

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.mainHeader} >
                <Image source={require('../../../assets/img-gp1/logoSenai2.png')} />

            </View>

            {usuario.map((usuario) => {
                return (
                    <ScrollView contentContainerStyle={styles.conteudo}>

                        <Text style={styles.titulo}>Perfil</Text>
                        <View style={styles.fotoPerfilContainer}>

                            <Image
                                source={usuario.caminhoFotoPerfil == undefined ? {
                                    uri:
                                        "https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples/" +
                                        item.idUsuarioNavigation.caminhoFotoPerfil,
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

                    </ScrollView>);
            })}

        </SafeAreaView>
    );
}




const styles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        alignItems: 'center',

    },

    mainHeader: {
        alignItems: 'center',
        paddingTop: 40,
    },

    conteudo: {
        alignItems: 'center',
        paddingTop: 40,
    },

    titulo: {
        fontSize: 32,
        width: '80%',
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: 'Montserrat_600SemiBold',
        textTransform: 'uppercase',
        color: '#2A2E32',
        paddingBottom: 20,
    },

    fotoPerfilContainer: {
        width: 111,
        height: 110,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: 'gray',
        marginVertical: 20,

    },

    textInfGeralPerfil: {
        fontFamily: 'Quicksand_400Regular',
        fontSize: 20,
        color: 'black',
        paddingRight: 203,
        marginBottom: 20,
    },
    
    boxPerfil: {
        height: '100%',
        backgroundColor: "#F2F2F2",
        width: '100%'

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

    lineTextPerfil: {
        fontFamily: 'Quicksand_400Regular',
        fontSize: 20,
        color: '#B3B3B3'
    },

});