// import { useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import api from "..//services/api";
// import jwtDecode from "jwt-decode";

//     const [idUsuario, setIdUsuario] = useState(1);
//     const [nivelSatisfacao, setNivelSatisfacao] = useState(0);
//     const [listaUsuarios, setListaUsuarios] = useState([]);
//     const [notaProdutividade, setNotaProdutividade] = useState(0);
//     const [usuario, setUsuario] = useState([])
//     async function BuscarUsuario() {
//         try {
//             const token = await AsyncStorage.getItem('userToken');

//             const resposta = await api.get('Usuarios/Listar/' + jwtDecode(token).jti, {
//                 headers: {
//                     Authorization: 'Bearer ' + token,
//                 },
//             });

//             if (resposta.status === 200) {
//                 setUsuario([resposta.data]);
//                 console.warn([resposta.data])
//             }

//         } catch (error) {
//             console.warn(error)
//         }
//     }
//     useEffect(() => BuscarUsuario(), [])

// const data = [
//     { x: 1, y: usuario.nivelSatisfacao * 100 },
//     { x: 2, y: usuario.nivelSatisfacao * 102 },
//     { x: 3, y: usuario.nivelSatisfacao + 100 },
//     { x: 4, y: usuario.nivelSatisfacao * 100 },
//     { x: 5, y: usuario.nivelSatisfacao * 101 },
// ]