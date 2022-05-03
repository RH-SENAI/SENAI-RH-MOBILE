import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';


export default function Democratizacao() {

    return (
        <View style={styles.container}>
            {/* <View style={styles.containerLogo}>

                <Text>Teste</Text>

            </View> */}

            <View style={styles.containerForm}>
                <Text >Acompanhe sua motivação e benefícios, tudo num só App!
                </Text>
            </View>

        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flexDirection: 'column-reverse',
        flex: 1,
        backgroundColor: 'transparent'
    },
    // containerLogo: {
    //     flex: 2,
    //     backgroundColor: 'transparent',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    containerForm: {
        flex: .3,
        backgroundColor: '#C20004',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
});