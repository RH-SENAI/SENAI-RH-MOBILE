import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    Pressable,
    Image,
    FlatList,
    ScrollView
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Component } from 'react/cjs/react.production.min';
import { AppRegistry } from 'react-native-web';
import ExplodingHeart from 'react-native-exploding-heart';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AwesomeAlert from 'react-native-awesome-alerts';
import ReadMore from 'react-native-read-more-text';
import api from '../../services/apiGrupo2.js';
import apiUser from '../../services/apiGp1.js';
const delay = require('delay');
// import { Location, Permissions } from 'expo';

export default class FavoritosDesconto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Userlatitude: null,
            Userlongitude: null,
            errorMessage: '',
            modalVisivel: false,
            isFavorite: false,
            inscrito: '',
            showAlert: false,
            contadorCurso: 0,
            listaDesconto: [],
            descontoBuscado: [],
            localizacaoCurso: [],
        };
    }

    ListarDescontosFavoritos = async () => {
        try {
            // const token = await AsyncStorage.getItem('userToken');
            // console.warn(token)

            // const resposta = await api('/FavoritosCursos',
            //     {
            //         headers: {
            //             Authorization: 'Bearer ' + token,
            //         }
            //     },
            // );

            // const jtiUser = base64.decode(token.split('.')[1])
            // const user = JSON.parse(jtiUser)
            // console.warn(user)

            const resposta = await api(`/FavoritosDescontos/Favorito/1`);

            if (resposta.status == 200) {
                const dadosDesconto = resposta.data;

                console.warn(dadosDesconto);

                this.setState({ listaDesconto: dadosDesconto })
                console.warn(this.state.listaDesconto)
                console.warn('Favoritos encontrados');
            }
        }
        catch (erro) {
            console.warn(erro);
        }
    }

    setModalVisivel = (visible, id) => {
        if (visible == true) {
            this.ProcurarDesconto(id)
        }
        else if (visible == false) {
            this.setState({ cursoBuscado: [] })
        }

        this.setState({ modalVisivel: visible })
    }

    componentDidMount = async () => {
        this.ListarDescontosFavoritos();
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

    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={{ color: '#CB334B', marginTop: 5 }} onPress={handlePress}>
                Ver mais
            </Text>
        );
    }

    _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={{ color: '#CB334B', marginTop: 5 }} onPress={handlePress}>
                Ver menos
            </Text>
        );
    }

    _handleTextReady = () => {
        // ...
    }

    ProcurarDesconto = async (id) => {
        try {
            const resposta = await api('/Descontos/' + id);
            // console.warn(resposta)
            if (resposta.status == 200) {
                const dadosDesconto = await resposta.data;
                this.setState({ descontoBuscado: dadosDesconto })
            }
        }
        catch (erro) {
            console.warn(erro);
        }
    }

    render() {
        return (
            <View style={styles.containerListagem}>
                <View style={styles.boxLogoHeader}>
                    <Image source={require('../../../assets/imgGP2/logo_2S.png')} />
                </View>

                <View style={styles.boxTituloPrincipal}>
                    <Text style={styles.textTituloPrincipal}>favoritos</Text>
                </View>
                <View style={styles.boxSaldoUsuario}>
                    <Image style={styles.imgCoin} source={require('../../../assets/imgGP2/cash.png')} />
                    <Text style={styles.textDados}>3024</Text>
                </View>

                <View style={styles.boxSelect}>

                    <Pressable onPress={() => this.props.navigation.navigate('Favoritos')}>
                        <Text style={styles.textDescontos}> Cursos </Text>
                    </Pressable>
                    <View style={styles.boxTituloCursoSelect}>
                        <Text> Descontos </Text>
                        <View style={styles.line}></View>
                    </View>

                </View>

                <FlatList
                    style={styles.flatlist}
                    data={this.state.listaDesconto}
                    keyExtractor={item => item.idDescontoFavorito}
                    renderItem={this.renderItem}
                />
            </View>

        );
    }
    renderItem = ({ item }) => (
        <View>
            <View style={styles.containerCurso}>
                <Pressable onPress={() => this.setModalVisivel(true, item.idDescontoNavigation.idDesconto)}>
                    <View style={styles.boxCurso}>
                        <View style={styles.boxImgCurso}>
                            <Image style={styles.imgCurso} source={{ uri: `https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples-grp2/${item.idDescontoNavigation.caminhoImagemDesconto}` }} />
                        </View>

                        <View style={styles.boxTituloCurso}>
                            <Text style={styles.textTituloCurso}>{item.idDescontoNavigation.nomeDesconto}</Text>
                        </View>

                        <View style={styles.boxAvaliacao}>
                            <AirbnbRating
                                count={5}
                                //starImage={star}
                                showRating={false}
                                selectedColor={'#C20004'}
                                defaultRating={item.idDescontoNavigation.mediaAvaliacaoDesconto}
                                isDisabled={true}
                                size={20} />
                        </View>

                        <View style={styles.boxPrecoFavorito}>
                            <View style={styles.boxPreco}>
                                <Image style={styles.imgCoin} source={require('../../../assets/imgGP2/cash.png')} />
                                <Text style={styles.textDados}>{item.idDescontoNavigation.valorDesconto}</Text>
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
                    key={item.idDesconto == this.state.descontoBuscado.idDesconto}
                    onRequestClose={() => {
                        this.setModalVisivel(!this.state.modalVisivel)
                    }}
                >
                    <View style={styles.totalModal}>
                        <Pressable onPress={() => this.setModalVisivel(!this.state.modalVisivel)} >
                            <View style={styles.containerModal}>
                                <ScrollView>
                                    <View style={styles.boxTituloModal}>
                                        <View style={styles.boxImgCurso}>
                                            <Image style={styles.imgModalCurso} source={{ uri: `https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples-grp2/${item.idDescontoNavigation.caminhoImagemDesconto}` }} />
                                        </View>
                                        <Text style={styles.textTituloModal}>{item.nomeDesconto}</Text>
                                    </View>
                                    <View style={styles.boxAvaliacaoModal}>
                                        <AirbnbRating
                                            count={5}
                                            //starImage={star}
                                            showRating={false}
                                            selectedColor={'#C20004'}
                                            defaultRating={item.mediaAvaliacaoDesconto}
                                            isDisabled={true}
                                            size={20}
                                        />
                                    </View>

                                    <View style={styles.boxDadosModal}>
                                        <Image source={require('../../../assets/imgGP2/relogio.png')} />
                                        <Text style={styles.textDadosModal}>{item.cargaHoraria}</Text>

                                        <Image source={require('../../../assets/imgGP2/mapa.png')} />
                                        {/* <Text style={styles.textDadosModal}>{item.idEmpresaNavigation.idLocalizacaoNavigation.idEstadoNavigation.nomeEstado}</Text> */}
                                    </View>

                                    <View style={styles.boxDadosModal}>
                                        <Image source={require('../../../assets/imgGP2/local.png')} />
                                        <Text style={styles.textDadosModal}>Presencial</Text>

                                        <Image source={require('../../../assets/imgGP2/dataFinal.png')} />
                                        <Text style={styles.textDadosModal}>
                                            {/* {Intl.DateTimeFormat("pt-BR", {
                                                year: 'numeric', month: 'numeric', day: 'numeric'
                                            }).format(new Date(item.dataFinalizacao))} */}
                                        </Text>
                                    </View>

                                    <View style={styles.boxDescricaoModal}>
                                        <Text style={styles.descricaoModal}>Descrição:</Text>
                                        <ReadMore
                                            style={styles.boxVerMais}
                                            numberOfLines={3}
                                            renderTruncatedFooter={this._renderTruncatedFooter}
                                            renderRevealedFooter={this._renderRevealedFooter}
                                            onReady={this._handleTextReady}
                                        >
                                            <Text style={styles.textDescricaoModal}>{item.descricaoCurso}</Text>
                                        </ReadMore>

                                        <View style={styles.boxEmpresa}>
                                            <Text style={styles.tituloEmpresa}>Empresa: </Text>
                                            {/* <Text style={styles.textEmpresa}>{item.idEmpresaNavigation.nomeEmpresa}</Text> */}
                                        </View>

                                        <View style={styles.boxValorInscrever}>
                                            <View style={styles.boxPrecoModal}>
                                                <Image style={styles.imgCoin} source={require('../../../assets/imgGP2/cash.png')} />
                                                <Text style={styles.textDados}>{item.valorCurso}</Text>
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
                                                paddingLeft: 62
                                            })}
                                            onCancelPressed={() => {
                                                this.hideAlert();
                                            }}
                                        />
                                    </View>
                                </ScrollView>
                            </View>
                        </Pressable>
                    </View>
                </Modal>
            </View>
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
        height: 19.8,
        marginTop: 1
    },
    textDados: {
        marginLeft: 8
    },
    boxSelect: {
        width: 200,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    boxTituloCursoSelect: {
        alignItems: 'center',
    },
    line: {
        width: 80,
        height: 1,
        backgroundColor: 'black',
        marginBottom: 24
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
        width: '83%',
        height: '81%',
        backgroundColor: '#F2F2F2',
        borderWidth: 2,
        borderTopWidth: 0,
        borderColor: '#B3B3B3',
        //borderStyle: 'dashed',
        marginLeft: 33,
        marginTop: 88,
        borderRadius: 10,
    },
    boxTituloModal: {
        //alignItems: 'center',
    },
    imgModalCurso: {
        width: '101.5%',
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
        width: 120,
        marginLeft: 16
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
    boxVerMais: {
        height: 50
    },
    textDescricaoModal: {
        //fontFamily: 'Montserrat-Normal',
        width: 280,
        height: '18%',
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
        marginBottom: 10
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
        marginTop: 32,
        marginLeft: 24
    },
})