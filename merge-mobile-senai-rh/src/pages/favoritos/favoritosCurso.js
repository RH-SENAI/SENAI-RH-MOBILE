import * as React from 'react';
import {
    Text,
    View,
    Modal,
    Pressable,
    Image,
    FlatList,
    ScrollView,
    Dimensions
} from 'react-native';
import { Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Component } from 'react/cjs/react.production.min';
import { AppRegistry } from 'react-native-web';
import ExplodingHeart from 'react-native-exploding-heart';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AwesomeAlert from 'react-native-awesome-alerts';
import ReadMore from 'react-native-read-more-text';
import api from '../../services/apiGp2.js';
import apiGp1 from '../../services/apiGp1.js';
import Constants from 'expo-constants';
import moment from 'moment';
import { FontAwesome5 } from '@expo/vector-icons';
// import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs();//Ignore all log notifications

let customFonts = {
    'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'),
    'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-SemiBold': require('../../../assets/fonts/Quicksand-SemiBold.ttf')
}

export default class TabViewExample extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'Cursos' },
            { key: 'second', title: 'Descontos' },
        ],
        errorMessage: '',
        modalVisivelCurso: false,
        modalVisivelDesconto: false,
        isFavorite: false,
        inscrito: '',
        fontsLoaded: false,
        showAlert: false,
        desabilitado: false,
        verifyRegistro: false,
        contadorCurso: 0,
        saldoUsuario: 0,
        empresaBuscada: '',
        listaCurso: [],
        cursoBuscado: [],
        localizacaoCurso: [],
        listaCurso: [],
        listaDesconto: [],
        descontoBuscado: [],
        localizacaoCurso: [],
        listaFavoritosCoracaoCurso: [],
        listaFavoritosCoracaoDesconto: []
    };

    //LISTAGEM POR IDFAVORITO - TROCAR ICURSO/FAVORITO 

    //PROCURAR CURSO E DESCONTO MUDAR PARA FAVORITO

    ProcurarCurso = async (id) => {
        try {
            const resposta = await api('/Cursos/' + id);
            // console.warn(resposta)
            if (resposta.status == 200) {
                const dadosCurso = await resposta.data;
                this.setState({ cursoBuscado: dadosCurso })
                this.setState({ empresaBuscada: this.state.cursoBuscado.idEmpresaNavigation.idLocalizacaoNavigation.idEstadoNavigation.nomeEstado })
            }
        }
        catch (erro) {
            console.warn(erro);
        }
    }

    ProcurarDesconto = async (id) => {
        try {
            const resposta = await api('/Descontos/' + id);
            // console.warn(resposta)
            if (resposta.status == 200) {
                const dadosDesconto = await resposta.data;
                this.setState({ descontoBuscado: dadosDesconto })
                this.setState({ empresaBuscada: this.state.descontoBuscado.idEmpresaNavigation.idLocalizacaoNavigation.idEstadoNavigation.nomeEstado })
            }
        }
        catch (erro) {
            console.warn(erro);
        }
    }

    SaldoUsuario = async () => {
        const idUser = await AsyncStorage.getItem('idUsuario');
        // console.log(idUser)
        const resposta = await apiGp1(`/Usuarios/BuscarUsuario/${idUser}`)
        if (resposta.status == 200) {
            var dadosUsuario = resposta.data
            // console.log(dadosUsuario);
            this.setState({ saldoUsuario: dadosUsuario.saldoMoeda })
        }
    }

    ListarCursoFavoritos = async () => {
        try {
            // const resposta = await api('/FavoritosCursos',
            //     {
            //         headers: {
            //             Authorization: 'Bearer ' + token,
            //         }
            //     },
            // );
            const idUser = await AsyncStorage.getItem('idUsuario');

            const resposta = await api(`/FavoritosCursos/Favorito/${idUser}`);
            if (resposta.status == 200) {
                const dadosCurso = resposta.data;

                // console.warn(dadosCurso);

                this.setState({ listaCurso: dadosCurso })
                this.verifyCoracaoCurso();
                // console.warn('Favoritos encontrados');
            }
        }
        catch (erro) {
            console.warn(erro);
        }
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
            const idUser = await AsyncStorage.getItem('idUsuario');

            const resposta = await api(`/FavoritosDescontos/Favorito/${idUser}`);
            if (resposta.status == 200) {
                const dadosDesconto = resposta.data;

                // console.warn(dadosDesconto);

                this.setState({ listaDesconto: dadosDesconto })
                this.verifyCoracaoDesconto();
                // console.warn(this.state.listaDesconto)
                // console.warn('Favoritos encontrados');
            }
        }
        catch (erro) {
            console.warn(erro);
        }
    }
    verifySaldo = (valor) => {
        if (this.state.saldoUsuario >= valor) {
            this.setState({ desabilitado: false });
        }
        else {
            this.setState({ desabilitado: true });
        }
    }

    setModalVisivelCurso = async (visible, id) => {
        if (visible == true) {
            this.ProcurarCurso(id);
            await delay(750);
            this.verifySaldo(this.state.cursoBuscado.valorCurso);
            this.verifySituacaoCurso(id);
            console.warn(this.state.saldoUsuario)
            // await delay(500);
            // console.warn(this.state.desabilitado)
            this.setState({ modalVisivel: visible })
        }
        else if (visible == false) {
            this.setState({ modalVisivel: visible })
            this.setState({ verifyRegistro: false })
            this.setState({ cursoBuscado: [] })
        }

        this.setState({ modalVisivelCurso: visible })
    }

    setModalVisivelDesconto = async (visible, id) => {
        if (visible == true) {
            this.ProcurarDescontos(id);
            await delay(750);
            this.verifySaldo(this.state.descontoBuscado.valorDesconto);
            this.verifySituacao(id);
            console.warn(this.state.saldoUsuario)
            // await delay(500);
            // console.warn(this.state.desabilitado)
            this.setState({ modalVisivel: visible })
        }
        else if (visible == false) {
            this.setState({ modalVisivel: visible })
            this.setState({ verifyRegistro: false })
            this.setState({ descontoBuscado: [] })
        }

        this.setState({ modalVisivelDesconto: visible })
    }

    verifySituacaoCurso = async (id) => {
        try {
            const idUser = await AsyncStorage.getItem('idUsuario');
            console.warn(idUser)
            console.warn(id)

            const respostaBuscar = await api(`/Registroscursos/RegistroCursos/IdUsuario/${idUser}`);

            var tamanhoJsonRegistro = Object.keys(respostaBuscar.data).length;

            let stringRegistros = JSON.stringify(respostaBuscar.data);
            var objRegistros = JSON.parse(stringRegistros);

            var k = 0;
            do {
                if (objRegistros != '') {
                    var registroId = objRegistros[k]['idCurso'];

                    if (registroId == id) {
                        this.setState({ verifyRegistro: true })
                        this.setState({ desabilitado: true });
                        console.warn("Curso já comprado!");
                    }
                }
                else {
                    this.setState({ verifyRegistro: false })
                    console.warn("Está vazio!")
                }
                k++
            } while (k < tamanhoJsonRegistro);

        } catch (error) {
            console.log(error)
        }
    }

    setSituacaoCurso = () => {
        if (this.state.verifyRegistro == true) {
            return 'Inscrito'
        }
        else {
            return 'Inscreva-se'
        }
    }

    showAlert = async () => {
        try {
            const idUser = await AsyncStorage.getItem('idUsuario');
            console.warn(idUser)
            console.warn(id)

            const respostaBuscar = await api(`/Registroscursos/RegistroCursos/IdUsuario/${idUser}`);

            var tamanhoJsonRegistro = Object.keys(respostaBuscar.data).length;

            let stringRegistros = JSON.stringify(respostaBuscar.data);
            var objRegistros = JSON.parse(stringRegistros);

            var k = 0;
            do {
                if (objRegistros != '') {
                    var registroId = objRegistros[k]['idCurso'];

                    if (registroId == id) {
                        // this.setState({ verifyRegistro: true })
                        console.warn("Curso já comprado!")
                        // this.setSituacao();
                    }
                }
                else {
                    console.warn("Está vazio!")
                }
                k++
            } while (k < tamanhoJsonRegistro);

            if (this.state.verifyRegistro != true) {
                const resposta = await api.post('/Registroscursos/Cadastrar', {
                    idCurso: id,
                    idUsuario: idUser,
                    idSituacaoAtividade: 2,
                });

                if (resposta.status == 201) {
                    this.setState({ showAlert: true });
                }
            }

        } catch (error) {
            console.log(error)
        }
    };

    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };

    modalidade = (item) => {
        if (item.modalidadeCurso == true) {
            return 'Presencial'
        }
        else {
            return 'EAD'
        }
    }

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

    RedirecionarComentarioCurso = () => {
        this.setState({ modalVisivel: false })
        // this.props.navigation.navigate('ComentarioDesconto')
    }

    verifyCoracaoCurso = async () => {
        const idUser = await AsyncStorage.getItem('idUsuario');

        const respostaFavoritos = await api('/FavoritosCursos/Favorito/' + idUser)
        var dadosVerifyFavoritos = respostaFavoritos.data
        this.setState({ listaFavoritosCoracaoCurso: dadosVerifyFavoritos })
        console.warn(this.state.listaFavoritosCoracaoCurso)
    }

    verifyCoracaoDesconto = async () => {
        const idUser = await AsyncStorage.getItem('idUsuario');

        const respostaFavoritos = await api('/FavoritosDescontos/Favorito/' + idUser)
        var dadosVerifyFavoritos = respostaFavoritos.data
        this.setState({ listaFavoritosCoracaoDesconto: dadosVerifyFavoritos })
        console.warn(this.state.listaFavoritosCoracaoDesconto)
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount = () => {
        this._loadFontsAsync();
        this.SaldoUsuario();
        // await delay(3000);
        this.ListarCursoFavoritos();
        this.ListarDescontosFavoritos();
    }

    componentWillUnmount = () => {
        this.ListarCursoFavoritos();
        this.ListarDescontosFavoritos();
    }

    _handleIndexChange = (index) => this.setState({ index });

    _renderTabBar = (props) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <View>
                <View style={styles.containerListagem}>
                    <View style={styles.boxLogoHeader}>
                        <Image source={require('../../../assets/img-geral/logo_2S.png')} />
                    </View>

                    <View style={styles.boxTituloPrincipal}>
                        <Text style={styles.textTituloPrincipal}>favoritos</Text>
                    </View>
                    <View style={styles.boxSaldoUsuario}>
                        <FontAwesome5 name="coins" size={24} color="#FBB01E" />
                        <Text style={styles.textDados}>{this.state.saldoUsuario}</Text>
                    </View>
                </View>
                <View style={styles.tabBar}>
                    {props.navigationState.routes.map((route, i) => {
                        const opacity = props.position.interpolate({
                            inputRange,
                            outputRange: inputRange.map((inputIndex) =>
                                inputIndex === i ? 1 : 0.5
                            ),
                        });

                        return (
                            <TouchableOpacity
                                style={styles.tabItem}
                                onPress={() => this.setState({ index: i })}>
                                <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
                                <Animated.View style={{ opacity, width: '50%', borderBottomWidth: 1 }} />
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        );
    };

    FirstRoute = () => (
        <View style={[styles.container]}>
            <FlatList
                style={styles.flatlist}
                data={this.state.listaCurso}
                keyExtractor={item => item.idCursoFavorito}
                renderItem={this.renderItem}
            />
        </View>
    );

    renderItem = ({ item }) => (
        <View style={styles.containerTab}>
            {/* <View style={styles.containerCurso}> */}
            <Pressable onPress={() => this.setModalVisivelCurso(true, item.idCurso)}>
                <View style={styles.boxCurso}>
                    <View style={styles.boxImgCurso}>
                        <Image style={styles.imgCurso} source={{ uri: `https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples-grp2/${item.idCursoNavigation.caminhoImagemCurso}` }} resizeMode='cover' />
                    </View>

                    <View style={styles.boxTituloCurso}>
                        <Text style={styles.textTituloCurso}>{item.idCursoNavigation.nomeCurso}</Text>
                    </View>

                    <View style={styles.boxAvaliacao}>
                        <AirbnbRating
                            count={5}
                            //starImage={star}
                            showRating={false}
                            selectedColor={'#4B7294'}
                            defaultRating={item.idCursoNavigation.mediaAvaliacaoCurso}
                            isDisabled={true}
                            size={20} />
                    </View>

                    <View style={styles.boxDadosCurso}>
                        <View style={styles.boxDados}>
                            <Image style={styles.imgDados} source={require('../../../assets/img-gp2/relogio.png')} />
                            <Text style={styles.textDados}>{item.idCursoNavigation.cargaHoraria}</Text>
                        </View>

                        <View style={styles.boxDados}>
                            <Image style={styles.imgDados} source={require('../../../assets/img-gp2/local.png')} />
                            <Text style={styles.textDados}>{this.modalidade(item.idCursoNavigation.modalidadeCurso)}</Text>
                        </View>
                    </View>

                    <View style={styles.boxPrecoFavorito}>
                        <View style={styles.boxPreco}>
                            <FontAwesome5 name="coins" size={24} color="#FBB01E" />
                            <Text style={styles.textDados}>{item.idCursoNavigation.valorCurso}</Text>
                        </View>

                        <View style={styles.boxFavorito}>
                            <ExplodingHeart width={80} status={this.state.listaFavoritosCoracaoCurso.some(l => { if (l.idCurso == item.idCurso) { return true } return false })} onChange={() => this.Favoritar(true, item.idCursoNavigation.idCurso)} />
                        </View>
                    </View>
                </View>
            </Pressable>

            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisivelCurso}
                key={item.idCursoFavorito == this.state.cursoBuscado.idCursoFavorito}
                onRequestClose={() => {
                    this.setModalVisivelCurso(!this.state.modalVisivelCurso)
                }}
            >
                <View style={styles.totalModal}>
                    <Pressable onPress={() => this.setModalVisivelCurso(!this.state.modalVisivelCurso)} >
                        <View style={styles.containerModal}>
                            <ScrollView>
                                <View style={styles.boxTituloModal}>
                                    <View style={styles.boxImgCurso}>
                                        <Image style={styles.imgModalCurso} source={{ uri: `https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples-grp2/${item.idCursoNavigation.caminhoImagemCurso}` }} resizeMode='cover' />
                                    </View>
                                    <Text style={styles.textTituloModal}>{item.idCursoNavigation.nomeCurso}</Text>
                                </View>

                                <View style={styles.boxAvaliacaoPreco}>
                                    <View style={styles.boxAvaliacaoModal}>
                                        <AirbnbRating
                                            count={5}
                                            //starImage={star}
                                            showRating={false}
                                            selectedColor={'#4B7294'}
                                            defaultRating={item.idCursoNavigation.mediaAvaliacaoCurso}
                                            isDisabled={true}
                                            size={20}
                                        />
                                    </View>
                                    <View style={styles.boxPrecoModal}>
                                        <Image style={styles.imgCoin} source={require('../../../assets/img-gp2/cash.png')} />
                                        <Text style={styles.textDados}>{item.idCursoNavigation.valorCurso}</Text>
                                    </View>
                                </View>

                                <View style={styles.boxDadosModal}>
                                    <Image source={require('../../../assets/img-gp2/relogio.png')} />
                                    <Text style={styles.textDadosModal}>{item.idCursoNavigation.cargaHoraria}</Text>

                                    <Image source={require('../../../assets/img-gp2/mapa.png')} />
                                    {/* <Text style={styles.textDadosModal}>{item.idEmpresaNavigation.idLocalizacaoNavigation.idEstadoNavigation.nomeEstado}</Text> */}
                                </View>

                                <View style={styles.boxDadosModal}>
                                    <Image source={require('../../../assets/img-gp2/local.png')} />
                                    <Text style={styles.textDadosModal}>{this.modalidade(item.idCursoNavigation.modalidadeCurso)}</Text>

                                    <Image source={require('../../../assets/img-gp2/dataFinal.png')} />
                                    <Text style={styles.textDadosModal}>
                                        {moment(item.dataFinalizacao).format('LL')}
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
                                        <Text style={styles.textDescricaoModal}>{item.idCursoNavigation.descricaoCurso}</Text>
                                    </ReadMore>

                                    <View style={styles.boxEmpresa}>
                                        <Text style={styles.tituloEmpresa}>Empresa: </Text>
                                        {/* <Text style={styles.textEmpresa}>{item.idEmpresaNavigation.nomeEmpresa}</Text> */}
                                    </View>

                                    <View style={styles.boxValorInscrever}>
                                        <View style={styles.boxComentarioModal}>
                                            <Pressable onPress={() => this.RedirecionarComentarioCurso()}>
                                                <Image source={require('../../../assets/img-gp2/comentario.png')} />
                                            </Pressable>
                                        </View>

                                        <View style={styles.boxInscreverModal}>
                                            <TouchableOpacity style={this.state.desabilitado ? styles.inscreverModalDisable : styles.inscreverModal} activeOpacity={this.state.desabilitado ? 1 : 0.1} disabled={this.state.desabilitado} onPress={() => { this.showAlert(this.state.cursoBuscado.idCurso) }} >
                                                <Text style={styles.textDetalhes}>{this.setSituacaoCurso()}</Text>
                                            </TouchableOpacity>
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
            {/* </View> */}
        </View>
    );

    SecondRoute = () => (
        <View style={[styles.container]}>
            <FlatList
                style={styles.flatlist}
                data={this.state.listaDesconto}
                keyExtractor={item => item.idDescontoFavorito}
                renderItem={this.renderItem2}
            />
        </View>
    );

    renderItem2 = ({ item }) => (
        <View style={styles.containerTab}>
            {/* <View style={styles.containerCurso}> */}
            <Pressable onPress={() => this.setModalVisivelDesconto(true, item.idDescontoNavigation.idDesconto)}>
                <View style={styles.boxCurso}>
                    <View style={styles.boxImgCurso}>
                        <Image style={styles.imgDesconto} source={{ uri: `https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples-grp2/${item.idDescontoNavigation.caminhoImagemDesconto}` }} resizeMode='stretch' />
                    </View>

                    <View style={styles.boxTituloCurso}>
                        <Text style={styles.textTituloCurso}>{item.idDescontoNavigation.nomeDesconto}</Text>
                    </View>

                    <View style={styles.boxAvaliacao}>
                        <AirbnbRating
                            count={5}
                            //starImage={star}
                            showRating={false}
                            selectedColor={'#4B7294'}
                            defaultRating={item.idDescontoNavigation.mediaAvaliacaoDesconto}
                            isDisabled={true}
                            size={20} />
                    </View>

                    <View style={styles.boxPrecoFavoritoDesconto}>
                        <View style={styles.boxPreco}>
                            <Image style={styles.imgCoin} source={require('../../../assets/img-gp2/cash.png')} />
                            <Text style={styles.textDados}>{item.idDescontoNavigation.valorDesconto}</Text>
                        </View>

                        <View style={styles.boxFavorito}>
                            <ExplodingHeart width={80} status={this.state.listaFavoritosCoracaoDesconto.some(l => { if (l.idDesconto == item.idDesconto) { return true } return false })} onChange={() => this.Favoritar(true, item.idDescontoNavigation.idDesconto)} />
                        </View>
                    </View>
                </View>
            </Pressable>

            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisivelDesconto}
                key={item.idDescontoFavorito == this.state.descontoBuscado.idDescontoFavorito}
                onRequestClose={() => {
                    this.setModalVisivelDesconto(!this.state.modalVisivelDesconto)
                }}
            >
                <View style={styles.totalModal}>
                    <Pressable onPress={() => this.setModalVisivelDesconto(!this.state.modalVisivelDesconto)} >
                        <View style={styles.containerModal}>
                            <ScrollView>
                                <View style={styles.boxTituloModal}>
                                    <View style={styles.boxImgCurso}>
                                        <Image style={styles.imgModalDesconto} source={{ uri: `https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples-grp2/${item.idDescontoNavigation.caminhoImagemDesconto}` }} resizeMode='cover' />
                                    </View>
                                    <Text style={styles.textTituloModal}>{item.idDescontoNavigation.nomeDesconto}</Text>
                                </View>

                                <View style={styles.boxAvaliacaoPreco}>
                                    <View style={styles.boxAvaliacaoModal}>
                                        <AirbnbRating
                                            count={5}
                                            //starImage={star}
                                            showRating={false}
                                            selectedColor={'#C20004'}
                                            defaultRating={item.idDescontoNavigation.mediaAvaliacaoDesconto}
                                            isDisabled={true}
                                            size={20}
                                        />
                                    </View>
                                    <View style={styles.boxPrecoModal}>
                                        <Image style={styles.imgCoin} source={require('../../../assets/img-gp2/cash.png')} />
                                        <Text style={styles.textDados}>{item.idDescontoNavigation.valorDesconto}</Text>
                                    </View>
                                </View>

                                <View style={styles.boxDadosModal}>
                                    <Image source={require('../../../assets/img-gp2/relogio.png')} />
                                    <Text style={styles.textDadosModal}>{item.idDescontoNavigation.cargaHoraria}</Text>

                                    <Image source={require('../../../assets/img-gp2/dataFinal.png')} />
                                    <Text style={styles.textDadosModal}>
                                        {moment(item.validadeDesconto).format('LL')}
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
                                        <Text style={styles.textDescricaoModal}>{item.idDescontoNavigation.descricaoCurso}</Text>
                                    </ReadMore>

                                    <View style={styles.boxEmpresa}>
                                        <Text style={styles.tituloEmpresa}>Empresa: </Text>
                                        {/* <Text style={styles.textEmpresa}>{item.idEmpresaNavigation.nomeEmpresa}</Text> */}
                                    </View>

                                    <View style={styles.boxValorInscrever}>
                                        <View style={styles.boxComentarioModal}>
                                            <Pressable onPress={() => this.RedirecionarComentarioDesconto()}>
                                                <Image source={require('../../../assets/img-gp2/comentario.png')} />
                                            </Pressable>
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
            {/* </View> */}
        </View>
    );

    _renderScene = SceneMap({
        first: this.FirstRoute,
        second: this.SecondRoute,
    });

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={this._renderScene}
                renderTabBar={this._renderTabBar}
                onIndexChange={this._handleIndexChange}
            />
        );
    }
}

