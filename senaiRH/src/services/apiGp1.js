import axios from 'axios';

const api = axios.create({
    baseURL: 'http://apirhsenaigp1.azurewebsites.net/api'
    //baseURL: 'http://192.168.0.30:5000/api'
    
});

export default api;