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
    TouchableOpacity
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Component } from 'react/cjs/react.production.min';
import { AppRegistry } from 'react-native-web';
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

export default class ListagemDesconto extends Component {
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
            refreshing: false,
            desabilitado: false,
            verifyRegistro: false,
            contadorDesconto: 0,
            saldoUsuario: 0,
            distanceUser: 0,
            switch: false,
            empresaBuscada: '',
            listaDesconto: [],
            descontoBuscado: {},
        };
    }

    ProcurarDescontos = async (id) => {
        try {
            const resposta = await api('/Descontos/' + id);
            // console.warn(resposta)
            if (resposta.status == 200) {
                this.setState({ descontoBuscado: resposta.data });
                console.warn(this.state.descontoBuscado)
                this.setState({ empresaBuscada: this.state.descontoBuscado.idEmpresaNavigation.idLocalizacaoNavigation.idEstadoNavigation.nomeEstado })
                
                // console.warn(this.state.cursoBuscado)
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
        // var text = JSON.stringify(this.state.location)
        // console.warn(text) 
    }

    ListarDescontos = async () => {
        try {
            var distanceBase = 150000;
            if (this.state.distanceUser != 0) {
                distanceBase = this.state.distanceUser * 1000
            }

            const resposta = await api('/Descontos');

            if (resposta.status == 200) {
                const dadosDesconto = resposta.data;
                console.warn(dadosDesconto)
                var tamanhoJson = Object.keys(dadosDesconto).length;
                console.warn(tamanhoJson);

                var i = 0

                do {
                    let stringLocalDesconto = JSON.stringify(dadosDesconto);
                    let objLocalDesconto = JSON.parse(stringLocalDesconto);
                    // console.warn(objLocalDesconto);
                    var localDesconto = objLocalDesconto[i]['idEmpresaNavigation']['idLocalizacaoNavigation']['idCepNavigation'].cep1

                    // ----> Localização 

                    var stringProblematica = `/json?origins=${this.state.Userlongitude}, ${this.state.Userlatitude}&destinations=${localDesconto}&units=km&key=AIzaSyB7gPGvYozarJEWUaqmqLiV5rRYU37_TT0`
                    console.warn(stringProblematica)

                    const respostaLocal = await apiMaps(stringProblematica);
                    let string = JSON.stringify(respostaLocal.data);
                    let obj = JSON.parse(string);
                    console.warn(respostaLocal)

                    let distance = obj['rows'][0]['elements'][0]['distance'].value
                    console.log(distance)
                    if (respostaLocal.status == 200) {
                        // console.warn('Localização encontrada!');
                        if (distance <= distanceBase) {
                            //this.setState({ localizacaoCurso: dadosLocalizacao })
                            // console.warn(distance);
                            // console.warn('Localização está no alcance');
                            // console.warn(this.state.listaCurso);

                            let stringDesconto = JSON.stringify(dadosDesconto);
                            var objDesconto = JSON.parse(stringDesconto);
                            //var lugarDesconto = objDesconto[u]['idEmpresaNavigation']['idLocalizacaoNavigation']['idCepNavigation'].cep1
                            // console.warn(lugarDesconto)

                            var desconto = objDesconto[i]
                            // console.warn(desconto)

                            this.state.listaDesconto.push(desconto);
                        }
                        else if (distance > distanceBase) {
                            console.warn(distance);
                            console.warn('Localização fora do alcance');
                        }
                    }
                    // console.warn('Desconto encontrado');

                    i++
                } while (i < tamanhoJson);
                // console.warn(i)

                if (this.state.listaCurso == '') {
                    this.setState({ switch: true })
                }
                else {
                    this.setState({ switch: false })
                }

                this.setState({ contadorDesconto: i })
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
        // await delay(200)
        // this.setState({ modalVisivel: visible })
    }

    // componentWillUnmount = () => {
    //     this.ListarCurso();
    // }

    setSituacao = () => {
        if (this.state.verifyRegistro == true) {
            return this.state.descontoBuscado.numeroCupom
        }
        else {
            return 'Pegue'
        }
    }

    verifySituacao = async (id) => {
        try {
            const idUser = await AsyncStorage.getItem('idUsuario');
            console.warn(idUser)
            console.warn(id)

            const respostaBuscar = await api(`/Registrodescontos/RegistroDescontos/IdUsuario/${idUser}`);

            var tamanhoJsonRegistro = Object.keys(respostaBuscar.data).length;

            let stringRegistros = JSON.stringify(respostaBuscar.data);
            var objRegistros = JSON.parse(stringRegistros);

            var k = 0;
            do {
                if (objRegistros != '') {
                    var registroId = objRegistros[k]['idDesconto'];

                    if (registroId == id) {
                        this.setState({ verifyRegistro: true })
                        this.setState({ desabilitado: true });
                        console.warn("Curso já comprado!");
                    }
                }
                else {
                    console.warn("Está vazio!")
                }
                k++
            } while (k < tamanhoJsonRegistro);

        } catch (error) {
            console.log(error)
        }
    }

    showAlert = async (id) => {
        try {
            const idUser = await AsyncStorage.getItem('idUsuario');
            console.warn(idUser)
            console.warn(id)

            const respostaBuscar = await api(`/Registrodescontos/RegistroDescontos/IdUsuario/${idUser}`);

            var tamanhoJsonRegistro = Object.keys(respostaBuscar.data).length;

            let stringRegistros = JSON.stringify(respostaBuscar.data);
            var objRegistros = JSON.parse(stringRegistros);

            var k = 0;
            do {
                if (objRegistros != '') {
                    var registroId = objRegistros[k]['idDesconto'];

                    if (registroId == id) {
                        // this.setState({ verifyRegistro: true })
                        console.warn("Desconto já pego!")
                        // this.setSituacao();
                    }
                }
                else {
                    console.warn("Está vazio!")
                }
                k++
            } while (k < tamanhoJsonRegistro);

            if (this.state.verifyRegistro != true) {
                const resposta = await api.post('/Registrodescontos/Cadastrar', {
                    idDesconto: id,
                    idUsuario: idUser,
                    idSituacaoAtividade: 1,
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
        this.wait(2000).then(() => this.setState({ refreshing: false }));
        this.setState({ listaDesconto: [] })
        this.ListarDescontos();
    };

    RedirecionarComentario = () => {
        this.setState({ modalVisivel: false })
        this.props.navigation.navigate('ComentarioDesconto')
    }

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

    componentDidMount = async () => {
        this.GetLocation();
        this.SaldoUsuario();
        await delay(3000);
        // setTimeout(function(){this.setState({ timeGeolocation: true})}, 1000);
        this.ListarDescontos();
    }

    render() {
        return (
            <View style={styles.containerListagem}>
                <View style={styles.boxLogoHeader}>
                    <Image source={require('../../../assets/img-geral/logo_2S.png')} />
                </View>

                <View style={styles.boxTituloPrincipal}>
                    <Text style={styles.textTituloPrincipal}>descontos</Text>
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
                    data={this.state.listaDesconto}
                    keyExtractor={item => item.idDesconto}
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
            <View style={styles.containerCurso}>
                {/* item.idEmpresaNavigation.idLocalizacaoNavigation.idLogradouroNavigation.nomeLogradouro */}
                {/* Localizacao(this.state.Userlatitude, this.state.Userlongitude, item.idEmpresaNavigation.idLocalizacaoNavigation.idCepNavigation.cep1 */}
                <Pressable onPress={() => this.setModalVisivel(true, item.idDesconto)}>
                    <View style={styles.boxCurso}>
                        <View style={styles.boxImgCurso}>
                            <Image style={styles.imgCurso} source={{ uri: `https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples-grp2/${item.caminhoImagemDesconto}` }} resizeMode="stretch" />
                        </View>

                        <View style={styles.boxTituloCurso}>
                            <Text style={styles.textTituloCurso}>{item.nomeDesconto}</Text>
                        </View>

                        <View style={styles.boxAvaliacao}>
                            <AirbnbRating
                                count={5}
                                //starImage={star}
                                showRating={false}
                                selectedColor={'#C20004'}
                                defaultRating={item.mediaAvaliacaoDesconto}
                                isDisabled={true}
                                size={20} />
                        </View>

                        <View style={styles.boxPrecoFavorito}>
                            <View style={styles.boxPreco}>
                                <Image style={styles.imgCoin} source={require('../../../assets/img-gp2/cash.png')} />
                                <Text style={styles.textDados}>{item.valorDesconto}</Text>
                            </View>

                            <View style={styles.boxFavorito}>
                                {/* <Pressable onPress={this.Favoritar(item.idCurso)}> */}
                                <ExplodingHeart width={80} status={this.state.isFavorite} onClick={() => this.setState(!isFavorite)} onChange={(ev) => console.log(ev)} />
                                {/* </Pressable> */}
                            </View>
                        </View>
                    </View>
                </Pressable>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisivel}
                    // key={item.idDesconto == this.state.descontoBuscado.idDesconto}
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
                                            <Image style={styles.imgModalCurso} source={{ uri: `https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples-grp2/${this.state.descontoBuscado.caminhoImagemDesconto}` }} resizeMode="stretch" />
                                        </View>
                                        <Text style={styles.textTituloModal}>{this.state.descontoBuscado.nomeDesconto}</Text>
                                    </View>

                                    <View style={styles.boxAvaliacaoPreco}>
                                        <View style={styles.boxAvaliacaoModal}>
                                            <AirbnbRating
                                                count={5}
                                                //starImage={star}
                                                showRating={false}
                                                selectedColor={'#C20004'}
                                                defaultRating={this.state.descontoBuscado.mediaAvaliacaoDesconto}
                                                isDisabled={true}
                                                size={20}
                                            />
                                        </View>
                                        <View style={styles.boxPrecoModal}>
                                            <Image style={styles.imgCoin} source={require('../../../assets/img-gp2/cash.png')} />
                                            <Text style={styles.textDados}>{this.state.descontoBuscado.valorDesconto}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.boxDadosModal}>
                                        <Image source={require('../../../assets/img-gp2/dataFinal.png')} />
                                        <Text style={styles.textDadosModal}>
                                            {moment(item.validadeDesconto).format('LL')}
                                        </Text>

                                        <Image source={require('../../../assets/img-gp2/mapa.png')} />
                                        <Text style={styles.textDadosModal}>{this.state.empresaBuscada}</Text>
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
                                            <Text style={styles.textDescricaoModal}>{this.state.descontoBuscado.descricaoDesconto}</Text>
                                        </ReadMore>

                                        <View style={styles.boxEmpresa}>
                                            <Text style={styles.tituloEmpresa}>Empresa: </Text>
                                            <Text style={styles.textEmpresa}>{item.idEmpresaNavigation.nomeEmpresa}</Text>
                                        </View>

                                        <View style={styles.boxValorInscrever}>
                                            <View style={styles.boxComentarioModal}>
                                                <Pressable onPress={() => this.RedirecionarComentario()}>
                                                    <Image source={require('../../../assets/img-gp2/comentario.png')} />
                                                </Pressable>
                                            </View>

                                            <View style={styles.boxInscreverModal}>
                                                <TouchableOpacity style={this.state.desabilitado ? styles.inscreverModalDisable : styles.inscreverModal} activeOpacity={this.state.desabilitado ? 1 : 0.1} disabled={this.state.desabilitado} onPress={() => { this.showAlert(this.state.descontoBuscado.idDesconto) }} >
                                                    <Text style={styles.textDetalhes}>{this.setSituacao()}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <AwesomeAlert
                                            style={styles.bao}
                                            show={this.state.showAlert}
                                            showProgress={false}
                                            title="Sucesso"
                                            titleStyle={styles.tituloAlert}
                                            message="Você resgatou o desconto! O código é "
                                            messageStyle={styles.textAlert}
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
        marginBottom: 24
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
        height: 125,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
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
        marginTop: 35,
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
        width: '75%',
        height: '70%',
        marginLeft: 16,
        marginTop: 24
    },
    descricaoModal: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        color: '#000',
    },
    boxVerMais: {
        // height: '10%'
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
        marginTop: '13%',
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