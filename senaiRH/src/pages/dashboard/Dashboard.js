// React Imports
import { useState, useEffect } from "react";
import react from "react";
import { Text as PieText } from "react-native-svg";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";

// Expo
import AppLoading from "expo-app-loading";

// Pacotes
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  VictoryLine,
  VictoryPie,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
} from "victory";
import jwtDecode from "jwt-decode";

import { PieChart } from "react-native-svg-charts";

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

export default function Dashboard() {
  //States
  const [idUsuario, setIdUsuario] = useState(1);
  const [nivelSatisfacao, setNivelSatisfacao] = useState(0);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [notaProdutividade, setNotaProdutividade] = useState(0);
  const [usuario, setUsuario] = useState([]);
  const [minhasAtividades, setMinhasAtividades] = useState([]);

  // Fontes utilizada
  let [fontsLoaded] = useFonts({
    //Montserrat
    Montserrat_500Medium,
    Montserrat_600SemiBold,

    // Quicksand
    Quicksand_300Light,
    Quicksand_600SemiBold,
  });

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
        //console.warn(resposta.data)
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
        setMinhasAtividades([resposta.data]);
        console.warn(resposta.data);
      }
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => BuscarUsuario(), []);
  useEffect(() => BuscarMinhasAtividades(), []);

  //PIECHART
  function GraficoSatisfacao() {
    const data = [50, 10, 40, 95];
    const pieData = data.map((value, index) => ({
      value,
      key: `${index} - ${value}`,
      svg: {
        fill: "#FF0000",
      },
    }));

    const Label = ({ slices }) => {
      return slices.map((slice, index) => {
        const { pieCentroid, data } = slice;
        return (
          <PieText
            key={`label-${index}`}
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill="black"
            textAnchor={"middle"}
            alignmentBaseline={"middle"}
            fontSize={12}
          >
            {data.value}
          </PieText>
        );
      });
    };

    return (
      <PieChart style={styles.PieChart} data={pieData}>
        <Label />
      </PieChart>
    );
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
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
                              usuario.idUsuarioNavigation.caminhoFotoPerfil,
                          }
                        : require("../../../assets/imgMobile/Perfil.png")
                    }
                    resizeMod="cover"
                  />

                  <View style={styles.containerTextos}>
                    <Text style={styles.lineTextPerfil}>{usuario.nome}</Text>
                    <Text style={styles.lineTextPerfil}>
                      {usuario.idCargoNavigation.nomeCargo}
                    </Text>
                  </View>
                </View>

                <View style={styles.containerPieChart}>
                  <GraficoSatisfacao />
                  <Text>Teste</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    // backgroundColor: "orange",
  },
  imgLogo: {
    width: 288,
    height: 40,
    marginTop: 40,
    marginBottom:40,
  },
  tituloPage: {
    fontSize: 32,
    width: "80%",
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
    textTransform: "uppercase",
    color: "#2A2E32",
    marginBottom:40,
  },
  containerAreaDados: {
    backgroundColor: "yellow",
    flex: 1,
    width: "100%",
    paddingHorizontal: "5%",
  },
  containerDados: {
    backgroundColor: "cyan",
    height: 200,
    //alignItems: 'flex-start'
  },
  containerLine: {
    width: "100%",
    //height: 110,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "gray",
    flexDirection: "row",
    backgroundColor: "green",
  },
  containerTextos: {
    marginLeft: 24,
    marginTop: 0,
    fontFamily: " Quicksand_300Light",
    backgroundColor: "blue",
  },
  lineTextPerfil: {
    fontFamily: " Quicksand_300Light",
    fontSize: 25,
    color: "#000",
  },
  containerPieChart: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "purple",
    justifyContent: "flex-start",
  },
  PieChart: {
    //flex: 1,
    width: 100,
    backgroundColor: "white",
  },
});
