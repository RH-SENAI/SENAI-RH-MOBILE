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

export default function Ranking() {

    let [customFonts] = useFonts({
        'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'),
        'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf'),
        'Quicksand-Light': require('../../../assets/fonts/Quicksand-Light.ttf'),
        'Quicksand-SemiBold': require('../../../assets/fonts/Quicksand-SemiBold.ttf')
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
         fontFamily: 'Montserrat-SemiBold',
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
        fontFamily: 'Quicksand-SemiBold',
        marginLeft:29,
        
    },
    trofeuEnumero:{
        flexDirection: 'row',
    },
    
    Ntrofeu:{
        fontFamily: 'Quicksand-Light',
        marginLeft:10,
        marginTop:2
    },
    
    trofeuGp1:{
        marginRight:10
    },
    nomeRankingGp1:{
       fontFamily: 'Quicksand-Light',
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