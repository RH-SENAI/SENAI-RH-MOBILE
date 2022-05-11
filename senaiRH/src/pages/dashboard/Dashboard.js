// React Imports
import { useState, useEffect } from "react";
import react from "react";
import { Text as SvgText } from 'react-native-svg';
import {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView
} from "react-native";

// Expo
import AppLoading from 'expo-app-loading';

// Pacotes
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    VictoryLine, VictoryPie, VictoryChart, VictoryAxis,
    VictoryTheme
} from 'victory';
import jwtDecode from "jwt-decode";

import { LineChart, Grid, ProgressCircle } from 'react-native-svg-charts'


//Services
import api from "../../services/api";
import apiGp1 from '../../services/apiGp1'

// Fonts
import {
    useFonts,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
} from '@expo-google-fonts/montserrat';

import {
    Quicksand_300Light,
    Quicksand_600SemiBold,
} from '@expo-google-fonts/quicksand';



export default function Dashboard() {
    //States
    const [idUsuario, setIdUsuario] = useState(1);
    const [nivelSatisfacao, setNivelSatisfacao] = useState(0);
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [notaProdutividade, setNotaProdutividade] = useState(0);
    const [usuario, setUsuario] = useState([])
    const [minhasAtividades, setMinhasAtividades] = useState([])

    // Fontes utilizada
    let [fontsLoaded] = useFonts({

        //Montserrat
        Montserrat_500Medium,
        Montserrat_600SemiBold,

        // Quicksand
        Quicksand_300Light,
        Quicksand_600SemiBold,
    })

    async function BuscarUsuario() {
        try {
            const token = await AsyncStorage.getItem('userToken');

            const resposta = await api.get('Usuarios/Listar/' + jwtDecode(token).jti, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            if (resposta.status === 200) {
                setUsuario([resposta.data]);
                //console.warn(resposta.data)
            }

        } catch (error) {
            console.warn(error)
        }
    }


    async function BuscarMinhasAtividades() {
        try {
            const token = await AsyncStorage.getItem('userToken');

            const resposta = await apiGp1.get('Atividades/MinhasAtividade/' + jwtDecode(token).jti, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });

            if (resposta.status === 200) {
                setMinhasAtividades([resposta.data]);
                console.warn(resposta.data)
            }

        } catch (error) {
            console.warn(error)
        }
    }


    useEffect(() => BuscarUsuario(), [])
    useEffect(() => BuscarMinhasAtividades(), [])


    const GraficoSatisfacao = () => {
        const u = usuario[0];
        return (
            <ProgressCircle
                style={styles.grafico}
                progress={u.nivelSatisfacao}
                progressColor={'#C20004'}
                backgroundColor={'rgba(194, 0, 4, 0.15)'}
                startAngle={0}
                cornerRadius={5}
                strokeWidth={15}
                endAngle={360}
            >
                <SvgText
                    x={-10}
                    y={1.5}
                    fill={'black'}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={25}
                    fontWeight={'bolder'}
                    stroke={'white'}
                    opacity={'1'}
                    strokeWidth={0.4}>
                    {u.nivelSatisfacao * 100}%
                </SvgText>
            </ProgressCircle>

        )
    }



    const GraficoAvaliacao = () => {
        const u = usuario[0];
        return (
            <ProgressCircle
                style={styles.grafico}
                progress={u.mediaAvaliacao / 10}
                progressColor={'#C20004'}
                backgroundColor={'rgba(194, 0, 4, 0.15)'}
                startAngle={0}
                cornerRadius={5}
                strokeWidth={15}
                endAngle={360}
            >
                <SvgText
                    x={-10}
                    y={1.5}
                    fill={'black'}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={25}
                    fontWeight={'bolder'}
                    stroke={'white'}
                    opacity={'1'}
                    strokeWidth={0.4}>
                    {u.mediaAvaliacao * 10}%
                </SvgText>
            </ProgressCircle>

        )
    }



    function LineChartExample() {

        const atividadesFinalizadas = minhasAtividades
        .filter(a => a.idSituacaoAtividade === 3)
        .map(p => p.dataConclusao);
        
        const data = [50, 20, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
        console.warn(atividadesFinalizadas);

        return (


            <LineChart
                style={{ height: 200 }}
                data={data}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={{ top: 20, bottom: 20 }}
            >
                <Grid />
            </LineChart>

        )
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
                                        source={usuario.caminhoFotoPerfil == undefined ? {
                                            uri:
                                                "https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples/" +
                                                usuario.caminhoFotoPerfil,
                                        } : require("../../../assets/imgMobile/Perfil.png")}
                                        resizeMod="cover"
                                    />

                                    <View style={styles.containerTextos}>
                                        <Text style={styles.lineTextPerfil}>{usuario.nome}</Text>
                                        <Text style={styles.lineTextPerfil}>{usuario.idCargoNavigation.nomeCargo}</Text>
                                    </View>
                                </View>

                                <View style={styles.containerPieChart} >
                                    <View style={styles.containerLegendas}>
                                        <Text style={styles.tituloGrafico}>Nivel de Satisfação:</Text>
                                    </View>
                                    <GraficoSatisfacao />
                                </View>
                                <View style={styles.containerPieChart} >
                                    <View style={styles.containerLegendas}>
                                        <Text style={styles.tituloGrafico}>Média de Avaliação:</Text>
                                    </View>
                                    <GraficoAvaliacao />
                                </View>
                                
                                <LineChartExample />
                            </View>

                        </View>

                    )
                }
                )
                }


            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        alignItems: "center",
        width: '100%',
        //backgroundColor: 'orange'
    },
    imgLogo: {
        width: 300,
        height: 40,
        marginTop: 40,
        marginBottom: 20,
    },
    tituloPage: {
        fontSize: 32,
        width: '80%',
        textAlign: 'center',
        fontFamily: 'Montserrat_600SemiBold',
        textTransform: 'uppercase',
        color: '#2A2E32'
    },
    containerAreaDados: {
        //backgroundColor: 'yellow',
        flex: 1,
        width: '100%',
        paddingHorizontal: '5%',
    },
    containerDados: {
        //backgroundColor: 'cyan',
        //height: 200,
        flex: 1,
        marginTop: 20,
        //alignItems: 'flex-start'
    },
    containerLine: {
        width: '100%',
        //height: 110,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: 'gray',
        flexDirection: "row",
        //backgroundColor: 'green',
        padding: 10

    },
    containerTextos: {
        marginLeft: 24,
        marginTop: 0,
        fontFamily: ' Quicksand_300Light',
        //backgroundColor: 'blue'
    },
    lineTextPerfil: {
        fontFamily: ' Quicksand_300Light',
        fontSize: 25,
        color: '#000'
    },
    containerPieChart: {
        //flex: 1,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: 'gray',
        flexDirection: 'row',
        //backgroundColor: 'purple',
        justifyContent: 'space-between',
        marginTop: 20,
        alignItems: 'center',
        padding: 10,
        height: 120,
    },
    containerLegendas: {
        flex: 1,
        //backgroundColor: 'orange'
    },
    grafico: {
        //flex: 1,
        width: 75,
        height: 75,
        // backgroundColor: 'blue',
    },
    tituloGrafico: {
        fontSize: 20,
        marginLeft: 10
    }
})