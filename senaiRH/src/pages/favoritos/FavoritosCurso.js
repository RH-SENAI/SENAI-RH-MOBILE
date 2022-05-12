import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, Image, Pressable } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Constants } from 'expo';

const FirstRoute = () => (
    <View style={styles.containerListagem}>
        <View style={styles.boxLogoHeader}>
            <Image source={require('../../../assets/imgGP2/logo_2S.png')} />
        </View>

        <View style={styles.boxTituloPrincipal}>
            <Text style={styles.textTituloPrincipal}>favoritos</Text>
        </View>
        <View style={styles.boxSaldoUsuario}>
            <Image style={styles.imgCoin} source={require('../../../assets/imgGP2/cash.png')} />
            {/* <Text style={styles.textDados}>{this.state.saldoUsuario}</Text> */}
        </View>
    </View>
);

const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

// This is our placeholder component for the tabs
// This will be rendered when a tab isn't loaded yet
// You could also customize it to render different content depending on the route

export default class TabViewExample extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'Cursos' },
            { key: 'second', title: 'Descontos' },
        ],
    };

    _handleIndexChange = index => this.setState({ index });

    _renderLazyPlaceholder = ({ route }) => <LazyPlaceholder route={route} />;

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: FirstRoute,
                    second: SecondRoute,
                })}
                onIndexChange={this._handleIndexChange}
                initialLayout={{ width: Dimensions.get('window').width }}
                style={styles.container}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
    },
    scene: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    textSelect: {
        fontFamily: 'Montserrat-Medium',
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
        marginTop: 165
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
        marginTop: 24,
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
        marginTop: 24,
        marginLeft: 8
    },
    textDetalhes: {
        color: 'white',
        fontFamily: 'Montserrat-Medium',
    },
    tituloAlert: {
        color: 'green'
    }
});
