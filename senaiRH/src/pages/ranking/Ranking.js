// React Imports
import react from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';

// Pacotes
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Leaderboard from "react-native-leaderboard";

// Expo
import AppLoading from 'expo-app-loading';

// Fonts
import {
    useFonts,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
} from '@expo-google-fonts/montserrat';

import {
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_600SemiBold,
} from '@expo-google-fonts/quicksand';

// Services
import api from "../../services/api";
import jwtDecode from "jwt-decode";
import { Touchable } from "react-native-web";

const buscarDados = async () =>{
const token = await AsyncStorage.getItem
}


export default function Ranking() {


    // Fontes utilizada
    let [fontsLoaded] = useFonts({

        //Montserrat
        Montserrat_500Medium,
        Montserrat_600SemiBold,

        // Quicksand
        Quicksand_300Light,
        Quicksand_400Regular,
        Quicksand_600SemiBold,
    })

    return (
        <View style={styles.container}>
           
                <Image style={styles.logoSenai} source={require("../../../assets/imgMobile/logo_2S.png")} resizeMode="contain" />
            <View style={styles.text}>
                <Text style={styles.h1bold}>RANKING</Text>
                <Text style={styles.h1NonBold}>de funcionários</Text>

                <View style={styles.containerDados}>
                    <Text style={styles.dados}>Ranking</Text>
                    <Text style={styles.dados}>Foto</Text>
                    <Text style={styles.dados}>Funcionário</Text>
                    <Text style={styles.dados}>Satisfação</Text>
                    <Text style={styles.dados}>Nota</Text>
                </View>
                
                <View style={styles.containerUsuario}>
                    <TouchableOpacity style={styles.usuario}>

                    </TouchableOpacity>
                </View>

                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 370,
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold'
    }
});