const express = require('express');
const router = express.Router();
const axios = require('axios');
const { URLSearchParams } = require('url');
require('dotenv').config()

CLIENT_ID = process.env.CLIENT_ID;
CLIENT_SECRET = process.env.CLIENT_SECRET;

router.get('/authenticate', (req, res) => {
    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        redirect_uri: 'http://127.0.0.1:8080/githubUser/getInfo'
    })
    res.status(301).redirect('https://github.com/login/oauth/authorize/?' + params)
});

router.get('/getInfo', async (req, res) => {
    const code = req.query.code
    let accessToken;
    try {
        accessToken = await axios({
            method: 'post',
            url: 'https://github.com/login/oauth/access_token',
            headers: { 'Accept': 'application/json' },
            params: {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code: code,

            }
        });
    } catch (err) {
        console.error("Failed to obtain access token");
        debug(err.stack)
        res.sendStatus(500);
    }

    const token = accessToken.data.access_token;

    const userInfo = await axios({
        method: 'get',
        url: 'https://api.github.com/user',
        headers: { 'Authorization': 'token ' + token },
    });

    // call urls and for each, access languages, topics and readme contents
    const starredURL = userInfo.data.starred_url;
    const reposURL = userInfo.data.repos_url;
    const watchingURL = userInfo.data.subscriptions_url;

    const bio = userInfo.data.bio;

    // console.log("starred " + starredURL)
    // console.log("repos " + reposURL)
    // console.log("watching " + watchingURL)
    // console.log("bio " + bio)

    const userRepos = await axios({
        method: 'get',
        url: reposURL,
        // headers: { 'Authorization': 'token ' + token },
    });

    console.log(userRepos.data)


})

module.exports = router;