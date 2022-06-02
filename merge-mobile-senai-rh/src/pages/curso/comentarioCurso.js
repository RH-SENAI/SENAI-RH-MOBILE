import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Image,
    FlatList,
    TextInput,
    ScrollView,
    Dimensions
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Component } from 'react/cjs/react.production.min';
import { Rating, AirbnbRating } from 'react-native-ratings';
import api from '../../services/apiGp2';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default class ComentarioCurso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            showAlert: false,
            notaCurso: 0,
            comentario: '',
            listaCurso: [],
            listaComentario: [],
            cursoBuscado: [],
            listaComentarioBuscado: [],
        };
    }

    ListaComentarios = async () => {
        try {
            let id = await AsyncStorage.getItem('cursoId')
            const resposta = await api('/ComentarioCursos/Comentario/' + id);

            if (resposta.status == 200) {
                const dadosComentarios = await resposta.data;
                var stringComentarioBuscado = JSON.stringify(dadosComentarios);
                let objComentarioBuscado = JSON.parse(stringComentarioBuscado);
                this.setState({ listaComentarioBuscado: objComentarioBuscado });
                console.warn(this.state.listaComentarioBuscado)
            }
        } catch (erro) {
            console.warn(erro);
        }
    }

    CadastrarComentario = async () => {
        try {
            let id = await AsyncStorage.getItem('cursoId')
            let idUser = await AsyncStorage.getItem('idUsuario');
            const resposta = await api.post('/ComentarioCursos', {
                idCurso: id,
                idUsuario: idUser,
                avaliacaoComentario: this.state.notaCurso,
                comentarioCurso1: this.state.comentario,
            });

            if (resposta.status == 201) {
                this.ListaComentarios();
                this.setState({ notaCurso: 0 })
            }
        } catch (erro) {
            console.warn(erro);
        }
    }

    avaliacaoCurso = (rating) => {
        this.setState({ notaCurso: rating })
    }

    componentDidMount = () => {
        // setTimeout(function(){this.setState({ timeGeolocation: true})}, 1000);
        this.ListaComentarios();
    }

    render() {
        return (
            <View style={styles.comentarios}>
                <View style={styles.boxComentarioSair}>
                    <View style={styles.boxLogoHeader}>
                        <Image source={require('../../../assets/img-geral/logo_2S.png')} />
                    </View>
                    <View style={styles.boxTituloComentario}>
                        <Text style={styles.tituloComentario}>Comentarios:</Text>
                    </View>

                    <Pressable style={styles.boxVoltar} onPress={() => this.props.navigation.navigate('mainVantagem')}>
                        <AntDesign name="leftcircleo" size={40} color="#4B7294" />
                    </Pressable>
                </View>

                <FlatList
                    style={styles.flatlist}
                    data={this.state.listaComentarioBuscado}
                    keyExtractor={item => item.idComentarioDesconto}
                    renderItem={this.renderItem}
                />

                <View style={styles.boxComentar}>
                    <View style={styles.boxComentarAvaliacao}>
                        <View style={styles.boxAvaliacao}>
                            <AirbnbRating
                                count={5}
                                showRating={false}
                                selectedColor={'#4B7294'}
                                defaultRating={0}
                                isDisabled={false}
                                onFinishRating={this.avaliacaoCurso}
                                size={20}
                            />
                        </View>
                        <TextInput
                            style={styles.inputBox}
                            placeholder="Comente"
                            keyboardType="default"
                            placeholderTextColor="#B3B3B3"
                            onChangeText={comentario => this.setState({ comentario })}
                        />
                    </View>
                    <View>
                        <Pressable style={styles.btnComentar} onPress={() => this.CadastrarComentario()}>
                            <Feather name="send" size={32} color="#4B7294" />
                        </Pressable>
                    </View>
                </View>
            </View>
        );
    }
    renderItem = ({ item }) => (
        <View View style={styles.containerComentarios}>
            <View style={styles.boxComentarioEstrela}>
                {/* {this.test()} */}
                <View>
                    <View style={styles.boxTextComentario}>
                        <Text style={styles.textNome}>{item.idUsuarioNavigation.nome}: </Text>
                        <Text style={styles.textComentario}>{item.comentarioCurso1}</Text>
                    </View>
                    <View style={styles.boxAvaliado}>
                        <AirbnbRating
                            count={5}
                            showRating={false}
                            selectedColor={'#4B7294'}
                            defaultRating={item.avaliacaoDesconto}
                            isDisabled={true}
                            size={20}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}
