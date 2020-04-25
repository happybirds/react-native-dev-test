import axios from 'axios';

const URL = "http://192.168.1.9:4000/"; 


const instance = axios.create({
    baseURL: URL,
    headers: {
        'Accept': 'application/json',
    }
});

export default {
    instance
};