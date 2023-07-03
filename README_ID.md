# CF-Proxy-Rotator
Memanfaatkan Cloudflare Workers untuk mengulang permintaan HTTP Anda dengan menggunakan alamat IP acak yang disediakan oleh Cloudflare. Dengan CF-Proxy-Rotator, Anda dapat meningkatkan anonimitas dan privasi saat melakukan permintaan ke server tujuan.
**PS:** Terkadang beberapa server tujuan memblokir request menggunakan alamat IP dari cloudflare.
<br />
<br />

## Bagaimana CF-Proxy-Rotator Bekerja
CF-Proxy-Rotator mengimplementasikan fungsi yang mengirim permintaan HTTP melalui Cloudflare Workers. Setiap kali permintaan dibuat, alamat IP yang digunakan akan dipilih secara acak dari pool alamat IP yang disediakan oleh Cloudflare. Hal ini memungkinkan Anda untuk mengganti alamat IP yang terlihat oleh server tujuan dengan setiap permintaan yang Anda kirimkan.

Dengan menggunakan Cloudflare Workers, CF-Proxy-Rotator memastikan bahwa permintaan Anda diarahkan melalui jaringan global Cloudflare, memberikan manfaat seperti kecepatan tinggi, keamanan, dan kemampuan penyebaran geografis yang luas. Selain itu, penggunaan alamat IP acak membantu menyamarkan identitas Anda, menjaga privasi, dan melindungi dari pelacakan yang tidak diinginkan.
<br />
<br />

## How to use
kirim request ke alamat workers anda, tambahkan "originalUrl" dengan value alamat tujuan asli kedalam request header
contoh menggunakan curl
```bash
curl "https://cf-proxy.sakura-nee.workers.dev/" -H "originalUrl=https://ipinfo.io/json"
```
<br />

## Samples
- [Node.js + axios](https://github.com/Sakura-nee/CF-Proxy-Rotator/blob/main/test/req.js)

```node
const axios = require('axios');

axios.interceptors.request.use((config) => {
    config.headers['originalUrl'] = config.url;
    config.url = 'https://prefix.username.workers.dev'; // workers url
    return config;
}, (error) => {
    return Promise.reject(error);
});

axios.get('https://ipinfo.io/json')
.then((res) => {
    console.log(res.data);
});```
