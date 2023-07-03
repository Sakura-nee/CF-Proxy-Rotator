const axios = require('axios');

// inject request
axios.interceptors.request.use((config) => {
    config.headers['originalUrl'] = config.url; // original url
    config.url = 'https://prefix.username.workers.dev'; // proxy url
    return config;
}, (error) => {
    return Promise.reject(error);
});

axios.get('https://ipinfo.io/json')
.then((res) => {
    console.log(res.data);
});
