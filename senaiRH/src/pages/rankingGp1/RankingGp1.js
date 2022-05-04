import react from "react";
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
    AnimatableBlurView,
    FlatList,
    Image,
    Alert,
    Pressable
} from 'react-native';

import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';


import {
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
} from '@expo-google-fonts/quicksand'

import {
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light_Italic,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black_Italic,
} from '@expo-google-fonts/montserrat';

export default function Ranking() {

    let [customFonts] = useFonts({
        Regular: Quicksand_400Regular,
        Light: Quicksand_300Light,
        SemiBold: Quicksand_600SemiBold,
        Bold: Quicksand_700Bold,
        Medium: Quicksand_500Medium,
        Montserrat_100Thin,
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        MediumM: Montserrat_500Medium,
        SemiBoldM: Montserrat_600SemiBold,
        Montserrat_700Bold,
        Montserrat_800ExtraBold,
        Montserrat_900Black,
        Montserrat_100Thin_Italic,
        Montserrat_200ExtraLight_Italic,
        Montserrat_300Light_Italic,
        Montserrat_400Regular_Italic,
        Montserrat_500Medium_Italic,
        Montserrat_600SemiBold_Italic,
        Montserrat_700Bold_Italic,
        Montserrat_800ExtraBold_Italic,
        Montserrat_900Black_Italic,
      });
    
      if (!customFonts) {
        return <AppLoading />;
      }


    return (
        <View style={styles.main}>

            <View>
                <View style={styles.mainHeader}>
                    <Image source={require('../../../assets/img-gp1/logoSenai2.png')}
                        style={styles.imgLogo}
                    />

                </View>

                <View style={styles.titulo}>

                    <Text style={styles.tituloEfects}>{'Ranking'.toUpperCase()} </Text>

                </View>

                <View style={styles.RankingGp1}>
                    <Text style={styles.numero}>1.</Text>
                    <Image source={require('../../../assets/img-gp1/bonecoRanking.png')}
                    style={styles.fotoRankingGp1}
                    />
                    <Text style={styles.nomeRankingGp1}>Manuel</Text>
                    <View style={styles.trofeuEnumero}>
                       <Image source={require('../../../assets/img-gp1/trofeu.png')}
                    style={styles.trofeuGp1}
                    />
                    <Text  style={styles.Ntrofeu} >20</Text> 
                    </View>
                    
                </View>

                <View style={styles.RankingGp1_2}>
                    <Text style={styles.numero}>2.</Text>
                    <Image source={require('../../../assets/img-gp1/bonecoRanking.png')}
                    style={styles.fotoRankingGp1}
                    />
                    <Text style={styles.nomeRankingGp1}>Manuel</Text>
                    <View style={styles.trofeuEnumero}>
                       <Image source={require('../../../assets/img-gp1/trofeu.png')}
                    style={styles.trofeuGp1}
                    />
                    <Text  style={styles.Ntrofeu} >20</Text> 
                    </View>
                    
                </View>

                <View style={styles.RankingGp1_3}>
                    <Text style={styles.numero}>3.</Text>
                    <Image source={require('../../../assets/img-gp1/bonecoRanking.png')}
                    style={styles.fotoRankingGp1}
                    />
                    <Text style={styles.nomeRankingGp1} >Manuel</Text>
                    <View style={styles.trofeuEnumero}>
                       <Image source={require('../../../assets/img-gp1/trofeu.png')}
                    style={styles.trofeuGp1}
                    />
                    <Text  style={styles.Ntrofeu} >20</Text> 
                    </View>
                    
                </View>

                <View style={styles.RankingGp1_suaposicao}>
                    <Text style={styles.numero}>15.</Text>
                    <Image source={require('../../../assets/img-gp1/bonecoRanking.png')}
                    style={styles.fotoRankingGp1}
                    />
                    <Text style={styles.nomeRankingGp1}>Manuel</Text>
                    <View style={styles.trofeuEnumero}>
                       <Image source={require('../../../assets/img-gp1/trofeu.png')}
                    style={styles.trofeuGp1}
                    />
                    <Text  style={styles.Ntrofeu} >20</Text> 
                    </View>
                    
                </View>



            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
    },

    mainHeader: {

        alignItems: 'center',
        paddingTop: 40,

    },

    titulo: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 64
    },

    tituloEfects: {
         fontFamily: 'SemiBoldM',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#2A2E32',
        fontSize: 30,
    },

    RankingGp1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        borderWidth: 1,
        borderColor: '#B3B3B3',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        marginBottom: 24,
        width: '78%',
        
    },
    
    numero:{
        fontFamily: 'SemiBold',
        marginLeft:29,
        
    },
    trofeuEnumero:{
        flexDirection: 'row',
    },
    
    Ntrofeu:{
        fontFamily: 'Light',
        marginLeft:10,
        marginTop:2
    },
    
    trofeuGp1:{
        marginRight:10
    },
    nomeRankingGp1:{
       fontFamily: 'Light',
    },

    RankingGp1_2:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        borderWidth: 1,
        borderColor: '#B3B3B3',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        marginBottom: 24,
        width: '78%',

    },
    RankingGp1_3:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        borderWidth: 1,
        borderColor: '#B3B3B3',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        marginBottom: 24,
        width: '78%',

    },

    RankingGp1_suaposicao:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        borderWidth: 3,
        borderColor: '#2A2E32',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        marginBottom: 24,
        width: '78%',

    },

});