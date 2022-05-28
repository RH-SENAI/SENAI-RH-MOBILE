import React, { useEffect, useRef, useState } from 'react';
// import * as React from 'react'
import {
  PanResponder,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AreaChart, XAxis, YAxis } from 'react-native-svg-charts';
import {
  Circle,
  Defs,
  G,
  Line,
  LinearGradient,
  Path,
  Rect,
  Stop,
  Text as SvgText,
} from 'react-native-svg';
import * as shape from 'd3-shape';
import moment from 'moment';
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

import api from "../../services/api";






export default function InteractiveChart() {


    const [listaDatas, setListaDatas] = useState([
        //'20', '20', '21', '22', 
        // '01', '02', '03', '04','05','06', '07', '08', '09', '10',
        // '11', '12', '13', '14','15', '16', '17', '18', '19', '20',
        // '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
    ]);
    const [mediasAvaliacao, setMediasAvaliacao] = useState([
        //.78, .85, .66, .66, 
        // .97, .75, .9, .85, .4, .6, .4, .4, .3, .45,
        // .97, .75, .9, .85, .4, .6, .4, .73, .3, .45,
        // .68, .45, .7, .52, .4, .35, .4, .1, .3, .45, .66

    ]);


    useEffect(() => BuscarHistorico(), []);




    async function BuscarHistorico() {
        try {
            const token = await AsyncStorage.getItem("userToken");

            const resposta = await api.get(
                "HistoricoA/Listar/" + jwtDecode(token).jti,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );

            if (resposta.status === 200) {
                setListaDatas(resposta.data.map(p => p.atualizadoEm));
                // setListaDatas(resposta.data.map((p) => {
                //     return (p.atualizadoEm.split("-")[2]).substring(0, 2);
                // }
                // ));
                setMediasAvaliacao(resposta.data.map((p) => {
                    return (parseFloat(p.mediaAvaliacao) * 100);
                }
                ));
                //console.warn(listaDatas.length)
                //console.warn('media satisfacao ' + mediasAvaliacao);
                //console.warn('lista datas ' + listaDatas);
            }
        } catch (error) {
            console.warn(error);
        }
    }







    const apx = (size = 0) => {
        let width = Dimensions.get('window').width;
        return (width / 660) * size;
    };




    const size = useRef(listaDatas.length);
    size.current = listaDatas.length;

    //console.warn(listaDatas.length)

    const [positionX, setPositionX] = useState(-1);// The currently selected X coordinate position





    const panResponder = useRef(
        PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderTerminationRequest: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                updatePosition(evt.nativeEvent.locationX);
                return true;
            },
            onPanResponderMove: (evt, gestureState) => {
                updatePosition(evt.nativeEvent.locationX);
                return true;
            },
            onPanResponderRelease: () => {
                setPositionX(-1);
            },
        })
    );

    const updatePosition = (x) => {
        const YAxisWidth = apx(130);
        const x0 = apx(0);// x0 position
        const chartWidth = apx(600) - YAxisWidth - x0;
        const xN = x0 + chartWidth;//xN position
        const xDistance = chartWidth / size.current;// The width of each coordinate point
        if (x <= x0) {
            x = x0;
        }
        if (x >= xN) {
            x = xN;
        }

        // console.log((x - x0) )

        // The selected coordinate x :
        // (x - x0)/ xDistance = value
        let value = ((x - x0) / xDistance).toFixed(0);
        if (value >= size.current - 1) {
            value = size.current - 1; // Out of chart range, automatic correction
        }

        setPositionX(Number(value));
    };

    const CustomGrid = ({ x, y, ticks }) => (
        <G>
            {
                // Horizontal grid
                ticks.map((tick) => (
                    <Line
                        key={tick}
                        x1="0%"
                        x2="100%"
                        y1={y(tick)}
                        y2={y(tick)}
                        stroke="#EEF3F6"
                    />
                ))
            }
            {
                // Vertical grid
                mediasAvaliacao.map((_, index) => (
                    <Line
                        key={index.toString()}
                        y1="0%"
                        y2="100%"
                        x1={x(index)}
                        x2={x(index)}
                        stroke="#EEF3F6"
                    />
                ))
            }
        </G>
    );

    //LINHA DO GRAFICO
    const CustomLine = ({ line }) => (
        <Path
          key="line"
          d={line}
          stroke="#C20004"
          strokeWidth={apx(6)}
          fill="none"
        />
      );

      const CustomGradient = () => (
        <Defs key="gradient">
          <LinearGradient id="gradient" x1="0" y="0%" x2="0%" y2="100%">
            {/* <Stop offset="0%" stopColor="rgb(134, 65, 244)" /> */}
            {/* <Stop offset="100%" stopColor="rgb(66, 194, 244)" /> */}
    
            <Stop offset="75%" stopColor="black" stopOpacity={0.75} />
            <Stop offset="25%" stopColor="white" stopOpacity={.55} />
          </LinearGradient>
        </Defs>
      );

      const Tooltip = ({ x, y, ticks }) => {
        if (positionX < 0) {
          return null;
        }
    
        const date = listaDatas[positionX];
    
        return (
          <G x={x(positionX)} key="tooltip">
            <G
              x={positionX > size.current / 2 ? -apx(200 + 10) : apx(10)}
              y={y(mediasAvaliacao[positionX]) - apx(10)}>
              <Rect
                y={-apx(24 + 24 + 20) / 2}
                rx={apx(12)} // borderRadius
                ry={apx(12)} // borderRadius
                width={apx(200)}
                height={apx(96)}
                stroke="rgba(255, 0, 4, 0.27)"
                fill="rgba(255, 255, 255, 0.8)"
              />
    
              <SvgText x={apx(20)} fill="#617485" opacity={0.65} fontSize={apx(24)}>
                {/* {date} */}
                {moment(date).format('L')}
              </SvgText>
              <SvgText
                x={apx(20)}
                y={apx(24 + 20)}
                fontSize={apx(24)}
                fontWeight="bold"
                fill="#C20004">
                {mediasAvaliacao[positionX].toPrecision(2)}%
              </SvgText>
            </G>
    
            <G x={x}>
              <Line
                y1={ticks[0]}
                y2={ticks[Number(ticks.length)]}
                stroke="black"
                strokeWidth={apx(4)}
                strokeDasharray={[4, 3]}
                
              />
    
              <Circle
                cy={y(mediasAvaliacao[positionX])}
                r={apx(20 / 2)}
                stroke="black"
                strokeWidth={apx(2)}
                fill="lime"
              />
            </G>
          </G>
        );
      };

      const verticalContentInset = { top: apx(40), bottom: apx(40) };

      return (
        <View
          style={{
            backgroundColor: 'transparent',
            alignItems: 'stretch',
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: apx(600),
              height: apx(250),
              alignSelf: 'stretch',
            }}>
            <View style={{ flex: 1 }} {...panResponder.current.panHandlers}>
              <AreaChart
                style={{ flex: 1 }}
                data={mediasAvaliacao}
                // curve={shape.curveNatural}
                curve={shape.curveMonotoneX}
                contentInset={{ ...verticalContentInset }}
                svg={{ fill: 'url(#gradient)' }}
                XAxis={true}>
                <CustomLine />
                {/* <CustomGrid /> */}
                <CustomGradient />
                <Tooltip />
              </AreaChart>
            </View>
    
            <YAxis
              style={{ width: apx(130) }}
              data={mediasAvaliacao}
              contentInset={verticalContentInset}
              svg={{ fontSize: apx(20), fill: '#617485' }}
              numberOfTicks={4}
            />
          </View>
          <XAxis
            style={{
              alignSelf: 'stretch',
              // marginTop: apx(57),
              width: apx(600),
              height: apx(60),
            }}
            numberOfTicks={4}
            data={mediasAvaliacao}
            formatLabel={(value, index) => moment(listaDatas[value]).startOf('day').fromNow()}
            contentInset={{
              left: apx(36),
              right: apx(130),
            }}
            svg={{
              fontSize: apx(20),
              fill: '#617485',
              y: apx(20),
              // originY: 30,
            }}
          />
        </View>
      );
    }