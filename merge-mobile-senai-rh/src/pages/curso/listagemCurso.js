import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    Pressable,
    Image,
    FlatList,
    ScrollView,
    TextInput,
    RefreshControl,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Component } from 'react/cjs/react.production.min';
// import { AppRegistry, TextInput } from 'react-native-web';
import ExplodingHeart from 'react-native-exploding-heart';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AwesomeAlert from 'react-native-awesome-alerts';
import ReadMore from 'react-native-read-more-text';
import api from '../../services/apiGp2.js';
import apiGp1 from '../../services/apiGp1.js';
import apiMaps from '../../services/apiMaps.js';
import * as Location from 'expo-location';
import moment from 'moment';
const delay = require('delay');
// import { Location, Permissions } from 'expo';

export default class ListagemCurso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Userlatitude: null,
            Userlongitude: null,
            errorMessage: '',
            modalVisivel: false,
            isFavorite: true,
            inscrito: '',
            showAlert: false,
            refreshing: false,
            desabilitado: false,
            verifyRegistro: false,
            contadorCurso: 0,
            saldoUsuario: 0,
            distanceUser: 0,
            switch: false,
            empresaBuscada: '',
            largura: 0,
            altura: 0,
            listaCurso: [],
            cursoBuscado: {},
            localizacaoCurso: [],
            listaFavoritosCoracao: []
        };
    }
    ProcurarFavorito = async (id) => {
        try {
            const resposta = await api('/FavoritosCursos/' + id);
            // console.warn(resposta)
            if (resposta.status == 200) {
                this.setState({ cursoFavoritoBuscado: resposta.data });
                // console.warn(this.state.cursoBuscado)
            }
        } catch (erro) {
            console.warn(erro);
        }
    }

    ProcurarCurso = async (id) => {
        try {
            const resposta = await api('/Cursos/' + id);
            // console.warn(resposta)
            if (resposta.status == 200) {
                this.setState({ cursoBuscado: resposta.data });
                this.setState({ empresaBuscada: this.state.cursoBuscado.idEmpresaNavigation.idLocalizacaoNavigation.idEstadoNavigation.nomeEstado })
                // console.log(this.state.cursoBuscado)
            }
        }
        catch (erro) {
            console.warn(erro);
        }
    }

    SaldoUsuario = async () => {
        const idUser = await AsyncStorage.getItem('idUsuario');
        console.log(idUser)
        const resposta = await apiGp1(`/Usuarios/BuscarUsuario/${idUser}`)
        if (resposta.status == 200) {
            var dadosUsuario = resposta.data
            console.log(dadosUsuario);
            this.setState({ saldoUsuario: dadosUsuario.saldoMoeda })
        }
    }

    GetLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            console.log('A permissão de localização não foi aceita!');

            this.setState({
                errorMessage: 'A permissão de localização não foi aceita'
            })

            return;
        }
        // console.warn(status)
        let location = await Location.getCurrentPositionAsync({});

        // console.warn(location)

        let stringLocal = JSON.stringify(location);
        let obj = JSON.parse(stringLocal);
        let longitude = obj['coords']['longitude'];
        let latitude = obj['coords']['latitude'];

        // console.warn(longitude)
        // console.warn(latitude)
        this.setState({ Userlatitude: longitude })
        this.setState({ Userlongitude: latitude })

        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;

        console.log("A MINHA ALTURA É: " + windowHeight)
        console.log("A MINHA LARGURA É: " + windowWidth)
        // var text = JSON.stringify(this.state.location)
        // console.warn(text) 
    }

    Favoritar = async (favorite, id) => {
        try {
            if (favorite == true) {
                this.ProcurarCurso(id);
                await delay(2000);

                //Id usuário
                const idUser = await AsyncStorage.getItem('idUsuario');

                //Requisição favoritos pelo id do usuário
                const respostaFavoritos = await api('/FavoritosCursos/Favorito/' + idUser)
                var dadosFavoritos = respostaFavoritos.data
                // this.setState({ listaFavoritosCoracao: dadosFavoritos })

                //Tamanho do json do respostaFavoritos
                var tamanhoJson = Object.keys(dadosFavoritos).length;
                console.warn(tamanhoJson)
                var p = 0;

                do {
                    console.warn(p)
                    let stringFavoritos = JSON.stringify(dadosFavoritos);
                    var objFavoritos = JSON.parse(stringFavoritos);
                    console.warn(objFavoritos);

                    if (objFavoritos != '') {

                        var cursoId = objFavoritos[p]['idCurso'];
                        let favoritoId = objFavoritos[p]['idCursoFavorito'];
                        console.warn(cursoId);

                        if (cursoId == id) {
                            const respostaExcluir = await api.delete(`/FavoritosCursos/deletar/${favoritoId}`);
                            var verifyDelete = respostaExcluir.status;

                            if (respostaExcluir.status == 204) {
                                this.setState(!this.state.isFavorite);
                                this.setState({ cursoFavoritoBuscado: [] });
                                this.setState({ isFavorite: false })
                                console.warn('Desfavoritado');
                            }
                        }
                        p++
                    }
                    else {
                        console.warn("Está vazio!")
                    }
                } while (p < tamanhoJson);
                if (verifyDelete != 204) {
                    // console.warn("CHEGOU")
                    if (cursoId != id) {
                        const respostaCadastro = await api.post('/FavoritosCursos', {
                            idCurso: this.state.cursoBuscado.idCurso,
                            idUsuario: idUser,
                        });

                        if (respostaCadastro.status == 201) {
                            this.setState({ isFavorite: favorite });
                            console.warn('Favorito adicionado');
                            this.setState({ cursoFavoritoBuscado: [] });
                            console.warn(this.state.isFavorite);
                        }
                    }
                }
            }
        } catch (error) {
            console.warn(error);
        }
    }

    ListarCurso = async () => {
        try {
            var distanceBase = 150000;
            if (this.state.distanceUser != 0) {
                distanceBase = this.state.distanceUser * 1000
            }

            const resposta = await api('/Cursos');

            if (resposta.status == 200) {
                const dadosCurso = resposta.data;
                // console.warn(dadosCurso)
                var tamanhoJson = Object.keys(dadosCurso).length;
                // console.warn(tamanhoJson);

                var i = 0

                do {
                    let stringLocalCurso = JSON.stringify(dadosCurso);
                    let objLocalCurso = JSON.parse(stringLocalCurso);
                    // console.warn(objLocalCurso);
                    var localCurso = objLocalCurso[i]['idEmpresaNavigation']['idLocalizacaoNavigation']['idCepNavigation'].cep1

                    // ----> Localização 

                    var stringProblematica = `/json?origins=${this.state.Userlongitude}, ${this.state.Userlatitude}&destinations=${localCurso}&units=km&key=AIzaSyB7gPGvYozarJEWUaqmqLiV5rRYU37_TT0`
                    // console.warn(stringProblematica)

                    const respostaLocal = await apiMaps(stringProblematica);
                    let string = JSON.stringify(respostaLocal.data);
                    let obj = JSON.parse(string);
                    // console.warn(obj)

                    let distance = obj['rows'][0]['elements'][0]['distance'].value
                    // console.log(distance)
                    if (respostaLocal.status == 200) {
                        // console.warn('Localização encontrada!');
                        if (distance <= distanceBase) {
                            console.warn(distance);
                            //this.setState({ localizacaoCurso: dadosLocalizacao })
                            // console.warn(distance);
                            // console.warn('Localização está no alcance');
                            // console.warn(this.state.listaCurso);

                            let stringCurso = JSON.stringify(dadosCurso);
                            var objCurso = JSON.parse(stringCurso);
                            //var lugarCurso = objCurso[u]['idEmpresaNavigation']['idLocalizacaoNavigation']['idCepNavigation'].cep1

                            var curso = objCurso[i]
                            // console.warn(curso)
                            this.state.listaCurso.push(curso);

                        }
                        else if (distance > distanceBase) {
                            console.warn(distance);
                            console.warn('Localização fora do alcance');
                        }
                    }
                    // console.warn('Curso encontrado');

                    i++
                } while (i < tamanhoJson);
                // console.warn(i)

                // console.warn(this.state.listaCurso)
                if (this.state.listaCurso == '') {
                    this.setState({ switch: true })
                }
                else {
                    this.setState({ switch: false })
                }

                this.setState({ contadorCurso: i })
                this.verifyCoracao();
                // console.warn(this.state.contadorCurso)
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

    setModalVisivel = async (visible, id) => {
        if (visible == true) {
            this.ProcurarCurso(id);
            await delay(750);
            this.verifySaldo(this.state.cursoBuscado.valorCurso);
            this.verifySituacao(id);
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
        // await delay(200)
        // this.setState({ modalVisivel: visible })
    }

    verifySituacao = async (id) => {
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

    setSituacao = () => {
        if (this.state.verifyRegistro == true) {
            return 'Inscrito'
        }
        else {
            return 'Inscreva-se'
        }
    }

    showAlert = async (id) => {
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
        if (item == true) {
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

    wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    onRefresh = async () => {
        this.setState({ refreshing: true });
        this.setState({ listaCurso: [] })
        this.setState({ verifyCoracao: [] })
        this.wait(2000).then(() => this.setState({ refreshing: false }));
        this.ListarCurso();
    };

    verifyList = () => {
        if (this.state.switch == true) {
            console.warn('Cheguei bao');
            return (
                <View style={styles.containerRefresh}>
                    <Text style={styles.verify}>Sem cursos nesse raio de alcance!</Text>
                    <Pressable style={styles.boxRefresh} onPress={() => this.onRefresh()}>
                        <Text style={styles.textRefresh}>Refresh</Text>
                    </Pressable>
                </View>
            )
        }
    }

    verifyCoracao = async () => {
        const idUser = await AsyncStorage.getItem('idUsuario');

        const respostaFavoritos = await api('/FavoritosCursos/Favorito/' + idUser)
        var dadosVerifyFavoritos = respostaFavoritos.data
        this.setState({ listaFavoritosCoracao: dadosVerifyFavoritos })
        console.warn(this.state.listaFavoritosCoracao)
    }

    componentDidMount = async () => {
        this.GetLocation();
        await delay(2000);
        this.SaldoUsuario();
        await delay(3000);

        this.ListarCurso();
        // await delay(2000);
    }

    render() {
        return (
            <View style={styles.containerListagem}>
                <View style={styles.boxLogoHeader}>
                    <Image source={require('../../../assets/img-geral/logo_2S.png')} />
                </View>

                <View style={styles.boxTituloPrincipal}>
                    <Text style={styles.textTituloPrincipal}>cursos</Text>
                </View>
                <View style={styles.boxInputSaldo}>
                    <View style={styles.boxSaldoUsuario}>
                        <Image style={styles.imgCoin} source={require('../../../assets/img-gp2/cash.png')} />
                        <Text style={styles.textDados}>{this.state.saldoUsuario}</Text>
                    </View>
                    <TextInput
                        style={styles.inputDistance}
                        onChangeText={distanceUser => this.setState({ distanceUser })}
                        placeholder="150 km"
                        placeholderTextColor="#B3B3B3"
                        keyboardType="numeric"
                        maxLength={3}
                    />
                </View>

                {this.verifyList()}

                <FlatList
                    style={styles.flatlist}
                    data={this.state.listaCurso}
                    keyExtractor={item => item.idCurso}
                    renderItem={this.renderItem}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                />
            </View>
        );
    }
    renderItem = ({ item }) => (
        <View>
            {/* <View style={styles.containerCurso}> */}
            {/* item.idEmpresaNavigation.idLocalizacaoNavigation.idLogradouroNavigation.nomeLogradouro */}
            {/* Localizacao(this.state.Userlatitude, this.state.Userlongitude, item.idEmpresaNavigation.idLocalizacaoNavigation.idCepNavigation.cep1 */}
            <Pressable onPress={() => this.setModalVisivel(true, item.idCurso)}>
                <View style={styles.boxCurso}>
                    <View style={styles.boxImgCurso}>
                        <Image style={styles.imgCurso} source={{ uri: `https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples-grp2/${item.caminhoImagemCurso}` }} resizeMode='cover' />
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
                            size={20} />
                        {/* <View>
                                <Image style={styles.imgDistancia} source={require('../../../assets/imgGP2/walk.png')} />
                                <Text>{}</Text>
                            </View> */}
                    </View>

                    <View style={styles.boxDadosCurso}>
                        <View style={styles.boxDados}>
                            <Image style={styles.imgDados} source={require('../../../assets/img-gp2/relogio.png')} />
                            <Text style={styles.textDados}>{item.cargaHoraria} horas</Text>
                        </View>

                        <View style={styles.boxDados}>
                            <Image style={styles.imgDados} source={require('../../../assets/img-gp2/local.png')} />
                            <Text style={styles.textDados}>{this.modalidade(item.modalidadeCurso)}</Text>
                        </View>
                    </View>

                    <View style={styles.boxPrecoFavorito}>
                        <View style={styles.boxPreco}>
                            <Image style={styles.imgCoin} source={require('../../../assets/img-gp2/cash.png')} />
                            <Text style={styles.textDados}>{item.valorCurso}</Text>
                        </View>

                        <View style={styles.boxFavorito}>
                            <Pressable onPress={() => this.Favoritar(true, item.idCurso)}>
                                {/* <Text style={styles.textFavoritos}>Favoritar</Text> */}
                                {/* <Heart isActive={listaFavoritosDescontos.some(l => { if (l.idDesconto == beneficio.idDesconto) { return true } return false })} onClick={() => { favoritar(!favorito, beneficio.idDesconto) }} /> */}
                                <ExplodingHeart width={80} status={this.state.listaFavoritosCoracao.some(l => { if (l.idCurso == item.idCurso) { return true } return false })} onChange={() => this.Favoritar(true, item.idCurso)} />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Pressable>

            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisivel}
                // key={item.idCurso == this.state.cursoBuscado.idCurso}
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
                                        <Image style={styles.imgModalCurso} source={{ uri: `https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples-grp2/${this.state.cursoBuscado.caminhoImagemCurso}` }} />
                                    </View>
                                    <Text style={styles.textTituloModal}>{this.state.cursoBuscado.nomeCurso}</Text>
                                </View>

                                <View style={styles.boxAvaliacaoPreco}>
                                    <View style={styles.boxAvaliacaoModal}>
                                        <AirbnbRating
                                            count={5}
                                            //starImage={star}
                                            showRating={false}
                                            selectedColor={'#C20004'}
                                            defaultRating={this.state.cursoBuscado.mediaAvaliacaoDesconto}
                                            isDisabled={true}
                                            size={20}
                                        />
                                    </View>
                                    <View style={styles.boxPrecoModal}>
                                        <Image style={styles.imgCoin} source={require('../../../assets/img-gp2/cash.png')} />
                                        <Text style={styles.textDados}>{this.state.cursoBuscado.valorCurso}</Text>
                                    </View>
                                </View>

                                <View style={styles.boxDadosModal}>
                                    <Image source={require('../../../assets/img-gp2/relogio.png')} />
                                    <Text style={styles.textDadosModal}>{this.state.cursoBuscado.cargaHoraria}</Text>

                                    <Image source={require('../../../assets/img-gp2/mapa.png')} />
                                    <Text style={styles.textDadosModal}>{this.state.empresaBuscada}</Text>
                                </View>

                                <View style={styles.boxDadosModal}>
                                    <Image source={require('../../../assets/img-gp2/local.png')} />
                                    <Text style={styles.textDadosModal}>{this.modalidade(this.state.cursoBuscado.modalidadeCurso)}</Text>

                                    <Image source={require('../../../assets/img-gp2/dataFinal.png')} />
                                    <Text style={styles.textDadosModal}>
                                        {moment(this.state.cursoBuscado.dataFinalizacao).format('LL')}
                                    </Text>
                                </View>

                                <View style={styles.boxDescricaoModal}>
                                    <Text style={styles.descricaoModal}>Descrição:</Text>
                                    <View style={styles.boxVerMais}>
                                        <ReadMore
                                            numberOfLines={3}
                                            renderTruncatedFooter={this._renderTruncatedFooter}
                                            renderRevealedFooter={this._renderRevealedFooter}
                                            onReady={this._handleTextReady}
                                        >
                                            <Text style={styles.textDescricaoModal}>{this.state.cursoBuscado.descricaoCurso}</Text>
                                        </ReadMore>
                                    </View>

                                    <View style={styles.boxEmpresa}>
                                        <Text style={styles.tituloEmpresa}>Empresa: </Text>
                                        {/* <Text style={styles.textEmpresa}>{this.state.cursoBuscado.idEmpresaNavigation.nomeEmpresa}</Text> */}
                                    </View>

                                    <View style={styles.boxValorInscrever}>
                                        <View style={styles.boxComentarioModal}>
                                            <Pressable onPress={() => this.RedirecionarComentario()}>
                                                <Image source={require('../../../assets/img-gp2/comentario.png')} />
                                            </Pressable>
                                        </View>

                                        <View style={styles.boxInscreverModal}>
                                            <TouchableOpacity style={this.state.desabilitado ? styles.inscreverModalDisable : styles.inscreverModal} activeOpacity={this.state.desabilitado ? 1 : 0.1} disabled={this.state.desabilitado} onPress={() => { this.showAlert(this.state.cursoBuscado.idCurso) }} >
                                                <Text style={styles.textDetalhes}>{this.setSituacao()}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <AwesomeAlert
                                        show={this.state.showAlert}
                                        showProgress={false}
                                        title="Sucesso"
                                        titleStyle={styles.tituloAlert}
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
}
if (Dimensions.get('window').width > 700) {
    var styles = StyleSheet.create({
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
            marginTop: 24,
            marginBottom: 24
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
            width: '75%',
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
            // backgroundColor: 'pink',
            borderWidth: 2,
            borderColor: '#B3B3B3',
            borderTopWidth: 0,
            borderRadius: 10,
            marginBottom: 20
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
            backgroundColor: 'pink',
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
            marginTop: 16,
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
            marginTop: '10%'
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
            marginLeft: '85%'
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
    })
}

// CELULAR
else {
    var styles = StyleSheet.create({
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
            marginTop: 24,
            marginBottom: 24
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
            width: '75%',
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
            // backgroundColor: 'pink',
            borderWidth: 2,
            borderColor: '#B3B3B3',
            borderTopWidth: 0,
            borderRadius: 10,
            marginBottom: 20
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
            width: '100%',
            height: '90%',
            backgroundColor: '#F2F2F2',
            borderWidth: 2,
            borderTopWidth: 0,
            borderColor: '#B3B3B3',
            backgroundColor: 'pink',
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
            height: 100,
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
            backgroundColor: 'pink'
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
            marginTop: 32
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
            marginRight: 40
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
    })
}