const express = require('express')
const axios = require('axios');
const {URLSearchParams, URL} = require('url');
require('dotenv').config();

CLIENT_ID = process.env.CLIENT_ID;
CLIENT_SECRET = process.env.CLIENT_SECRET;

const app = express();

app.get('/sign-in-github', (req, res) => {
    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        redirect_uri: 'http://127.0.0.1:8080/github-user'
    })
    res.status(301).redirect('https://github.com/login/oauth/authorize/?' + params)
});

app.get('/github-user', (req, res) => {
    const code = req.query.code
    axios({
        method: 'post',
        url: 'https://github.com/login/oauth/access_token',
        headers: {'Accept':'application/json'},
        params: {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,

        }
    }).then(response => {
        const token = response.data.access_token
        axios({
            url: 'https://api.github.com/user',
            headers: {'Authorization': 'token ' + token}
        }).then(data => console.log(data.data))
    })

})


app.listen(8080, () => console.log('Listening correctly'))