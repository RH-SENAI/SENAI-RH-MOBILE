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
} from 'react-native';

export default class Atividades extends Component {

    state = {
        modalVisible: false
    };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }


    render() {
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
                                <Text style={styles.font}> Obrigatórios </Text>
                                <View style={styles.line1}></View>
                            </View>

                            <View style={styles.itemIndividual}>
                                <Text style={styles.font}> Extras </Text>
                                <View style={styles.line2}></View>
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
                                        <Text style={styles.modalText}>Hello World!</Text>
                                        <TouchableOpacity
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => this.setModalVisible(!modalVisible)}
                                        >
                                            <Text style={styles.textStyle}>Hide Modal</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => this.setModalVisible(true)}
                            >
                           
                            </TouchableOpacity>


                            <TouchableOpacity style={styles.Modalbotao}>
                                <Image source={require('../../../assets/img-gp1/setaModal.png')}

                                />
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

    // boxFlatList:{
    //     height:1000
    // },


    // mainBodyContent: {
    //     height: 200
    // },

    mainHeader: {
        // justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,

        //boxShadow: '-6px 0px 19px rgba(0, 0, 0, 0.24)',
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 3
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 20,
        // height: 350,
        // width: 280,

    },

    // imgLogo: {
    //     width: 104,
    //     height: 29,
    // },

    titulo: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },

    tituloEfects: {
        // fontFamily: 'Montserrat-Regular',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#2A2E32',
        fontSize: 23,
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
        // fontFamily: 'Montserrat-SemiBold',
        fontSize: 15,
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
        paddingRight: 5
        // fontFamily: 'Montserrat-SemiBold',
    },

    imgCoins: {
        width: 18,
        height: 18,
    },

    conteudoBox: {
        paddingLeft: 15,
    },


    nomeBox: {
        // fontFamily: 'Montserrat-Regular',
        color: '#000000',
        fontSize: 16,
    },

    criador: {
        // fontFamily: 'Montserrat-Regular',
        fontSize: 15,

        paddingTop: 8,
    },

    data: {
        // fontFamily: 'Montserrat-Regular',
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
        // fontFamily: 'Montserrat-SemiBold',
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
    }
})