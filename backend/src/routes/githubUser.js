const express = require('express');
const router = express.Router();
const axios = require('axios');
const { URLSearchParams } = require('url');
require('dotenv').config();
const getFriends = require('./friends');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

router.get('/authenticate', (req, res) => {
    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        redirect_uri: 'http://127.0.0.1:3000/redirect'
    });
    res.status(301).redirect('https://github.com/login/oauth/authorize/?' + params)
});

router.get('/getInfo', async (req, res) => {
    const code = req.query.code;
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
        debug(err.stack);
        res.sendStatus(500);
    }

    const token = accessToken.data.access_token;

    if (!token) {
        console.error("Invalid token");
        return;
    }

    try {
        const userEndpoint = await axios({
            method: 'get',
            url: 'https://api.github.com/user',
            headers: { 'Authorization': 'token ' + token },
        });

        // extract queryable info from profile
        const userData = userEndpoint.data;

        // call urls and for each, access languages, topics and readme contents
        const getRepos = async url => {
            repos = await axios.get(url, {
                headers: { 'Authorization': 'token ' + token }
            });
            return repos.data;
        };

        const reposURL = userData.repos_url;
        const starredURL = userData.starred_url.replace('{/owner}{/repo}', '');
        const watchingURL = userData.subscriptions_url;

        const userRepos = await getRepos(reposURL, {
            headers: { 'Authorization': 'token ' + token }
        });
        const starredRepos = await getRepos(starredURL, {
            headers: { 'Authorization': 'token ' + token }
        });
        const watchedRepos = await getRepos(watchingURL, {
            headers: { 'Authorization': 'token ' + token }
        });
        const reposInfo = {
            repoLanguages: {},
            repoTopics: [],
            repoReadmes: []
        };

        const getRepoInfo = async repo => {
            try {

                const owner = repo.owner.login;
                const repoName = repo.name;

                const readmeURL = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/readme`, {
                    headers: { 'Authorization': 'token ' + token }
                });
                const repoLanguages = await axios.get(repo.languages_url, {
                    headers: { 'Authorization': 'token ' + token }
                });

                reposInfo.repoLanguages = Object.entries(reposInfo.repoLanguages).reduce((acc, [key, value]) =>
                    ({ ...acc, [key]: (acc[key] || 0) + value })
                    , { ...repoLanguages.data });
                reposInfo.repoTopics = [...new Set([...reposInfo.repoTopics, ...repo.topics])];
                reposInfo.repoReadmes.push(readmeURL.data.download_url)
            } catch (err) {
                console.error('Error getting repo info, skipping')
            }
        };

        let repoInfoPromises = [];
        for (const repo of userRepos) {
            repoInfoPromises.push(getRepoInfo(repo))
        }
        /*for (const repo of starredRepos) {
            repoInfoPromises.push(getRepoInfo(repo))
        }
        for (const repo of watchedRepos) {
            repoInfoPromises.push(getRepoInfo(repo))
        }*/
      Promise.all(repoInfoPromises).then(async _ => {
        const userInfo = {...reposInfo, ...userData, friends: await getFriends(token)};

            res.status(200).send(userInfo);
        })
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;