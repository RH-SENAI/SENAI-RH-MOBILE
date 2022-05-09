// React Imports
import { useState, useEffect } from "react";
import react from "react";
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

//Services
import api from "../../services/api";

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
            }

        } catch (error) {
            console.warn(error)
        }
    }
    useEffect(() => BuscarUsuario(), [])

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
                        <View style={styles.containerDados}>
                            <View style={styles.fotoPerfilContainer}>
                                <Image
                                    source={usuario.caminhoFotoPerfil == undefined ? {
                                        uri:
                                            "https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples/" +
                                            item.idUsuarioNavigation.caminhoFotoPerfil,
                                    } : require("../../../assets/imgMobile/Perfil.png")}
                                    resizeMod="cover"
                                />
                            </View>


                            <View style={styles.containerLine}>
                                <View style={styles.line}>
                                    <Text style={styles.lineTextPerfil}>{usuario.nome}</Text>
                                </View>

                                <View style={styles.line}>
                                    <Text style={styles.lineTextPerfil}>{usuario.idCargoNavigation.nomeCargo}</Text>
                                </View>
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
        alignItems: "center"
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

    containerDados: {
        width: '85%',
        height: 110,
        borderRadius: 5,
        borderWidth: 3,
        borderColor: 'gray',
        marginVertical: 20,
        flexDirection: "row"
    },

    fotoPerfilContainer: {
        marginLeft: 16,
        marginTop: 20

    },

    lineTextPerfil: {
        fontFamily: ' Quicksand_300Light',
        fontSize: 25,
        color: '#000'
    },
    containerLine: {
        marginLeft: 24,
        marginTop: 24,
        fontFamily: ' Quicksand_300Light',
    },

    line: {
        fontFamily: ' Quicksand_300Light',
    }
})