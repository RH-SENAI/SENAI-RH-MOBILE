import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    Pressable,
    Image,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { FlatList } from 'react-native-gesture-handler';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { Component } from 'react/cjs/react.production.min';
import { AppRegistry } from 'react-native-web';
import ExplodingHeart from 'react-native-exploding-heart';
import { Rating, AirbnbRating } from 'react-native-ratings';

const star = require('../../../assets/imgGP2/estrelaCheia.png')

export default class ListagemCurso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cursoBuscado: 0,
            modalVisivel: false,
            isFavorite: false,
            listaCurso: [],
        };
    }

    ListarCurso = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken')

            const resposta = await AppRegistry('/Cursos',
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                },
            );
            if (resposta.status == 200) {
                const dadosCurso = resposta.data;
                this.setState({ listaCurso: dadosCurso })
                console.warn('Cursos encontrados');
                console.warn(this.state.listaCurso);
            }
        }
        catch (erro) {
            console.warn(erro);
        }
    }
    setModalVisivel = (visible) => {
        this.setState({ modalVisivel: visible })
    }
    componentDidMount() {
        this.ListarCurso();
    }

    render() {
        return (
            <View style={styles.containerListagem}>
                <View style={styles.boxLogoHeader}>
                    <Image source={require('../../../assets/imgGP2/logo_2S.png')} />
                </View>

                <View style={styles.boxTituloPrincipal}>
                    <Text style={styles.textTituloPrincipal}>cursos</Text>
                </View>
                <Pressable onPress={() => this.setModalVisivel(true)}>
                    <View style={styles.boxCurso}>
                        <View style={styles.boxImgCurso}>
                            <Image style={styles.imgCurso} source={require('../../../assets/imgGP2/imgCurso.png')} />
                        </View>

                        <View style={styles.boxTituloCurso}>
                            <Text style={styles.textTituloCurso}>Lógica de Programação</Text>
                        </View>

                        <View style={styles.boxAvaliacao}>
                            <AirbnbRating
                                count={5}
                                //starImage={star}
                                showRating={false}
                                selectedColor={'#C20004'}
                                defaultRating={4}
                                isDisabled={true}
                                size={20}
                            />
                        </View>

                        <View style={styles.boxDadosCurso}>
                            <View style={styles.boxDados}>
                                <Image style={styles.imgDados} source={require('../../../assets/imgGP2/relogio.png')} />
                                <Text style={styles.textDados}>20 horas</Text>
                            </View>

                            <View style={styles.boxDados}>
                                <Image style={styles.imgDados} source={require('../../../assets/imgGP2/local.png')} />
                                <Text style={styles.textDados}>EAD</Text>
                            </View>
                        </View>

                        <View style={styles.boxPrecoFavorito}>
                            <View style={styles.boxPreco}>
                                <Image style={styles.imgCoin} source={require('../../../assets/imgGP2/cash.png')} />
                                <Text style={styles.textDados}>1024</Text>
                            </View>

                            <View style={styles.boxFavorito}>
                                <ExplodingHeart width={80} status={this.state.isFavorite} onClick={() => this.setState(!isFavorite)} onChange={(ev) => console.log(ev)} />
                            </View>
                        </View>
                    </View>
                </Pressable>


                <Modal
                    //style={styles.containerModal}
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisivel}
                    //key={item.idCurso == this.state.cursoBuscado.idCurso}
                    onRequestClose={() => {
                        this.setModalVisivel(!this.state.modalVisivel)
                    }}
                >
                    <View style={styles.totalModal}>

                        <View style={styles.containerModal}>
                            <View style={styles.boxTituloModal}>
                                <Image style={styles.imgModalCurso} source={require('../../../assets/imgGP2/imgCurso.png')} />
                                <Text style={styles.textTituloModal}>Lógica de Programação</Text>
                            </View>
                            <View style={styles.boxAvaliacaoModal}>
                                <AirbnbRating
                                    count={5}
                                    //starImage={star}
                                    showRating={false}
                                    selectedColor={'#C20004'}
                                    defaultRating={4}
                                    isDisabled={true}
                                    size={20}
                                />
                            </View>
                            <View style={styles.boxDadosModal}>
                                {/* <Image style={styles.imgTempoHorario} source={require('../../assets/img/relogio.png')} /> */}
                                <Text style={styles.textDadosModal}>20 horas</Text>

                                {/* <Image style={styles.imgTempoHorario} source={require('../../assets/img/imgAvisoTempo.png')} /> */}
                                <Text style={styles.textDadosModal}>
                                    15/02/2022
                                    {/* {Intl.DateTimeFormat("pt-BR", {
                                        year: 'numeric', month: 'numeric', day: 'numeric'
                                    }).format(new Date(item.dataFinalizacao))} */}
                                </Text>
                            </View>
                            <View style={styles.boxLocalizacaoModal}>
                                <Text style={styles.textLocalizacaoModal}>São Paulo, São Paulo</Text>
                            </View>
                            <View style={styles.boxDescricaoModal}>
                                <Text style={styles.descricaoModal}>Descrição:</Text>
                                <Text style={styles.textDescricaoModal}>
                                    O curso habilita profissionais técnicos de nível médio em
                                    Desenvolvimento de Sistemas, visando suprir a demanda do
                                    mercado por profissionais qualificados para atuarem em
                                    programação e desenvolvimento de software com condições
                                    técnico-tecnológicas para atender às exigências e evolução
                                    do segmento.
                                </Text>
                                <View style={styles.boxEmpresa}>
                                    <Text style={styles.tituloEmpresa}>Empresa: </Text>
                                    <Text style={styles.textEmpresa}>Senai - Santa Cecília </Text>
                                </View>

                                <Pressable style={styles.inscreverModal} onPress={() => this.setModalVisivel(!this.state.modalVisivel)} >
                                    <Text style={styles.textDetalhes}>Inscreva-se</Text>
                                </Pressable>
                            </View>
                        </View>

                    </View>
                </Modal>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    containerListagem: {
        flex: 1,
        alignItems: 'center'
    },
    boxLogoHeader: {
        marginTop: 50
    },
    boxTituloPrincipal: {
        marginTop: 30,
        marginBottom: 30
    },
    textTituloPrincipal: {
        textTransform: 'uppercase',
        fontSize: 30
    },
    boxCurso: {
        height: 285,
        borderWidth: 2,
        borderColor: '#B3B3B3',
        borderRadius: 10,
    },
    imgCurso: {
        width: 300,
        height: 83,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    boxTituloCurso: {
        marginLeft: 16
    },
    textTituloCurso: {
        fontSize: 20,
        marginTop: 8,
    },
    boxAvaliacao: {
        width: 150,
        height: 32,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 16,
        marginTop: 4
    },
    boxDados: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 8,
        marginLeft: 16
    },
    imgDados: {
        width: 19.6,
        height: 19.3,
        marginTop: 1
    },
    textDados: {
        marginLeft: 8
    },
    boxPrecoFavorito: {
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 16,
        marginLeft: 16
    },
    boxPreco: {
        width: 90,
        borderWidth: 2,
        borderColor: '#B3B3B3',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgCoin: {
        width: 22.1,
        height: 22,
    },
    boxFavorito: {
        width: 50,
        height: 40,
        //backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 135,
    },
    modalAbrir: {
        width: 100,
        height: 40,
        backgroundColor: '#CB334B',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textDetalhes: {
        color: 'white'
    },
    totalModal: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    containerModal: {
        width: '80%',
        height: '93%',
        backgroundColor: '#F2F2F2',
        marginLeft: 40,
        marginTop: 20,
        borderRadius: 25,
    },
    boxTituloModal: {
        //alignItems: 'center',
    },
    imgModalCurso: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    textTituloModal: {
        //fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        color: '#000',
        marginTop: 20,
        marginLeft: 15
    },
    boxAvaliacaoModal: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textAvaliacaoModal: {
        //fontFamily: 'Montserrat-Normal',
        fontSize: 15,
        color: '#000',
        marginTop: 10,
        marginLeft: 15
    },
    avaliacaoModal: {
        fontFamily: 'Montserrat-Normal',
        fontSize: 15,
        color: '#000',
        marginTop: 10,
        marginLeft: 15
    },
    boxDadosModal: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    imgTempoHorario: {
        marginLeft: 15
    },
    textDadosModal: {
        marginRight: 40
    },
    boxLocalizacaoModal: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    imgLocalizacaoModal: {
        marginLeft: 15
    },
    textLocalizacaoModal: {
        marginRight: 153
    },
    boxDescricaoModal: {
        width: 300,
        marginLeft: 10,
        marginTop: 20
    },
    descricaoModal: {
        //fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: '#000',
    },
    textDescricaoModal: {
        //fontFamily: 'Montserrat-Normal',
        fontSize: 14,
        color: '#000',
        alignItems: 'center',
        marginTop: 5
    },
    boxEmpresa: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15
    },
    tituloEmpresa: {
        //fontFamily: 'Montserrat-Bold',
        fontSize: 12,
        color: '#000',
    },
    textEmpresa: {
        //fontFamily: 'Montserrat-Normal',
        fontSize: 14,
        color: '#000',
        marginLeft: 10
    },
    inscreverModal: {
        width: 150,
        height: 40,
        backgroundColor: '#CB334B',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 80,
        marginTop: 20
    },
})