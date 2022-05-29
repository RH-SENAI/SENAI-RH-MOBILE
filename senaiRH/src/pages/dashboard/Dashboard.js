// React Imports
import { useState, useEffect } from "react";
import React from "react";
import { Text as SvgText, LinearGradient } from "react-native-svg";
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
const screenWidth = Dimensions.get("window").width;

import {
  ContributionGraph,
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

//Services
import api from "../../services/api";
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


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}



export default function Dashboard() {
  //States
  const [idUsuario, setIdUsuario] = useState(1);
  const [nivelSatisfacao, setNivelSatisfacao] = useState(0);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [notaProdutividade, setNotaProdutividade] = useState(0);
  const [usuario, setUsuario] = useState([]);
  const [minhasAtividades, setMinhasAtividades] = useState([]);
  const [contibutionDates, setContibutionDates] = useState([]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    BuscarUsuario();
    BuscarMinhasAtividades();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  moment.locale('pt-br');
  const now = moment();

  // const commitsData = [
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

  // const mock = [
  //   { date: "2022-04-02", count: 1 },
  //   { date: "2022-04-02", count: 1 },
  //   { date: "2022-04-02", count: 1 },
  //   { date: "2022-04-05", count: 1 },
  //   { date: "2022-04-06", count: 1 },
  //   { date: "2022-04-30", count: 1 },
  //   { date: "2022-04-31", count: 1 },
  //   { date: "2022-04-01", count: 1 },
  //   { date: "2022-05-05", count: 1 },
  //   { date: "2022-05-05", count: 1 },
  //   { date: "2022-05-25", count: 1 },
  // ];

  const dePara = [
    { date: "2022-04-21", count: 4 },
    { date: "2022-05-22", count: 2 },
    { date: "2022-05-23", count: 1 },
    { date: "2022-05-24", count: 3 },
    { date: "2022-05-25", count: 5 },
    { date: "2022-05-26", count: 3 },
    { date: "2022-05-27", count: 1 },
    { date: "2022-05-28", count: 5 },
  ];





  const chartConfig = {
    backgroundGradientFrom: "black",
    backgroundGradientFromOpacity: .8,
    backgroundGradientTo: "black",
    backgroundGradientToOpacity: .8,
    gutterSize: 30,
    color: (opacity = 1) => `rgba(255, 0, 4, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false // optional
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

      "",
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
        "Atividades/MinhasAtividade/" + jwtDecode(token).jti,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (resposta.status === 200) {
        setMinhasAtividades(resposta.data);

        const datasDeFinalizacao = minhasAtividades
          //const datasDeFinalizacao = mock
          .filter(a => a.idSituacaoAtividade === 1)
          .map(p => { return { date: p.dataConclusao, count: 1 } });

        const datasFiltradas = [];

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


        // console.warn(datasFiltradas);
        // setContibutionDates(datasFiltradas)
        //console.warn(dePara);
        setContibutionDates(dePara)

      }
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => BuscarUsuario(), []);
  useEffect(() => BuscarMinhasAtividades(), []);

  const GraficoSatisfacao = () => {
    const u = usuario[0];
    return (
      <ProgressCircle
        style={styles.grafico}
        progress={u.medSatisfacaoGeral}
        progressColor={"#C20004"}
        backgroundColor={"rgba(194, 0, 4, 0.15)"}
        startAngle={0}
        cornerRadius={2}
        strokeWidth={10}
        endAngle={360}
      >
        <SvgText
          x={-7.5}
          y={1.5}
          fill={"black"}
          textAnchor={"middle"}
          alignmentBaseline={"middle"}
          fontSize={16}
          fontWeight={"normal"}
          //stroke={'white'}
          opacity={"1"}
          strokeWidth={0.4}
        >
          {(u.medSatisfacaoGeral * 100).toPrecision(2)}%
        </SvgText>
      </ProgressCircle>
    );
  };

  const GraficoAvaliacao = () => {
    const u = usuario[0];
    return (
      <ProgressCircle
        style={styles.grafico}
        progress={u.mediaAvaliacao}
        progressColor={"#C20004"}
        backgroundColor={"rgba(194, 0, 4, 0.15)"}
        startAngle={0}
        cornerRadius={5}
        strokeWidth={15}
        endAngle={360}
      >
        <SvgText
          x={-7.5}
          y={1.5}
          fill={"black"}
          textAnchor={"middle"}
          alignmentBaseline={"middle"}
          fontSize={16}
          fontWeight={"normal"}
          //stroke={'white'}
          opacity={"1"}
          strokeWidth={0.4}
        >
          {u.mediaAvaliacao * 100}%
        </SvgText>
      </ProgressCircle>
    );
  };

  const GraficoProdutividade = () => {
    const u = usuario[0];
    return (
      <ProgressCircle
        style={styles.grafico}
        progress={u.notaProdutividade}
        progressColor={"#C20004"}
        backgroundColor={"rgba(194, 0, 4, 0.15)"}
        startAngle={0}
        cornerRadius={5}
        strokeWidth={15}
        endAngle={360}
      >
        <SvgText
          x={-7.5}
          y={1.5}
          fill={"black"}
          textAnchor={"middle"}
          alignmentBaseline={"middle"}
          fontSize={16}
          fontWeight={"normal"}
          //stroke={'white'}
          opacity={"1"}
          strokeWidth={0.4}
        >
          {u.notaProdutividade}%
        </SvgText>
      </ProgressCircle>
    );
  };





  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={require("../../../assets/imgMobile/logo_2S.png")}
              style={styles.imgLogo}
            />
          </View>
          <Text style={styles.tituloPage}>DASHBOARD</Text>

          {usuario.map((usuario) => {
            return (
              <View style={styles.containerAreaDados}>
                <View style={styles.containerDados}>
                  <View style={styles.containerLine}>
                    <Image
                      source={
                        usuario.caminhoFotoPerfil == undefined
                          ? {
                            uri:
                              "https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples/" +
                              usuario.caminhoFotoPerfil,
                          }
                          : require("../../../assets/imgMobile/Perfil.png")
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
                      <Text style={styles.tituloGrafico}>Nível de Satisfação atual:</Text>
                      <GraficoSatisfacao />
                    </View>
                    <GrafHistSatisfacao />

                    {/* <Text style={styles.subtituloProdutividade}>
                      Entregas de atividade por semana:{" "}
                    </Text> */}
                  </View>


                  <View style={styles.containerProdutividade}>
                    <View style={styles.containerProdutividadeSup}>
                      <Text style={styles.tituloGrafico}>Produtividade:</Text>
                      <GraficoProdutividade />
                    </View>
                    <ContributionGraph
                      style={styles.ContributionContainer}
                      values={contibutionDates}
                      //endDate={new Date("2022-05-31")}
                      //endDate={moment(now)}
                      numDays={90}
                      width={'100%'}
                      height={220}
                      chartConfig={chartConfig}
                      showMonthLabels={true}
                      onDayPress={(d = contibutionDates) => showAlert(d.date, d.count)}
                    />
                    {/* <GraficoBarras /> */}
                    <Text style={styles.subtituloProdutividade}>
                      Entregas de atividades nos últimos 90 dias.
                    </Text>
                  </View>



                  <View style={styles.containerProdutividade}>
                    <View style={styles.containerProdutividadeSup}>
                      <Text style={styles.tituloGrafico}>Média de Avaliação:</Text>
                      <GraficoAvaliacao />
                    </View>
                    <GrafHistAvaliacao />
                  </View>

                  {/* <LineChartExample /> */}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
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
    fontSize: 32,
    width: "80%",
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
    textTransform: "uppercase",
    color: "#2A2E32",
  },
  containerAreaDados: {
    //backgroundColor: 'yellow',
    flex: 1,
    width: "100%",
    paddingHorizontal: "5%",
  },
  containerDados: {
    //backgroundColor: 'cyan',
    //height: 200,
    flex: 1,
    marginTop: 20,
    //alignItems: 'flex-start'
  },
  containerLine: {
    width: "100%",
    //height: 110,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "gray",
    flexDirection: "row",
    //backgroundColor: 'green',
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
    //borderTopWidth: 3,
    borderWidth: 3,
    borderColor: "gray",
    //flexDirection: 'row',
    backgroundColor: "rgba(241, 241, 241, 0.85)",
    justifyContent: 'center',
    marginTop: 20,
    //paddingRight: '5%',
    //alignItems: 'center',
    padding: 10,
    //flexWrap: 'wrap',
    //height: 500,

  },
  subtituloProdutividade: {
    fontSize: 16,
    marginTop: 0,
    textAlign: 'left',
  },
  containerLegendas: {
    flex: 1,
    //backgroundColor: 'orange'
  },
  containerProdutividadeSup: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    //backgroundColor: 'green',
    padding: 3.5
  },
  grafico: {
    //flex: 1,
    width: 70,
    height: 70,
    //backgroundColor: 'blue',
  },
  tituloGrafico: {
    fontSize: 20,
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
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'red',
  }



});
