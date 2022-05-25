<<<<<<< HEAD
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://apirhsenaigp1.azurewebsites.net/api'
<<<<<<< HEAD
    //baseURL: 'http://192.168.0.30:5000/api'
    
=======
>>>>>>> mobile-gp-2
});

export default api;
=======

import axios from 'axios'

const apiGp1 = axios.create({
    baseURL: 'http://apirhsenaigp1.azurewebsites.net/api/'
})

export default apiGp1;
>>>>>>> mobile-gp-3
