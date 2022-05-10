// React imports
import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from "react-native";

// Expo
import AppLoading from 'expo-app-loading';

// Pacote
import { useNavigation } from "@react-navigation/native";

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

export default function ModalDemocratizacao() {

    // Fontes utilizada
    let [fontsLoaded] = useFonts({

        //Montserrat
        Montserrat_500Medium,
        Montserrat_600SemiBold,

        // Quicksand
        Quicksand_300Light,
        Quicksand_600SemiBold,
    })

    const navigation = useNavigation();

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logoSenai}
                    source={require("../../../assets/imgMobile/logo_2S.png")}
                    resizeMode="contain"
                />
                <View style={styles.modalView}>
                    <View style={styles.containerLinks}>
                        <Text style={styles.titulo}>ÁREA DE DEMOCRATIZAÇÃO</Text>
                        <Text style={styles.subTitulo}>O que você gostaria de fazer?</Text>
                        <View style={styles.boxButton}>
                            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('ListarDecisao') }}>
                                <Text style={styles.texto}>Ver decisões</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('ListarFeedbacks') }}>
                                <Text style={styles.texto}>Ver feedbacks</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>

        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2",
        alignItems: "center",
    },
    iconFechar: {
        marginTop: 16,
        alignSelf: 'flex-start'
    },
    titulo: {
        marginTop : 60,
        fontSize: 25,
        width: "100%",
        textAlign: "center",
        marginBottom: 4,
        fontFamily: 'Montserrat_600SemiBold'
    },
    subTitulo: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 26,
        fontFamily: 'Montserrat_500Medium'
    },
    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 4,
        borderColor: "gray",
        width: "70%",
        height: 85,
        borderRadius: 5,
        marginTop: 15,
        marginBottom: 15,
    },
    texto: {
        color: "black",
        textAlign: "center",
        fontSize: 20
    },
    logoSenai: {
        width: 300,
        height: 40,
        marginTop: 40,
        marginBottom: 20,
    },
    boxButton : {
        width : '100%',
        height : '60%',
        alignItems : 'center',
        justifyContent : 'space-evenly'
    }
});