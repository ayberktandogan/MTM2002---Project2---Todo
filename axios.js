import axios from 'axios'

if (process.env.NODE_ENV !== 'production') {
    const instance = axios.create({
    baseURL: 'http://localhost:5000/api/',
});
}

else {
    const instance = axios.create({
    baseURL: '/api/',
});
}



export default instance
