// React Imports
import { useState, useEffect } from "react";
import React from "react";
import { Text as SvgText, LinearGradient, Defs, Stop } from "react-native-svg";
import * as scale from "d3-scale";
import {
    Image, StyleSheet, Text, View, ScrollView, SafeAreaView,
    Dimensions, Alert, RefreshControl
} from "react-native";

import { BarChart, XAxis, ProgressCircle, Grid } from "react-native-svg-charts";

import moment from 'moment';
import 'moment/locale/pt-br'







export default function GraficoBarras(usuarioLogado) {

    const screenWidth = Dimensions.get("window").width;



    const [usuario, setUsuario] = useState([]);

    useEffect(() => {
        setUsuario(usuarioLogado.usuarioLogado);
    }, []);



    const data = [usuario.medSatisfacaoGeral, usuario.mediaAvaliacao, usuario.notaProdutividade]

    const CUT_OFF = 20
    const Labels = ({ x, y, bandwidth, data }) => (
        data.map((value, index) => (
            <SvgText
                key={index}
                x={x(index) + (bandwidth / 2)}
                y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
                fontSize={Dimensions.get('window').width * .02}
                fill={value >= CUT_OFF ? 'black' : 'black'}
                alignmentBaseline={'middle'}
                textAnchor={'middle'}
            >
                {(value * 100).toPrecision(2)}%
            </SvgText>
        ))
    )

    const GradientB = () => (
        <Defs key={'gradient'}>
            <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
                <Stop offset={'0%'} stopColor={"#240b19"} />
                <Stop offset={'100%'} stopColor={'#451531'} />
            </LinearGradient>
        </Defs>
    )

    return (
        <View style={styles.containerAreaGrafico} >
            <BarChart
                style={styles.areaGrafico}
                data={data}
                //svg={{ fill: 'url(#gradient)' }}
                svg={{ fill: 'rgba(69, 21, 49, 0.9)' }}
                contentInset={{ top: 20, bottom: 10 }}
                spacingInner={.2}
                gridMin={0}
            >

                <Grid direction={Grid.Direction.HORIZONTAL} />
                <GradientB />
                <Labels />
            </BarChart>

        </View>
    )


}

if (Dimensions.get('window').width > 700) {

    var styles = StyleSheet.create({

        containerAreaGrafico: {
            flexDirection: 'row', 
            height: Dimensions.get('window').width * .45, 
            paddingTop: 16, 
            paddingBottom: 20, 
            paddingHorizontal: '10%', 
            borderRadius: 5, 
            borderWidth: 1,
            paddingHorizontal: '15%',
            backgroundColor: "transparent",
        },
        areaGrafico: {
            flex: 1,
            height: '100%',
            // backgroundColor: 'lime'
        }

    })
}
else {
    var styles = StyleSheet.create({

        containerAreaGrafico: {
            flexDirection: 'row', 
            height: Dimensions.get('window').width * .5, 
            paddingTop: 16, 
            paddingBottom: 20, 
            paddingHorizontal: '10%', 
            borderRadius: 5, 
            borderWidth: 1,
            paddingHorizontal: '10%',
            backgroundColor: "transparent",
        },
        areaGrafico: {
            flex: 1,
            height: '100%',
            // backgroundColor: 'lime'
        }

    })
}