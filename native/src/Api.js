import axios from 'axios';

const URL = "http://localhost:4000/"; //android use ip  


const instance = axios.create({
    baseURL: URL,
    headers: {
        'Accept': 'application/json',
    }
});

export default {
    instance
};