if (Dimensions.get('window').width > 700) {
    var styles = StyleSheet.create({
        boxLogoHeader: {
            marginBottom: 50
        },
        comentarios: {
            height: '95%',
            alignItems: 'center'
        },
        boxComentarioSair: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50
        },
        boxTituloComentario: {
            marginBottom: 30,
            justifyContent: 'flex-start'
        },
        tituloComentario: {
            width: '100%',
            textTransform: 'uppercase',
            fontFamily: 'Montserrat-Bold',
            fontSize: 30,
            alignItems: 'center',
            justifyContent: 'center'
        },
        boxVoltar: {
            marginRight: '70%',
            marginBottom: '5%'
        },
        flatlist: {
            flex: 1,
            width: '75%',
            height: '100%',
            borderWidth: 2,
            borderColor: 'gray',
            borderRadius: 10,
            padding: 20
            // backgroundColor: 'pink'
        },
        boxComentar: {
            width: '75%',
            height: '10%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: '20%',
            // backgroundColor: 'gray',
            borderWidth: 2,
            borderColor: 'gray',
            borderRadius: 10
        },
        boxComentarAvaliacao: {
            // backgroundColor: 'gray',
            flexDirection: 'column',
            justifyContent: 'flex-start'
        },
        boxAvaliacao: {
            marginRight: 200
        },
        inputBox: {
            width: 300,
            height: 50,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 10,
            paddingLeft: 10,
            marginTop: 10
        },
        btnComentar: {
            width: '100%',
            height: '30%',
            marginTop: '110%',
            // backgroundColor: '#4B7294',
            // marginLeft: 50,
        },
        containerComentarios: {
            width: '100%',
            alignItems: 'center'
        },
        boxComentarioEstrela: {
            flex: 1,
            width: '100%',
            marginBottom: 30,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10
        },
        boxTextComentario: {
            flexDirection: 'row'
        },
        textNome: {
            fontSize: 14,
            fontWeight: '700',
            marginRight: 2,
            color: '#4B7294',
            marginLeft: 50,
            marginTop: 10
        },
        textComentario: {
            width: '80%',
            fontSize: 14,
            fontWeight: '700',
            marginRight: 2,
            color: 'black',
            marginLeft: 10,
            marginTop: 10
        },
        boxAvaliado: {
            marginBottom: 10,
            marginTop: 5,
            marginRight: '63%'
        },
    })
}
else {
    var styles = StyleSheet.create({
        boxLogoHeader: {
            marginBottom: 50
        },
        comentarios: {
            height: '95%',
            alignItems: 'center'
        },
        boxComentarioSair: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50
        },
        boxTituloComentario: {
            marginBottom: 30,
            justifyContent: 'flex-start'
        },
        tituloComentario: {
            width: '100%',
            textTransform: 'uppercase',
            fontFamily: 'Montserrat-Bold',
            fontSize: 30,
            alignItems: 'center',
            justifyContent: 'center'
        },
        boxVoltar: {
            marginRight: '78%',
            marginBottom: '5%'
        },
        flatlist: {
            flex: 1,
            width: '90%',
            height: '100%',
            borderWidth: 2,
            borderColor: 'gray',
            borderRadius: 10,
            padding: 20
            // backgroundColor: 'pink'
        },
        boxComentar: {
            width: '90%',
            height: '15%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: '20%',
            // backgroundColor: 'gray',
            borderWidth: 2,
            borderColor: 'gray',
            borderRadius: 10,
        },
        boxComentarAvaliacao: {
            // backgroundColor: 'gray',
            flexDirection: 'column',
            justifyContent: 'flex-start'
        },
        boxAvaliacao: {
            marginRight: 115,
            // backgroundColor: 'pink'
        },
        inputBox: {
            width: 250,
            height: '40%',
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 10,
            paddingLeft: 10,
            marginTop: 10,
            marginLeft: 15
        },
        btnComentar: {
            width: '100%',
            height: '35%',
            marginTop: '100%',
            // backgroundColor: '#4B7294',
            marginRight: 10,
        },
        containerComentarios: {
            width: '100%',
            alignItems: 'center'
        },
        boxComentarioEstrela: {
            flex: 1,
            width: '100%',
            marginBottom: 30,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10
        },
        boxTextComentario: {
            flexDirection: 'row'
        },
        textNome: {
            fontSize: 14,
            fontWeight: '700',
            fontFamily: 'Quicksand-Regular',
            marginRight: 2,
            color: '#4B7294',
            marginLeft: 30,
            marginTop: 10
        },
        textComentario: {
            width: '80%',
            fontSize: 14,
            fontFamily: 'Quicksand-Regular',
            fontWeight: '700',
            marginRight: 2,
            color: 'black',
            marginLeft: 10,
            marginTop: 10
        },
        boxAvaliado: {
            marginBottom: 10,
            marginTop: 5,
            marginRight: '40%'
        },
    })
}