if (Dimensions.get('window').width > 700) {
    var styles = StyleSheet.create({

        //Cursos

        container: {
            flex: 1,
        },
        tabBar: {
            flexDirection: 'row',
            backgroundColor: '#B3B3B3',
            marginTop: '30%'
        },
        tabItem: {
            flex: 1,
            alignItems: 'center',
            padding: 16,
            backgroundColor: '#F2F2F2',
        },
        containerTab: {
            alignItems: 'center',
            marginTop: 20
        },
        containerRefresh: {
            alignItems: 'center'
        },
        verify: {
            color: 'black'
        },
        containerListagem: {
            flex: 1,
            alignItems: 'center'
        },
        boxLogoHeader: {
            marginTop: 50
        },
        boxTituloPrincipal: {
            height: 50,
            marginTop: 56,
            marginBottom: 16,
            // backgroundColor: 'pink'
        },
        textTituloPrincipal: {
            textTransform: 'uppercase',
            fontFamily: 'Montserrat-Bold',
            fontSize: 30
        },
        boxInputSaldo: {
            width: 275,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 24,
            // backgroundColor: 'yellow'
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
        },
        inputDistance: {
            width: 100,
            height: 42,
            borderColor: '#B3B3B3',
            borderWidth: 2,
            borderRadius: 15,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 28
        },
        flatlist: {
            flex: 1,
            width: '100%',
            height: '100%'
            // backgroundColor: 'blue'
        },
        // containerCurso: {
        //     width: '100%',
        //     height: 500,
        //     // backgroundColor: 'blue',
        //     // marginBottom: '1%',
        //     marginBottom: 20
        // },
        boxCurso: {
            width: 480,
            // backgroundColor: 'pink',
            borderWidth: 2,
            borderColor: '#B3B3B3',
            borderTopWidth: 0,
            borderRadius: 10,
            // marginBottom: 20
        },
        boxImgCurso: {
            alignItems: 'center',
        },
        imgCurso: {
            width: '100%',
            height: 100,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            // backgroundColor: 'red',
        },
        imgDesconto: {
            width: '100%',
            height: 175,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            // backgroundColor: 'red',
        },
        containerCard: {
            // backgroundColor: 'green',
            marginBottom: 24
        },
        boxTituloCurso: {
            marginLeft: 16
        },
        textTituloCurso: {
            fontSize: 20,
            fontFamily: 'Montserrat-Medium',
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
        boxPrecoFavoritoDesconto: {
            height: 40,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 16,
            marginBottom: 10,
            marginLeft: 16
        },
        boxDados: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: 8,
            marginLeft: 16
        },
        imgDados: {
            width: 19.7,
            height: 19.8,
            marginTop: 1
        },
        textDados: {
            fontFamily: 'Quicksand-Regular',
            marginLeft: 8,
            marginBottom: 3
        },
        boxPrecoFavorito: {
            height: 40,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 16,
            marginLeft: 16,
            marginBottom: 10
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
            justifyContent: 'center',
            // backgroundColor: 'pink'
        },
        imgCoin: {
            width: 22.1,
            height: 22,
        },
        boxFavorito: {
            width: '10%',
            height: 40,
            // backgroundColor: 'pink',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '5%'
        },
        textFavoritos: {
            color: 'white'
        },
        // modalAbrir: {
        //     width: 100,
        //     height: 40,
        //     backgroundColor: '#CB334B',
        //     borderRadius: 12,
        //     alignItems: 'center',
        //     justifyContent: 'center'
        // },
        totalModal: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
            alignItems: 'center',
            justifyContent: 'center'
        },
        containerModal: {
            width: 500,
            height: '75%',
            backgroundColor: '#F2F2F2',
            borderWidth: 2,
            borderTopWidth: 0,
            borderColor: '#B3B3B3',
            // backgroundColor: 'pink',
            //borderStyle: 'dashed',
            // marginLeft: 33,
            // marginTop: 88,
            borderRadius: 10,
        },
        boxTituloModal: {
            //alignItems: 'center',
        },
        imgModalCurso: {
            width: '101.5%',
            height: 150,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
        },
        textTituloModal: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 20,
            color: '#000',
            marginTop: 24,
            marginLeft: 16
        },
        boxAvaliacaoPreco: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            // backgroundColor: 'pink',
        },
        boxAvaliacaoModal: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 8,
            marginLeft: 16,
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
            marginTop: '1%',
            marginRight: 40,
            marginLeft: '40%'
        },
        boxDadosModal: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '4%',
            marginLeft: 16,
        },
        textDadosModal: {
            width: 120,
            fontFamily: 'Quicksand-Regular',
            marginLeft: 16
        },
        boxDescricaoModal: {
            width: 300,
            marginLeft: 16,
            marginTop: 24
        },
        descricaoModal: {
            fontFamily: 'Montserrat-Medium',
            fontSize: 16,
            color: '#000',
        },
        boxVerMais: {
            height: 150
        },
        textDescricaoModal: {
            fontFamily: 'Quicksand-Regular',
            width: 280,
            height: '18%',
            fontSize: 12,
            color: '#000',
            alignItems: 'center',
            display: 'flex',
            //textAlign: 'justify',
            marginTop: 5,
        },
        boxEmpresa: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '8%'
        },
        tituloEmpresa: {
            fontFamily: 'Montserrat-Medium',
            fontSize: 14,
            color: '#000',
        },
        textEmpresa: {
            fontFamily: 'Quicksand-Regular',
            fontSize: 14,
            color: '#000',
            marginLeft: 10
        },
        boxValorInscrever: {
            height: '10%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: '3%',
        },
        boxComentarioModal: {
            marginTop: '8%',
            alignItems: 'center'
        },
        boxInscreverModal: {
            alignItems: 'center',
            marginLeft: '85%'
        },
        inscreverModal: {
            width: 150,
            height: 48,
            backgroundColor: '#4B7294',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 32,
            marginLeft: 8,
        },
        inscreverModalDisable: {
            width: 150,
            height: 48,
            backgroundColor: '#4B7294',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 32,
            marginLeft: 8,
            opacity: 0.5
        },
        textDetalhes: {
            color: 'white',
            fontFamily: 'Montserrat-Medium',
        },
        tituloAlert: {
            color: 'green'
        }
    })
}

