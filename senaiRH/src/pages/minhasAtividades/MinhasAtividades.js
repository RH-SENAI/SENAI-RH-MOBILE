import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
    AnimatableBlurView,
    FlatList,
    Image,
    Alert,
    Pressable
} from 'react-native';
import { BlurView } from 'expo-blur';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

import {
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
} from '@expo-google-fonts/quicksand'

import {
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light_Italic,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black_Italic,
} from '@expo-google-fonts/montserrat';


const MinhasAtividades = () => {


    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false)
    const [listaAtividades, setListaAtividades] = useState([]);
    const [mensagem, setmensagem] = useState('');
    //const [concluido, setConcluido] = useState([]);

    function ListaMinhas() {
        try {
            console.warn('tamo aqui')
            const token = AsyncStorage.getItem('userToken');
            console.warn(token)

            const xambers = base64.decode(token.split('.')[1])
            console.warn(xambers)
            const userJson = JSON.parse(xambers)

            console.warn(userJson)
            const resposta = api.get('/Atividades/MinhasAtividade/' + xambers.jti,
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                },
            );
            if (resposta.status == 200) {
                setListaAtividades(resposta.data)

            }
        } catch (error) {
            console.warn(error);
        }
    };

    useEffect(() => {
        ListaMinhas()
    }, []);


    const Concluir = async () => {
        const token = AsyncStorage.getItem('userToken');

        const userJson = JSON.parse(xambers)
        console.warn(userJson)

        api
            .post('/Atividades/ListaValidar' + xambers.jti,{
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            .then(resposta => {
                if (resposta.status == 200) {
                    console.warn('Atividade concluida com sucesso');
                    navigation.navigate()
                }
            })
            .catch(error => console.warn(error));
    };

    // function Concluir(){
    //     try {
    //         const token = AsyncStorage.getItem('userToken');

    //         const resposta = api.get('/Atividades/ListaValidar' + xambers.jti,
    //         {
    //             headers: {
    //                     Authorization: 'Bearer ' + token,
    //                 },
    //             },
    //             );
    //         if (resposta.status == 200) {
    //             setConcluido(resposta.data)
    //             //console.warn('Atividade concluida com sucesso');
    //         } else {
    //             console.warn('Falha ao concluir atividade');
    //         }
    //     } catch (error) {
    //         console.warn(error);
    //     }
    // };

    let [fontsLoaded] = useFonts({
        Regular: Quicksand_400Regular,
        Light: Quicksand_300Light,
        SemiBold: Quicksand_600SemiBold,
        Bold: Quicksand_700Bold,
        Medium: Quicksand_500Medium,
        Montserrat_100Thin,
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        MediumM: Montserrat_500Medium,
        SemiBoldM: Montserrat_600SemiBold,
        Montserrat_700Bold,
        Montserrat_800ExtraBold,
        Montserrat_900Black,
        Montserrat_100Thin_Italic,
        Montserrat_200ExtraLight_Italic,
        Montserrat_300Light_Italic,
        Montserrat_400Regular_Italic,
        Montserrat_500Medium_Italic,
        Montserrat_600SemiBold_Italic,
        Montserrat_700Bold_Italic,
        Montserrat_800ExtraBold_Italic,
        Montserrat_900Black_Italic,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }


    return (
        <View style={styles.main}>
            <View>

                <View style={styles.mainHeader}>
                    <Image source={require('../../../assets/img-gp1/logoSenai2.png')}
                        style={styles.imgLogo}
                    />

                </View>

                <View style={styles.titulo}>

                    <Text style={styles.tituloEfects}>{'Minhas atividades'.toUpperCase()} </Text>

                    <View style={styles.escritaEscolha}>
                        <View style={styles.itemEquipe}>
                            <TouchableOpacity>
                                <Text style={styles.font}> Obrigatórios </Text>

                            </TouchableOpacity>
                            <View style={styles.line1}></View>
                        </View>

                        <View style={styles.itemIndividual}>
                            <TouchableOpacity onPress={() => navigation.navigate('MinhasExtras')}>
                                <Text style={styles.font}> Extras </Text>
                                <View style={styles.line2}></View>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </View>


            <FlatList
                data={listaAtividades}
                keyExtractor={item => item.idAtividade}
                renderItem={renderItem}
            />

            {/* <View style={styles.MinhaAtividade}>
                <View style={styles.quadradoeTexto}>
                    <View style={styles.quadrado}></View>
                    <Text style={styles.TituloAtividade}>Titulo da Atividade </Text>

                    <View style={styles.descricaoOlho}>
                        <Text style={styles.descricao}>Data de Entrega: 18/03/2022 </Text>
                    </View>
                    <View style={styles.ModaleBotao}>
                        <View style={styles.statusImagem}></View>
                        <View style={styles.statusImagem}>
                            <Image source={require('../../../assets/img-gp1/avaliando.png')} style={styles.avaliando} />
                            <Text style={styles.status}>Em avaliação </Text> */}

            {/* 
                         <Image source={require('../../../assets/img-gp1/pendente.png')} style={styles.avaliando}/>
              <Text style={styles.status}>Pendente </Text> 
              
              <Image source={require('../../../assets/img-gp1/validado.png')} style={styles.avaliando}/>
            <Text style={styles.status}>Validado </Text>  */}


            {/* </View> */}


            {/* <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setModalVisible(!modalVisible);
                            }}
                        >


                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={styles.quadradoModal}></View>
                                    <View style={styles.conteudoBoxModal}>
                                        <Text style={styles.nomeBoxModal}> Titulo Atividade </Text>
                                        <Text style={styles.descricaoModal}> Descrição Atividade </Text>
                                        <Text style={styles.itemPostadoModal}> Item Postado: 01/03/2022 </Text>
                                        <Text style={styles.entregaModal}> Data de Entrega: 18/03/2022 </Text>
                                        <Text style={styles.criadorModal}> Nome pessoa reponsavel </Text>
                                        <TouchableOpacity style={styles.anexo}>
                                            <Text style={styles.mais}>   + </Text>
                                            <Text style={styles.txtanexo}>    Adicionar Anexo</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.botoesModal}  >
                                        <TouchableOpacity >
                                            <View style={styles.associarModal}>
                                                <Text style={styles.texto}> Concluida </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity

                                            onPress={() => setModalVisible(!modalVisible)}
                                        >
                                            <View style={styles.fecharModal}>
                                                <Text style={styles.textoFechar}>Fechar X</Text>
                                            </View>

                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>


                        </Modal>
                        <TouchableOpacity style={styles.Modalbotao} onPress={() => setModalVisible(true)}  >
                            <Image source={require('../../../assets/img-gp1/setaModal.png')} />
                        </TouchableOpacity>





                    </View> */}
            {/* </View> */}
            {/* </View> */}

        </View >

    );


}

renderItem = ({ item }) => (

    <View>
        <View style={styles.MinhaAtividade}>
            <View style={styles.quadradoeTexto}>
                <View style={styles.quadrado}></View>
                <Text style={styles.TituloAtividade}> {item.nomeAtividade} </Text>

                <View style={styles.descricaoOlho}>
                    <Text style={styles.descricao}>{item.dataConclusao} </Text>
                </View>
                <View style={styles.ModaleBotao}>
                    {/* <View style={styles.statusImagem}></View> */}

                    <View style={styles.statusImagem}>

                        <Image
                            source={
                                item.idSituacaoAtividade == 1 ? require('../../../assets/img-gp1/validado.png') : item.idSituacaoAtividade == 2 ? require('../../../assets/img-gp1/pendente.png') : item.idSituacaoAtividade == 3 ? require('../../../assets/img-gp1/avaliando.png') : null
                            } />
                        <Text style={styles.status}>{item.idSituacaoAtividade == 1 ? setmensagem('Validado') : item.idSituacaoAtividade == 2 ? setmensagem('Pendente') : item.idSituacaoAtividade == 3 ? setmensagem('Avaliando') : null} {mensagem} </Text>

                    </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.quadradoModal}></View>
                                <View style={styles.conteudoBoxModal}>
                                    <Text style={styles.nomeBoxModal}> {item.nomeAtividade} </Text>
                                    <Text style={styles.descricaoModal}> {item.descricaoAtividade} </Text>
                                    <Text style={styles.itemPostadoModal}> {item.dataInicio} </Text>
                                    <Text style={styles.entregaModal}> {item.dataConclusao} </Text>
                                    <Text style={styles.criadorModal}> {item.idGestorCadastroNavigation.nome} </Text>
                                    
                                    <TouchableOpacity style={styles.anexo}>
                                        <Text style={styles.mais}>   + </Text>
                                        <Text style={styles.txtanexo}>    Adicionar Anexo</Text>
                                    </TouchableOpacity>
                                    
                                </View>

                                <View style={styles.botoesModal} >
                                    <TouchableOpacity
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        {/* onPress={() => this.Concluir(item.necessarioValidar)} */}
                                        <View style={styles.associarModal}>
                                            <Text style={styles.texto}> Concluida </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity

                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <View style={styles.fecharModal}>
                                            <Text style={styles.textoFechar}>Fechar X</Text>
                                        </View>

                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>


                    </Modal>
                    <TouchableOpacity style={styles.Modalbotao} onPress={() => setModalVisible(true)}>
                        <Image source={require('../../../assets/img-gp1/setaModal.png')} />
                    </TouchableOpacity>

                </View>
            </View>
        </View>

    </View>
)



const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        alignItems: 'center'
    },

    mainHeader: {

        alignItems: 'center',
        paddingTop: 40,

    },

    titulo: {
        // justifyContent: 'center',
        // alignItems: 'center',
        // paddingTop: 40,
    },

    tituloEfects: {
        fontFamily: 'SemiBoldM',
        // justifyContent: 'center',
        // alignItems: 'center',
        color: '#2A2E32',
        fontSize: 25,
        paddingTop: 40,
        textAlign: 'center'
    },

    escritaEscolha: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 40,
        paddingBottom: 48
    },

    itemEquipe: {

        marginRight: 80,
        alignItems: 'center',
    },

    font: {
        fontFamily: 'Regular',
        color: "#636466",
        fontSize: 20,
        paddingBottom: 5,
    },

    line1: {
        width: '100%',
        borderBottomWidth: 1,
    },

    itemIndividual: {
        alignItems: 'center',
    },

    line2: {
        width: '100%',
        borderBottomWidth: 1,
    },


    boxTitulo: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },

    titulo: {
        color: '#B83F52',
        fontSize: 18,
        fontFamily: 'SemiBold',
    },


    MinhaAtividade: {
        // paddingTop: 80,
        // alignItems:'center',
        // justifyContent:'center',
        height: 120,
        borderWidth: 1,
        borderColor: '#B3B3B3',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        // marginBottom: 70,
        width: '85%',

    },

    quadradoeTexto: {
        flexWrap: "wrap",

    },


    quadrado: {
        backgroundColor: '#2A2E32',
        height: 119,
        width: '7%',
        // borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        marginRight: 16,

        // flexDirection:'row',
    },

    TituloAtividade: {
        //  fontFamily: "Quicksand-SemiBold",
        fontSize: 18,
        color: "#0E0E0E",
        marginTop: 16,
        height: 36
        // marginBottom: 13,

    },

    descricao: {
        fontFamily: "Regular",
        textAlign: 'center',
        fontSize: 14,
        color: "#636466",
        marginBottom: 5,
    },

    status: {
        fontFamily: "Regular",
        fontSize: 14,
        color: "#636466",
    },

    avaliando: {
        marginRight: 9,
        marginTop: 4,
        height: 15,
        width: 15,
    },

    statusImagem: {
        flexDirection: 'row',
        marginTop: 7,
        height: 20

    },

    descricaoOlho: {
        flexDirection: 'row',
        // justifyContent: 'flex-end',
        justifyContent: 'space-between',

    },


    lineAtividade: {
        width: 260,
        paddingTop: 10,
        borderBottomColor: '#D9D9D9',
        borderBottomWidth: 3,
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },

    modalView: {
        margin: 20,
        backgroundColor: "#F2F2F2",
        borderRadius: 5,
        padding: 35,
        alignItems: "center",
        // height: ,
        width: 280

    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        height: 40,
        width: 90,
        backgroundColor: '#F2F2F2',
        borderRadius: 5,
    },

    boxTextos: {
        marginBottom: 30,
        marginTop: 20,

    },

    Modalbotao: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        // paddingRight: 18,
        paddingTop: 6,
        // marginLeft:130,
        paddingLeft: 130
    },

    botao: {
        // flexDirection: 'row',
        // justifyContent: 'flex-start',
        // paddingTop: 20,
        // paddingLeft: 16
    },

    corBotão: {
        borderRadius: 15,
        height: 30,
        width: 87,
        backgroundColor: '#C20004',
        alignItems: 'center',
        justifyContent: 'center',
    },

    texto: {
        fontFamily: 'MediumM',
        color: '#E2E2E2',
        fontSize: 11,
        alignItems: 'center',
    },

    botaoIndisp: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 19,
    },

    corIndisp: {
        borderRadius: 5,
        height: 40,
        width: 90,
        backgroundColor: '#B1B3B6',
        alignItems: 'center',
        justifyContent: 'center',
    },

    ModaleBotao: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',


    },

    textoIndisp: {
        fontFamily: 'SemiBoldM',
        color: '#000000',
        fontSize: 11,
        alignItems: 'center',
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22
    },

    modalView: {
        height: 390,
        borderWidth: 1,
        borderColor: '#B3B3B3',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        // marginBottom: 20,
        width: '78%',

    },

    quadradoModal: {
        backgroundColor: '#2A2E32',
        height: 35,
        width: '100%',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8

    },
    nomeBoxModal: {
        fontFamily: 'SemiBold',
        textAlign: "center",
        paddingTop: 24,
        fontSize: 20

    },

    descricaoModal: {
        fontFamily: 'Regular',
        paddingTop: 24,
        fontSize: 15,
        paddingBottom: 16,
        marginLeft: 16
    },

    itemPostadoModal: {
        fontFamily: 'Regular',
        fontSize: 15,
        paddingBottom: 16,
        marginLeft: 16
    },

    entregaModal: {
        fontFamily: 'Regular',
        fontSize: 15,
        paddingBottom: 16,
        marginLeft: 16
    },

    criadorModal: {
        fontFamily: 'Regular',
        fontSize: 15,
        paddingBottom: 16,
        marginLeft: 16
    },

    botoesModal: {
        fontFamily: 'MediumM',
        flexDirection: 'row',
        justifyContent: 'center',
        justifyContent: 'space-evenly',
        paddingTop: 30
    },

    associarModal: {
        borderRadius: 15,
        height: 30,
        width: 108,
        backgroundColor: '#C20004',
        alignItems: 'center',
        justifyContent: 'center',

    },

    fecharModal: {
        borderRadius: 15,
        height: 30,
        width: 108,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#C20004',
        color: '#C20004'
    },

    anexo: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#B3B3B3',
        width: 175,
        marginLeft: 19,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 30
    },


    txtanexo: {
        fontFamily: 'Regular',
        marginRight: 40
    },

    mais: {
        fontSize: 21,
        textAlign: 'center'
    },

    textoFechar: {
        fontFamily: 'MediumM',
        color: '#C20004'
    },




})

export default MinhasAtividades;
