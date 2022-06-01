import React, { useEffect, useRef, useState } from 'react';
// import * as React from 'react'
import {
  PanResponder,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
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

import api from "../../services/apiGp3";
import apiGp1 from "../../services/apiGp1";






export default function InteractiveChart(historicos) {


  const [listaHistoricos, setListaHistoricos] = useState([]);

  const teste = [.97, .75, .9, .85, .4, .6, .4, .4, .3, .45,
    .97, .75, .9, .85, .4, .6, .4, .73, .3, .45,
    .68, .45, .7, .52, .4, .35, .4, .1, .3, .45, .66]

  const [listaDatas, setListaDatas] = useState([
    //'20', '20', '21', '22', 
    // '01', '02', '03', '04','05','06', '07', '08', '09', '10',
    // '11', '12', '13', '14','15', '16', '17', '18', '19', '20',
    // '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
  ]);
  const [mediasSatisfacao, setMediasSatisfacao] = useState([
    //.78, .85, .66, .66, 
    // .97, .75, .9, .85, .4, .6, .4, .4, .3, .45,
    // .97, .75, .9, .85, .4, .6, .4, .73, .3, .45,
    // .68, .45, .7, .52, .4, .35, .4, .1, .3, .45, .66

  ]);

  


  //useEffect(() => setListaHistoricos(historicos.ghs), []);
  
    useEffect(() => {
      //setListaHistoricos(historicos.ghs)
      //console.warn(historicos.ghs[0])
  
      setListaDatas(historicos.ghs.map(p => p.atualizadoEm));
  
      // setListaDatas(resposta.data.map((p) => {
      //     return (p.atualizadoEm.split("-")[2]).substring(0, 2);
      // }
      // ));
  
      setMediasSatisfacao(
        historicos.ghs.map(
          (p) => { return (parseFloat(p.nivelSatisfacao) * 100); }
        )
      );
    }, []);
  
  //SetarHistorico();




  async function SetarHistorico() {

    //console.log(historicos.ghs)
    

    //console.warn(listaDatas)
    //console.warn('media satisfacao ' + mediasSatisfacao);
    //console.warn('lista datas ' + listaDatas);


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
            stroke="rgba(0, 0, 0, 0.8)"
          />
        ))
      }
      {
        // Vertical grid
        mediasSatisfacao.map((_, index) => (
          <Line
            key={index.toString()}
            y1="0%"
            y2="100%"
            x1={x(index)}
            x2={x(index)}
            stroke="rgba(0, 0, 0, 0.8)"
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
      stroke="#451531"
      strokeWidth={apx(3)}
      fill="none"
      //strokeDasharray={3}
    />
  );

  const CustomGradient = () => (
    // <Defs key="gradient">
    //   <LinearGradient id="gradient" x1="0" y="33%" x2="0%" y2="66%">
    //     {/* <Stop offset="20%" stopColor="black" />
    //     <Stop offset="100%" stopColor="#C20004" />

    //     <Stop offset="75%" stopColor="black" stopOpacity={0.75} />
    //     <Stop offset="25%" stopColor="#C20004" stopOpacity={.25} /> */}
    //     <Stop offset="33%" stopColor="lightgray" />
    //     <Stop offset="66%" stopColor="#f1f1f1" />
    //   </LinearGradient>
    // </Defs>
    <Defs key={'gradient'}>
      <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
        <Stop offset={'0%'} stopColor={'lightgray'} />
        <Stop offset={'100%'} stopColor={'#f1f1f1'} />
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
          y={y(mediasSatisfacao[positionX]) - apx(10)}>
          <Rect
            y={-apx(24 + 24 + 20) / 2}
            rx={apx(12)} // borderRadius
            ry={apx(12)} // borderRadius
            width={apx(200)}
            height={apx(96)}
            stroke="rgba(255, 0, 4, 0.27)"
            fill="rgba(255, 255, 255, 0.8)"
          />
          <SvgText
            x={apx(20)}
            y={apx(24 + 20)}
            fontSize={apx(24)}
            fontWeight="normal"
            fill="gray">

            {/* {date} */}
            em {moment(date).format('DD/MM/YYYY')}
          </SvgText>
          <SvgText x={apx(20)} fill="#C20004" opacity={0.65} fontSize={apx(24)} fontWeight={'bold'}>
            {mediasSatisfacao[positionX].toPrecision(2)}%
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
            cy={y(mediasSatisfacao[positionX])}
            r={apx(20 / 2)}
            stroke="black"
            strokeWidth={apx(2)}
            fill="#C20004"
          />
        </G>
      </G>
    );
  };

  const verticalContentInset = { top: apx(40), bottom: apx(40) };

  return (
    <View style={styles.containerAreaGrafico}>
      <View
        style={{
          flexDirection: 'row',
          width: apx(600),
          height: apx(250),
          alignSelf: 'stretch',
        }}>
        <View style={{ flex: 1, marginRight: -40, borderLeftWidth: 1, borderBottomWidth: 1, 
        borderColor: 'black', borderStyle: 'dashed'  }} 
        {...panResponder.current.panHandlers}>
          <AreaChart
            style={{ flex: 1 }}
            data={mediasSatisfacao}
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
          style={{ width: apx(190) }}
          data={mediasSatisfacao}
          contentInset={verticalContentInset}
          svg={{ fontSize: apx(20), fill: 'black' }}
          numberOfTicks={5}
        />
      </View>
      <XAxis
        style={{
          alignSelf: 'stretch',
          // marginTop: apx(57),
          width: apx(600),
          height: apx(60),
        }}
        numberOfTicks={3}
        data={mediasSatisfacao}
        //formatLabel={(value, index) => moment(listaDatas[value]).startOf('day').fromNow()}
        formatLabel={(value, index) => moment(listaDatas[value]).format('DD/MM')}
        contentInset={{
          left: apx(36),
          right: apx(180),
        }}
        svg={{
          fontSize: apx(20),
          fill: 'black',
          y: apx(20),
          // originY: 30,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerAreaGrafico: {
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    alignItems: 'stretch',
    borderRadius: 10,
    paddingLeft: 10,
    paddingTop: 20,
    marginTop: 10,
    borderWidth: 1,
    //borderColor: 'red'
  }
})