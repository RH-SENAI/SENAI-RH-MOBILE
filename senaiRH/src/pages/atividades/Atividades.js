import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ImageBackground,
    TextInput,
    Modal,
    AnimatableBlurView
} from 'react-native';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';


let customFonts = {
  'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'),
  'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
  'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'),
  'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'),
  'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf'),
  'Quicksand-SemiBold': require('../../../assets/fonts/Quicksand-SemiBold.ttf')
}

export default class Atividades extends Component {

    state = {
        modalVisible: false
    };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }


    async _loadFontsAsync(){
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }
    
      componentDidMount(){
        this._loadFontsAsync();
      }

    render() {
        if (!customFonts) {
            return <AppLoading />;
        }
        const { modalVisible } = this.state;
        return (
            <View style={styles.main}>

                <View>
                    <View style={styles.mainHeader}>
                        <Image source={require('../../../assets/img-gp1/logoSenai2.png')}
                            style={styles.imgLogo}
                        />

                    </View>

                    <View style={styles.titulo}>

                        <Text style={styles.tituloEfects}>{'atividades'.toUpperCase()} </Text>

                        <View style={styles.escritaEscolha}>
                            <View style={styles.itemEquipe}>
                                <TouchableOpacity>
                                     <Text style={styles.font}> Obrigatórios </Text>
                               
                                </TouchableOpacity>
                                <View style={styles.line1}></View>
                            </View>

                            <View style={styles.itemIndividual}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('AtividadesExtras')}>
                                  <Text style={styles.font}> Extras </Text>
                                <View style={styles.line2}></View>    
                                </TouchableOpacity>
                              
                            </View>

                        </View>
                    </View>
                </View>


                <View style={styles.boxAtividade}>

                    <View style={styles.box}>
                        <View style={styles.quadrado}></View>
                        <View style={styles.espacoPontos}>
                            <Text style={styles.pontos}> 20 CashS </Text>
                            <Image source={require('../../../assets/img-gp1/coins.png')}
                                style={styles.imgCoins}
                            />
                        </View>
                        <View style={styles.conteudoBox}>
                            <Text style={styles.nomeBox}> Titulo Atividade </Text>
                            <Text style={styles.criador}> Criador da atividade </Text>
                            <Text style={styles.data}> Data de Entrega: 18/03/2022 </Text>
                        </View>

                        <View style={styles.ModaleBotao}>
                            <TouchableOpacity style={styles.botao}>
                                <View style={styles.corBotão}>
                                    <Text style={styles.texto}> Realizar </Text>
                                </View>
                            </TouchableOpacity>

                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    this.setModalVisible(!modalVisible);
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
                                            <Text style={styles.criadorModal}> Criador da atividade </Text>
                                        </View>
                                        <View style={styles.botoesModal}>
                                            <TouchableOpacity >
                                                <View style={styles.associarModal}>
                                                    <Text style={styles.texto}> Realizar </Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity

onPress={() => this.setModalVisible(!modalVisible)}
>
                                                <View style={styles.fecharModal}>
                                                    <Text style={styles.textoFechar}>Fechar X</Text>
                                                </View>

                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                            
                        
                            </Modal>
                            <TouchableOpacity style={styles.Modalbotao} onPress={() => this.setModalVisible(true)}  >
                                <Image source={require('../../../assets/img-gp1/setaModal.png')} />
                            </TouchableOpacity>


                        </View>
                        {/* <View style={styles.botaoIndisp}>
                            <View style={styles.corIndisp}>
                            <Text style={styles.textoIndisp}> Indisponivel </Text>
                            </View>
                        </View> */}
                    </View>
                </View>
            </View>


)
}



}
const styles = StyleSheet.create({

    main: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },

    mainHeader: {

        alignItems: 'center',
        paddingTop: 40,

    },

    titulo: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },

    tituloEfects: {
        fontFamily: 'Montserrat-SemiBold',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#2A2E32',
        fontSize: 30,
    },

    escritaEscolha: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 30,
        // paddingBottom:20
    },

    itemEquipe: {

        marginRight: 80,
        alignItems: 'center',
    },

    font: {
        fontFamily: 'Quicksand-Regular',
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

    boxAtividade: {
        paddingTop: 40,

        alignItems: 'center',
    },

    quadrado: {
        backgroundColor: '#2A2E32',
        height: 28,
        width: '100%',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8

    },




    box: {
        height: 210,
        borderWidth: 1,
        borderColor: '#B3B3B3',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        marginBottom: 70,
        width: '85%',
    },

    espacoPontos: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 10,
        paddingRight: 18,
    },

    pontos: {
        fontSize: 14,
        paddingRight: 5,
        fontFamily: 'Quicksand-SemiBold',
    },

    imgCoins: {
        width: 18,
        height: 18,
    },

    conteudoBox: {
        paddingLeft: 15,
    },


    nomeBox: {
        fontFamily: 'Quicksand-SemiBold',
        color: '#000000',
        fontSize: 18,
    },

    criador: {
         fontFamily: 'Quicksand-Regular',
        fontSize: 15,

        paddingTop: 8,
    },

    data: {
     fontFamily: 'Quicksand-Regular',
        fontSize: 15,
        paddingTop: 8,
    },
    Modalbotao: {
        paddingRight: 18,
        paddingTop: 15
    },

    botao: {
        // flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 20,
        paddingLeft: 16
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
      fontFamily: 'Montserrat-Medium',
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
        // fontFamily: 'Montserrat-SemiBold',
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
        height: 350,
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
        fontFamily:'Quicksand-SemiBold',
        textAlign: "center",
        paddingTop: 24,
        fontSize: 20

    },

    descricaoModal: {
        fontFamily:'Quicksand-Regular',
        paddingTop: 24,
        fontSize: 15,
        paddingBottom: 16,
        marginLeft: 16
    },

    itemPostadoModal: {
        fontFamily:'Quicksand-Regular',
        fontSize: 15,
        paddingBottom: 16,
        marginLeft: 16
    },

    entregaModal: {
        fontFamily:'Quicksand-Regular',
        fontSize: 15,
        paddingBottom: 16,
        marginLeft: 16
    },

    criadorModal: {
        fontFamily:'Quicksand-Regular',
        fontSize: 15,
        paddingBottom: 30,
        marginLeft: 16
    },

    botoesModal: {
        fontFamily:'Montserrat-Medium',
        flexDirection: 'row',
        justifyContent: 'center',
        justifyContent: 'space-evenly'
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

    textoFechar:{
        fontFamily:'Montserrat-Medium',
        color: '#C20004'
    }



})