// CELULAR
else {
    var styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        tabBar: {
            flexDirection: 'row',
            backgroundColor: '#B3B3B3',
            // marginTop: 50,
        },
        tabItem: {
            flex: 1,
            alignItems: 'center',
            padding: 16,
            backgroundColor: '#F2F2F2',
        },
        containerTab: {
            alignItems: 'center',
            marginTop: 20
        },
        containerListagem: {
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
            fontFamily: 'Montserrat-Bold',
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
        // line: {
        //     width: 30,
        //     height: 1,
        // },
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
        imgDesconto: {
            width: '100%',
            height: 175,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            // backgroundColor: 'red',
        },
        boxTituloCurso: {
            marginLeft: 16
        },
        textTituloCurso: {
            fontSize: 20,
            fontFamily: 'Montserrat-Medium',
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
            fontFamily: 'Quicksand-Regular',
            marginLeft: 8,
            marginBottom: 3
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
            backgroundColor: 'rgba(0,0,0,0.3)',
            marginBottom: 24
        },
        textSelect: {
            fontFamily: 'Montserrat-Medium',
        },
        boxPrecoFavorito: {
            height: 40,
            display: 'flex',
            flexDirection: 'row',
            marginTop: 16,
            marginLeft: 16
        },
        boxPrecoFavoritoDesconto: {
            height: 40,
            display: 'flex',
            flexDirection: 'row',
            marginTop: 34,
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
        totalModal: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
        },
        containerModal: {
            width: '83%',
            height: '81%',
            backgroundColor: '#F2F2F2',
            borderWidth: 2,
            borderTopWidth: 1,
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
            width: '100%',
            height: 150,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
        },
        textTituloModal: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 20,
            color: '#000',
            marginTop: 24,
            marginLeft: 16
        },
        boxAvaliacaoPreco: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
        },
        boxAvaliacaoModal: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 24,
            marginLeft: 16,
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
            marginTop: 24,
            marginRight: 40,
            marginLeft: 64
        },
        boxDadosModal: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 16,
            marginLeft: 24,
        },
        textDadosModal: {
            width: 120,
            fontFamily: 'Quicksand-Regular',
            marginLeft: 16
        },
        boxDescricaoModal: {
            width: 300,
            marginLeft: 16,
            marginTop: 24
        },
        descricaoModal: {
            fontFamily: 'Montserrat-Medium',
            fontSize: 16,
            color: '#000',
        },
        boxVerMais: {
            height: 150
        },
        textDescricaoModal: {
            fontFamily: 'Quicksand-Regular',
            width: 280,
            height: '18%',
            fontSize: 12,
            color: '#000',
            alignItems: 'center',
            display: 'flex',
            //textAlign: 'justify',
            marginTop: 5,
        },
        boxEmpresa: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '38%'
        },
        tituloEmpresa: {
            fontFamily: 'Montserrat-Medium',
            fontSize: 14,
            color: '#000',
        },
        textEmpresa: {
            fontFamily: 'Quicksand-Regular',
            fontSize: 14,
            color: '#000',
            marginLeft: 10
        },
        boxValorInscrever: {
            height: '10%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: '5%',
        },
        boxComentarioModal: {
            marginTop: '8%',
            alignItems: 'center'
        },
        boxInscreverModal: {
            alignItems: 'center',
            marginLeft: 80
        },
        inscreverModal: {
            width: 150,
            height: 48,
            backgroundColor: '#1D438A',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 32,
            marginLeft: 8,
        },
        inscreverModalDisable: {
            width: 150,
            height: 48,
            backgroundColor: '#1D438A',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 32,
            marginLeft: 8,
            opacity: 0.5
        },
        textDetalhes: {
            color: 'white',
            fontFamily: 'Montserrat-Medium',
        },
        tituloAlert: {
            color: 'green'
        }
    });
}