
import axios from 'axios'

const apiGp1 = axios.create({
    baseURL: 'http://apirhsenaigp1.azurewebsites.net/api/'
})

export default apiGp1;
