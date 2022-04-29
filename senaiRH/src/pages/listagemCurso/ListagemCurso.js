import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    Pressable,
    Image,
    Alert,
    FlatList
} from 'react-native';

import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { Component } from 'react/cjs/react.production.min';
import { AppRegistry } from 'react-native-web';
import ExplodingHeart from 'react-native-exploding-heart';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AwesomeAlert from 'react-native-awesome-alerts';
import api from '../../services/apiGrupo2.js';

//const value = 2.4
// const alertCurso = () => 
//     Alert.alert(
//         "Sucesso",
//         "Você está inscrito no curso!",
//         [
//             {
//                 text: "Ok",
//                 style: 'cancel'
//             }
//         ]
//     )

export default class ListagemCurso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cursoBuscado: 0,
            modalVisivel: false,
            isFavorite: false,
            inscrito: '',
            listaCurso: [],
            showAlert: false,
        };
    }

    ListarCurso = async () => {
        try {
            //const token = await AsyncStorage.getItem('userToken')

            const resposta = await api('/Cursos');
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

    showAlert = () => {
        this.setState({
            showAlert: true
        });
    };

    hideAlert = () => {
        this.setState({           
            showAlert: false
        });
    };

    modalidade = (item) => {
        if (item.modalidadeCurso == true)
        {
            return 'Presencial'
        }
        else {
            return 'EAD'
        }
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
                <View style={styles.boxSaldoUsuario}>
                    <Image style={styles.imgCoin} source={require('../../../assets/imgGP2/cash.png')} />
                    <Text style={styles.textDados}>3024</Text>
                </View>

                <FlatList
                    style={styles.flatlist}
                    data={this.state.listaCurso}
                    keyExtractor={item => item.idCurso}
                    renderItem={this.renderItem}
                />
            </View>

        );
    }
    renderItem = ({ item }) => (
        <View style={styles.containerCurso}>
            <Pressable onPress={() => this.setModalVisivel(true)}>
                <View style={styles.boxCurso}>
                    <View style={styles.boxImgCurso}>
                        <Image style={styles.imgCurso} source={require('../../../assets/imgGP2/imgCurso.png')} />
                    </View>

                    <View style={styles.boxTituloCurso}>
                        <Text style={styles.textTituloCurso}>{item.nomeCurso}</Text>
                    </View>

                    <View style={styles.boxAvaliacao}>
                        <AirbnbRating
                            count={5}
                            //starImage={star}
                            showRating={false}
                            selectedColor={'#C20004'}
                            defaultRating={item.mediaAvaliacaoCurso}
                            isDisabled={true}
                            size={20}
                        />
                    </View>

                    <View style={styles.boxDadosCurso}>
                        <View style={styles.boxDados}>
                            <Image style={styles.imgDados} source={require('../../../assets/imgGP2/relogio.png')} />
                            <Text style={styles.textDados}>{item.cargaHoraria}</Text>
                        </View>

                        <View style={styles.boxDados}>
                            <Image style={styles.imgDados} source={require('../../../assets/imgGP2/local.png')} />
                            <Text style={styles.textDados}>{this.modalidade(item)}</Text>
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
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisivel}
                //key={item.idCurso == this.state.cursoBuscado.idCurso}
                onRequestClose={() => {
                    this.setModalVisivel(!this.state.modalVisivel)
                }}
            >

                <View style={styles.totalModal}>
                    <Pressable onPress={() => this.setModalVisivel(!this.state.modalVisivel)} >
                        <View style={styles.containerModal}>
                            <View style={styles.boxTituloModal}>
                                <View style={styles.boxImgCurso}>
                                    <Image style={styles.imgModalCurso} source={require('../../../assets/imgGP2/imgCurso.png')} />
                                </View>
                                <Text style={styles.textTituloModal}>{item.nomeCurso}</Text>
                            </View>
                            <View style={styles.boxAvaliacaoModal}>
                                <AirbnbRating
                                    count={5}
                                    //starImage={star}
                                    showRating={false}
                                    selectedColor={'#C20004'}
                                    defaultRating={item.mediaAvaliacao}
                                    isDisabled={true}
                                    size={20}
                                />
                            </View>

                            <View style={styles.boxDadosModal}>
                                <Image style={styles.imgRelogio} source={require('../../../assets/imgGP2/relogio.png')} />
                                <Text style={styles.textDadosModal}>{item.cargaHoraria}</Text>

                                <Image style={styles.imgMapa} source={require('../../../assets/imgGP2/mapa.png')} />
                                <Text style={styles.textDadosModal}>{item.idEmpresaNavigation.idLocalizacaoNavigation.idEstadoNavigation.nomeEstado}</Text>
                            </View>

                            <View style={styles.boxDadosModal}>
                                <Image style={styles.imgLocal} source={require('../../../assets/imgGP2/local.png')} />
                                <Text style={styles.textDadosModal}>{item.modalidadeCurso}</Text>

                                <Image style={styles.imgDataFinal} source={require('../../../assets/imgGP2/dataFinal.png')} />
                                <Text style={styles.textDadosModal}>
                                    {/* {Intl.DateTimeFormat("pt-BR", {
                                        year: 'numeric', month: 'numeric', day: 'numeric'
                                    }).format(new Date(item.dataFinalizacao))} */}
                                </Text>
                            </View>

                            <View style={styles.boxDescricaoModal}>
                                <Text style={styles.descricaoModal}>Descrição:</Text>
                                <Text style={styles.textDescricaoModal}>{item.descricaoCurso}</Text>
                                <View style={styles.boxEmpresa}>
                                    <Text style={styles.tituloEmpresa}>Empresa: </Text>
                                    <Text style={styles.textEmpresa}>{item.idEmpresaNavigation.nomeEmpresa}</Text>
                                </View>

                                <View style={styles.boxValorInscrever}>
                                    <View style={styles.boxPrecoModal}>
                                        <Image style={styles.imgCoin} source={require('../../../assets/imgGP2/cash.png')} />
                                        <Text style={styles.textDados}>1024</Text>
                                    </View>

                                    <View style={styles.boxInscreverModal}>
                                        <Pressable style={styles.inscreverModal} onPress={() => { this.showAlert() }}  >
                                            <Text style={styles.textDetalhes}>Inscreva-se</Text>
                                        </Pressable>
                                    </View>
                                </View>

                                <AwesomeAlert 
                                    style={styles.bao}
                                    show={this.state.showAlert}
                                    showProgress={false}
                                    title="Sucesso"
                                    message="Você foi inscrito no curso!"
                                    closeOnTouchOutside={true}
                                    closeOnHardwareBackPress={false}
                                    showCancelButton={true}
                                    cancelText="Okay"
                                    cancelButtonColor="#C20004"
                                    cancelButtonStyle={this.alertView = StyleSheet.create({
                                        width: 150, 
                                        justifyContent: 'center'})}
                                    onCancelPressed={() => {
                                        this.hideAlert();
                                    }}
                                />
                            </View>
                        </View>
                    </Pressable>
                </View>
            </Modal>
        </View>
    );
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
        marginTop: 24,
        marginBottom: 24
    },
    textTituloPrincipal: {
        textTransform: 'uppercase',
        fontSize: 30
    },
    boxSaldoUsuario: {
        width: 90,
        height: 42,
        borderWidth: 2,
        borderColor: '#B3B3B3',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24
    },
    containerCurso: {
        marginBottom: 50,
    },
    boxCurso: {
        width: 275,
        height: 285,
        borderWidth: 2,
        borderColor: '#B3B3B3',
        borderTopWidth: 0,
        borderRadius: 10,
    },
    boxImgCurso: {
        alignItems: 'center',
    },
    imgCurso: {
        width: 275,
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
        height: 42,
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
        marginLeft: 105,
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
        height: '81.5%',
        backgroundColor: '#F2F2F2',
        borderWidth: 2,
        borderTopWidth: 0,
        borderColor: '#B3B3B3',
        //borderStyle: 'dashed',
        marginLeft: 40,
        marginTop: 88,
        borderRadius: 10,
    },
    boxTituloModal: {
        //alignItems: 'center',
    },
    imgModalCurso: {
        width: '101.2%',
        height: 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    textTituloModal: {
        //fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        color: '#000',
        marginTop: 24,
        marginLeft: 16
    },
    boxAvaliacaoModal: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        marginLeft: 16,
    },
    boxDadosModal: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginLeft: 16,
    },
    textDadosModal: {
        marginLeft: 16
    },
    imgMapa: {
        marginLeft: 24,
    },
    imgDataFinal: {
        marginLeft: 53,
    },
    boxDescricaoModal: {
        width: 300,
        marginLeft: 16,
        marginTop: 24
    },
    descricaoModal: {
        //fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: '#000',
    },
    textDescricaoModal: {
        //fontFamily: 'Montserrat-Normal',
        width: 280,
        height: 150,
        fontSize: 14,
        color: '#000',
        alignItems: 'center',
        display: 'flex',
        //textAlign: 'justify',
        marginTop: 5,
    },
    boxEmpresa: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 32
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
    boxValorInscrever: {
        display: 'flex',
        flexDirection: 'row',
    },
    boxPrecoModal: {
        width: 90,
        height: 48,
        borderWidth: 2,
        borderColor: '#B3B3B3',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
        marginRight: 40
    },
    boxInscreverModal: {
        alignItems: 'center'
    },
    inscreverModal: {
        width: 150,
        height: 48,
        backgroundColor: '#C20004',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32
    },
})