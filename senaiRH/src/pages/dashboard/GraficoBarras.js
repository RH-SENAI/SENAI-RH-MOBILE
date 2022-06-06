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



    const data = [usuario.medSatisfacaoGeral, usuario.notaProdutividade, usuario.mediaAvaliacao]

    const CUT_OFF = 20
    const Labels = ({ x, y, bandwidth, data }) => (
        data.map((value, index) => (
            <SvgText
                key={index}
                x={x(index) + (bandwidth / 2)}
                y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
                fontSize={14}
                fill={value >= CUT_OFF ? '#f1f1f1' : '#f1f1f1'}
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
                <Stop offset={'0%'} stopColor={'#C20004'} />
                <Stop offset={'100%'} stopColor={'red'} />
            </LinearGradient>
        </Defs>
    )

    return (
        <View style={{
            flexDirection: 'row', height: 200, paddingTop: 16, backgroundColor: "rgba(0, 0, 0, 0.8)",
            paddingHorizontal: 10, borderRadius: 10 }}>
            <BarChart
                style={{ flex: 1 }}
                data={data}
                svg={{ fill: 'url(#gradient)' }}
                contentInset={{ top: 20, bottom: 10 }}
                spacing={0.2}
                gridMin={0}
            >

                <Grid direction={Grid.Direction.HORIZONTAL} />
                <GradientB />
                <Labels />
            </BarChart>
            
        </View>
    )


}

  // function GraficoBarras() {

  //   const u = usuario[0];

  //   const data = [
  //     // {
  //     //     value: 50,
  //     // },
  //     // {
  //     //     value: 10,
  //     //     svg: {
  //     //         fill: 'rgba(134, 65, 244, 0.5)',
  //     //     },
  //     // },
  //     // {
  //     //     value: 40,
  //     //     svg: {
  //     //         stroke: 'purple',
  //     //         strokeWidth: 2,
  //     //         fill: 'white',
  //     //         strokeDasharray: [ 4, 2 ],
  //     //     },
  //     // },
  //     {
  //       value: u.medSatisfacaoGeral,
  //       svg: {
  //         fill: 'url(#gradient)',
  //       },
  //     },
  //     {
  //       value: u.notaProdutividade,
  //       svg: {
  //         fill: 'url(#gradient)',
  //       },
  //     },
  //     {
  //       value: u.mediaAvaliacao,
  //       svg: {
  //         fill: 'url(#gradient)',
  //       },
  //     },
  //     // {
  //     //     value: 85,
  //     //     svg: {
  //     //         fill: 'green',
  //     //     },
  //     // },
  //   ]


  //   const GradientB = () => (
  //     <Defs key={'gradient'}>
  //       <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
  //         <Stop offset={'0%'} stopColor={'#C20004'} />
  //         <Stop offset={'100%'} stopColor={'red'} />
  //       </LinearGradient>
  //     </Defs>
  //   )

  //   return (
  //     <BarChart
  //       style={{ height: 200 }}
  //       data={data}
  //       gridMin={0}
  //       svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
  //       yAccessor={({ item }) => item.value}
  //       contentInset={{ top: 20, bottom: 20 }}
  //       lab
  //     >
  //       <Grid />
  //       <GradientB />
  //     </BarChart>
  //   )


  // }