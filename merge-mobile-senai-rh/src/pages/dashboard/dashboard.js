// React Imports
import { useState, useEffect } from "react";
import React from "react";
import { Text as SvgText, LinearGradient, Defs, Stop } from "react-native-svg";
import * as scale from "d3-scale";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Alert,
  RefreshControl
} from "react-native";


import {
  ContributionGraph, BarChart as BarGraph
} from "react-native-chart-kit";

// Expo
import AppLoading from "expo-app-loading";

// Pacotes
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import jwtDecode from "jwt-decode";

import { BarChart, XAxis, ProgressCircle, Grid } from "react-native-svg-charts";

import GrafHistSatisfacao from './GrafHistSatisfacao.js'
import GrafHistAvaliacao from './GrafHistAvaliacao.js'
import GraficoBarras from "./GraficoBarras.js";

//Services
import api from "../../services/apiGp3";
import apiGp1 from "../../services/apiGp1";

// Fonts
import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";

import {
  Quicksand_300Light,
  Quicksand_600SemiBold,
} from "@expo-google-fonts/quicksand";

import moment from 'moment';
import 'moment/locale/pt-br'





export default function Dashboard() {

  const screenWidth = Dimensions.get("window").width;

  //States
  const [idUsuario, setIdUsuario] = useState(1);
  const [nivelSatisfacao, setNivelSatisfacao] = useState(0);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [notaProdutividade, setNotaProdutividade] = useState(0);
  const [usuario, setUsuario] = useState([]);
  const [minhasAtividades, setMinhasAtividades] = useState([]);
  const [contibutionDates, setContibutionDates] = useState([]);
  const [historicos, setHistoricos] = useState([]);

  const [refreshing, setRefreshing] = React.useState(false);


  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setUsuario([]);
    setMinhasAtividades([]);
    setHistoricos([]);
    wait(2000).then(() => setRefreshing(false));
    BuscarUsuario();
    BuscarMinhasAtividades();
    BuscarHistorico();
  }, []);




  moment.locale('pt-br');
  const now = moment();

  // const dePara = [
  //   { date: "2022-04-02", count: 4 },
  //   { date: "2022-04-03", count: 2 },
  //   { date: "2022-04-04", count: 3 },
  //   { date: "2022-04-05", count: 4 },
  //   { date: "2022-04-06", count: 5 },
  //   { date: "2022-04-30", count: 2 },
  //   { date: "2022-04-31", count: 2 },
  //   { date: "2022-04-01", count: 2 },
  //   { date: "2022-05-05", count: 2 },
  //   { date: "2022-05-26", count: 4 },
  //   { date: "2022-05-25", count: 4 },
  // ];

  // const dePara = [

  //   { date: "2022-05-01T00:00:0.000Z", count: 1 },
  //   { date: "2022-05-20T00:00:0.000Z", count: 1 },
  //   { date: "2022-05-26T00:00:0.000Z", count: 1 },
  //   { date: "2022-05-28T00:00:0.000Z", count: 1 },
  //   { date: "2022-05-29T00:00:0.000Z", count: 1 },
  //   { date: "2022-05-30T00:00:0.000Z", count: 1 },
  //   { date: "2022-05-31T00:00:0.000Z", count: 1 },
  // ];;

  const dePara = [
    { date: "2022-04-30", count: 3 },
    { date: "2022-05-04", count: 3 },
    { date: "2022-05-05", count: 1 },
    { date: "2022-05-06", count: 2 },
    { date: "2022-05-07", count: 4 },
    { date: "2022-05-08", count: 1 },
    { date: "2022-05-09", count: 2 },
    { date: "2022-05-10", count: 3 },
    { date: "2022-05-20", count: 2 },
    { date: "2022-05-21", count: 5 },
    { date: "2022-05-22", count: 4 },
    { date: "2022-05-23", count: 1 },
    { date: "2022-05-24", count: 2 },
    { date: "2022-05-25", count: 2 },
    { date: "2022-05-26", count: 1 },
    { date: "2022-05-27", count: 3 },
    { date: "2022-05-28", count: 5 },
    { date: "2022-05-29", count: 3 },
    { date: "2022-05-30", count: 1 },
    ,
  ];


  // const dataMock = {
  //   labels: ["Satisfação", "Avaliação", "Produtividade"],
  //   datasets: [
  //     {
  //       data: [20, 45, 28],
  //       color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
  //       strokeWidth: 2 // optional
  //     }
  //   ],
  //   legend: ["Rainy Days"] // optional
  // };








  const chartConfig = {
    backgroundGradientFrom: "blue",
    backgroundGradientFromOpacity: .0,
    backgroundGradientTo: "cyan",
    backgroundGradientToOpacity: .0,
    gutterSize: 50,
    color: (opacity = 1) => `rgba(69, 21, 49, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false,
    //paddingRight: 20
  };



  // Fontes utilizada
  let [fontsLoaded] = useFonts({
    //Montserrat
    Montserrat_500Medium,
    Montserrat_600SemiBold,

    // Quicksand
    Quicksand_300Light,
    Quicksand_600SemiBold,
  });



  const showAlert = (data, qtde) =>
    Alert.alert(

      "Detalhes:",
      `${qtde} atividade(s) entregue(s) em: \n${moment(data).locale('pt-BR').format('LLLL')};`,
      [
        // {
        //   text: "OK",
        //   // onPress: () => Alert.alert("Cancel Pressed"),
        //   // style: "cancel",
        // },
      ],
      {
        cancelable: true,
        // onDismiss: () =>
        //   Alert.alert(
        //     "This alert was dismissed by tapping outside of the alert dialog."
        //   ),
      },
      {
        styles: {
          backgroundColor: 'transparent',
        }
      }
    );



  async function BuscarUsuario() {
    try {
      const token = await AsyncStorage.getItem("userToken");

      const resposta = await api.get(
        "Usuarios/Listar/" + jwtDecode(token).jti,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (resposta.status === 200) {
        setUsuario([resposta.data]);
      }
    } catch (error) {
      console.warn(error);
    }
  }

  async function BuscarMinhasAtividades() {
    try {
      const token = await AsyncStorage.getItem("userToken");

      const resposta = await apiGp1.get(
        "Atividades/MinhasAtividadeFinalizadas/" + jwtDecode(token).jti,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (resposta.status === 200) {
        //setMinhasAtividades(resposta.data);

        //var datasDeFinalizacao = minhasAtividades
        var datasDeFinalizacao = resposta.data
          //const datasDeFinalizacao = mock
          .filter(a => a.idSituacaoAtividade === 1)
          .map(p => { return { date: p.dataConclusao, count: 1 } });

        var datasFiltradas = [];

        for (var i = 0; i < datasDeFinalizacao.length; i++) {
          for (var j = i + 1; j < datasDeFinalizacao.length; j++) {
            if (datasDeFinalizacao[i].date === datasDeFinalizacao[j].date) {
              datasDeFinalizacao[i].count++;
              datasDeFinalizacao[j].date = null;
            }
            if (j === datasDeFinalizacao.length - 1 && datasDeFinalizacao[i].date !== null) {
              datasFiltradas.push(datasDeFinalizacao[i]);
            }
          }
          if (i === datasDeFinalizacao.length - 1 &&
            datasDeFinalizacao[datasDeFinalizacao.length - 1].date !== datasDeFinalizacao[datasDeFinalizacao.length]) {
            datasFiltradas.push(datasDeFinalizacao[i]);
          }
        }

        //console.log(datasFiltradas);
        setMinhasAtividades(datasFiltradas)
        //console.warn(dePara);
        //setContibutionDates(dePara)

      }
    } catch (error) {
      console.warn(error);
    }
  }


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
        setHistoricos(resposta.data);
        //console.log('Historico carregado com sucesso')
      }
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    BuscarUsuario()
    return (
      setUsuario([])
    )
  }, []);
  useEffect(() => {
    BuscarMinhasAtividades()
    return (
      setMinhasAtividades([])
    )
  }, []);
  useEffect(() => {
    BuscarHistorico()
    return (
      setHistoricos([])
    )
  }, []);






  const Cores = (nota) => {
    if (nota >= 0 && nota <= 0.33)
      return 'url(#gradienRed)';

    else if (nota > 0.33 && nota <= 0.66)
      //return "#162fba";
      return 'url(#gradienBlue)';

    else return 'url(#gradienGreen)'
  }


  const CustomGradient = () => (
    <Defs key="gradient">
      <LinearGradient id="gradienRed" x1="0" y="0%" x2="100%" y2={'0%'}>
        <Stop offset="0%" stopColor="#ff4500" />
        <Stop offset="100%" stopColor="crimson" />
      </LinearGradient>
      <LinearGradient id="gradienBlue" x1="0" y="0%" x2="100%" y2={'0%'}>
        <Stop offset="0%" stopColor="#1e90ff" />
        <Stop offset="100%" stopColor="blue" />
      </LinearGradient>
      <LinearGradient id="gradienGreen" x1="0" y="0%" x2="100%" y2={'0%'}>
        <Stop offset="0%" stopColor="limegreen" />
        <Stop offset="100%" stopColor="green" />
      </LinearGradient>
    </Defs>
  );




  const GraficoSatisfacao = () => {
    const u = usuario[0];
    return (
      <ProgressCircle
        style={styles.grafico}
        progress={u.medSatisfacaoGeral}
        progressColor={Cores(u.medSatisfacaoGeral)}
        backgroundColor={"rgba(0, 0, 0, 0.15)"}
        startAngle={0}
        cornerRadius={1}
        strokeWidth={3}
        endAngle={360}
      >
        <SvgText
          x={-8.5}
          y={1.5}
          fill={u.medSatisfacaoGeral > 0 ? 'black' : "red"}
          textAnchor={"middle"}
          alignmentBaseline={"middle"}
          fontSize={22}
          fontWeight={"bold"}
          //stroke={'white'}
          opacity={".8"}
        //strokeWidth={0.4}
        >
          {(u.medSatisfacaoGeral * 100).toPrecision(2)}%
        </SvgText>
        <CustomGradient />
      </ProgressCircle>
    );
  };

  const GraficoAvaliacao = () => {
    const u = usuario[0];
    return (
      <ProgressCircle
        style={styles.grafico}
        progress={u.mediaAvaliacao}
        progressColor={Cores(u.mediaAvaliacao)}
        backgroundColor={"rgba(0, 0, 0, 0.15)"}
        startAngle={0}
        cornerRadius={1}
        strokeWidth={3}
        endAngle={360}
      >
        <SvgText
          x={-8.5}
          y={1.5}
          fill={u.mediaAvaliacao > 0 ? 'black' : "red"}
          textAnchor={"middle"}
          alignmentBaseline={"middle"}
          fontSize={22}
          fontWeight={"bold"}
          //stroke={'white'}
          opacity={"0.8"}
        //strokeWidth={0.4}
        >
          {(u.mediaAvaliacao * 100).toPrecision(2)}%
        </SvgText>
        <CustomGradient />
      </ProgressCircle>
    );
  };

  const GraficoProdutividade = () => {
    const u = usuario[0];
    return (
      <ProgressCircle
        style={styles.grafico}
        progress={u.notaProdutividade}
        progressColor={Cores(u.notaProdutividade)}
        backgroundColor={"rgba(0, 0, 0, 0.15)"}
        startAngle={0}
        cornerRadius={1}
        strokeWidth={3}
        endAngle={360}
      >
        <SvgText
          x={-8.5}
          y={1.5}
          fill={u.notaProdutividade > 0 ? 'black' : "red"}
          textAnchor={"middle"}
          alignmentBaseline={"middle"}
          fontSize={22}
          fontWeight={"bold"}
          //stroke={'white'}
          opacity={"0.8"}
        //strokeWidth={0.4}
        >
          {(u.notaProdutividade * 100).toPrecision(2)}%
        </SvgText>
        <CustomGradient />
      </ProgressCircle>
    );
  };






  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (

      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../../assets/img-geral/logo_2S.png")}
            style={styles.imgLogo}
          />
        </View>
        <Text style={styles.tituloPage}>DASHBOARD</Text>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh} />
        }>
          {usuario.map((usuario) => {
            return (
              <View style={styles.containerAreaDados}>
                <View style={styles.containerDados}>
                  <View style={styles.containerLine} >
                    <Image
                      source={
                        usuario.caminhoFotoPerfil == undefined
                          ? {
                            uri:
                              "https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples/" +
                              usuario.caminhoFotoPerfil,
                          }
                          : require("../../../assets/img-gp3/Perfil.png")
                      }
                      resizeMod="cover"
                    />

                    <View style={styles.containerTextos}>
                      <Text style={styles.lineTextPerfil}>{usuario.nome}</Text>
                      <Text style={styles.lineTextPerfiLCargo}>
                        {usuario.idCargoNavigation.nomeCargo}
                      </Text>
                    </View>
                  </View>

                  {/* <View style={styles.containerPieChart}>
                    <View style={styles.containerLegendas}>
                      <Text style={styles.tituloGrafico}>
                        Nivel de Satisfação:
                      </Text>
                    </View>
                    <GraficoSatisfacao />
                  </View> */}

                  <View style={styles.containerProdutividade}>
                    <View style={styles.containerProdutividadeSup}>
                      <Text style={styles.tituloComparativo}>Comparativo entre seus indíces:</Text>

                    </View>
                    <GraficoBarras usuarioLogado={usuario} />
                    <View style={styles.containerLabels}>
                      <Text style={styles.nvsLabels}>Satisfação</Text>
                      <Text style={styles.nvsLabels}>Avaliação</Text>
                      <Text style={styles.nvsLabels}>Produtividade</Text>
                    </View>
                    {/* <BarGraph
                      style={styles.barGraphContainer}
                      //style={graphStyle}
                      data={dataMock}
                      width={screenWidth * .8}
                      height={220}
                      //yAxisLabel="$"
                      withHorizontalLabels={false}
                      withCustomBarColorFromData={false}
                      chartConfig={chartConfigB}
                      verticalLabelRotation={0}
                      fromZero={true}
                      showBarTops={true}
                      showValuesOnTopOfBars={true}
                      segments={5}
                    /> */}
                  </View>

                  <View style={styles.containerProdutividade}>
                    <View style={styles.containerProdutividadeSup}>
                      <Text style={styles.tituloGrafico}>Satisfação:</Text>
                      <GraficoSatisfacao />
                    </View>
                    <Text style={styles.legenda}>
                      Histórico:
                    </Text>
                    <GrafHistSatisfacao ghs={historicos} />

                    {/* <Text style={styles.subtituloProdutividade}>
                      Entregas de atividade por semana:{" "}
                    </Text> */}
                  </View>




                  <View style={styles.containerProdutividade}>
                    <View style={styles.containerProdutividadeSup}>
                      <Text style={styles.tituloGrafico}>Avaliação:</Text>
                      <GraficoAvaliacao />
                    </View>
                    <Text style={styles.legenda}>
                      Histórico:
                    </Text>
                    <GrafHistAvaliacao gha={historicos} />
                  </View>


                  <View style={styles.containerProdutividade}>
                    <View style={styles.containerProdutividadeSup}>
                      <Text style={styles.tituloGrafico}>Produtividade:</Text>
                      <GraficoProdutividade />
                    </View>
                    <Text style={styles.subtituloProdutividade}>
                      Acompanhe abaixo suas entregas de atividades nos últimos 60 dias:
                    </Text>
                    <ContributionGraph
                      style={styles.ContributionContainer}
                      values={minhasAtividades}
                      //endDate={new Date(moment(now))}
                      //endDate={moment(now)}
                      numDays={59}
                      //width={'90%'}
                      width={screenWidth}
                      height={260}
                      chartConfig={chartConfig}
                      showMonthLabels={true}
                      onDayPress={(d = minhasAtividades) => showAlert(d.date, d.count)}
                      gutterSize={3}
                      squareSize={25}
                      horizontal={true}
                      showOutOfRangeDays={true}

                    />
                  </View>

                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>

    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    width: "100%",
    //backgroundColor: 'orange'
  },
  imgLogo: {
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 24,
  },
  tituloPage: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 35,
    color: "#2A2E32",
    textAlign: "center",
    textTransform: "uppercase",
  },
  containerAreaDados: {
    //backgroundColor: 'yellow',
    flex: 1,
    width: "100%",
    paddingHorizontal: "5%",
  },
  containerDados: {
    //backgroundColor: 'lightgray',
    //height: 200,
    flex: 1,
    marginTop: 20,
    //alignItems: 'flex-start'
    borderRadius: 5,
    marginBottom: 10,
    //borderWidth: 3,
    //borderColor: 'lightgray'
  },
  containerLine: {
    width: "100%",
    //height: 110,
    borderRadius: 5,
    borderTopWidth: 25,
    borderWidth: 3,
    borderColor: "rgba(0, 0, 0, 0.8)",
    flexDirection: "row",
    backgroundColor: '#f1f1f1',
    padding: 10,
  },
  containerTextos: {
    marginLeft: 24,
    marginTop: 0,
    fontFamily: "Quicksand_300Light",
    //backgroundColor: 'blue'
  },
  lineTextPerfil: {
    fontFamily: "Quicksand_300Light",
    fontSize: 25,
    color: "#000",
  },
  lineTextPerfiLCargo: {
    fontFamily: "Quicksand_300Light",
    fontSize: 18,
    color: "#000",
  },
  containerPieChart: {
    //flex: 1,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "gray",
    flexDirection: "row",
    //backgroundColor: 'purple',
    justifyContent: "space-between",
    marginTop: 20,
    //paddingRight: '5%',
    alignItems: "center",
    padding: 10,
    height: 100,
  },
  containerProdutividade: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 3,
    borderTopWidth: 25,
    //borderWidth: 3,
    borderColor: "rgba(0, 0, 0, 0.8)",
    //flexDirection: 'row',
    backgroundColor: "rgba(241, 241, 241, 0.85)",
    justifyContent: 'center',
    marginTop: 20,
    //paddingRight: '5%',
    //alignItems: 'center',
    paddingBottom: 15,
    paddingHorizontal: 10,
    paddingTop: 10,
    //flexWrap: 'wrap',
    //height: 500,

  },
  subtituloProdutividade: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'right',
  },
  containerLegendas: {
    flex: 1,
    //backgroundColor: 'orange'
  },
  containerProdutividadeSup: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'flex-end',
    alignItems: 'center',
    //backgroundColor: 'green',
    padding: 3.5
  },
  grafico: {
    //flex: 1,
    width: 60,
    height: 60,
    //backgroundColor: 'blue',
    margin: -0,
    paddingRight: 2
  },
  tituloGrafico: {
    fontSize: 22,
    marginRight: 10,
    //marginLeft: 15,
    //backgroundColor: 'green'
  },
  graficoBarrasContainer: {
    flexDirection: "row",
    height: 200,
    paddingVertical: 16,
  },
  graficoBarras: {
    flex: 1,
    //backgroundColor: 'yellow'
  },
  ContributionContainer: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderRadius: 5,
    //paddingTop: 20,
    marginTop: 10,
    //marginBottom: 0,
    borderWidth: 1,
    borderColor: 'black',
    //paddingLeft: 30,

    paddingRight: 0
  },
  tituloComparativo: {
    textAlign: 'right',
    fontSize: 22,
    marginRight: 10,
    marginBottom: 10
  },
  containerLabels: {
    flex: 1,
    width: '100%',
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingHorizontal: '14%',
    //backgroundColor: 'blue'
  },
  nvsLabels: {
    alignSelf: 'center',
    fontSize: 12,
    marginTop: -40,
    color: 'black',
    textAlign: 'center',
    marginLeft: '4%'
    //backgroundColor: 'lime'
  },
  legenda: {
    fontSize: 16,
    marginTop: -10,
    textAlign: 'left',
    marginBottom: -5
  },
  // barGraphContainer: {
  //   //backgroundColor: "rgba(0, 0, 0, .8)",
  //   flex: 1,
  //   borderRadius: 10,
  //   //paddingTop: 20,
  //   marginTop: 10,
  //   //marginBottom: 0,
  //   borderWidth: 1,
  //   borderColor: 'black',
  //   //paddingLeft: 30,
  //   alignSelf: 'center',
  //   //paddingLeft: 20
  // }



});