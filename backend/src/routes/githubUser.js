const express = require('express');
const router = express.Router();
const axios = require('axios');
const { URLSearchParams } = require('url');
require('dotenv').config();

CLIENT_ID = process.env.CLIENT_ID;
CLIENT_SECRET = process.env.CLIENT_SECRET;

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
        const userData = await axios({
            method: 'get',
            url: 'https://api.github.com/user',
            headers: { 'Authorization': 'token ' + token },
        });

        // extract queryable info from bio
        //TODO add more personal info to query
        const bio = userData.data.bio;

        // call urls and for each, access languages, topics and readme contents
        const getRepos = async url => {
            repos = await axios.get(url, {
                headers: { 'Authorization': 'token ' + token }
            });
            return repos.data;
        };

        const reposURL = userData.data.repos_url;
        const starredURL = userData.data.starred_url.replace('{/owner}{/repo}', '');
        const watchingURL = userData.data.subscriptions_url;

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
            repoTopics: []
        };

        const getRepoInfo = async repo => {
            //TODO get readme contents
            const repoLanguages = await axios.get(repo.languages_url, {
                headers: { 'Authorization': 'token ' + token }
            });
            //TODO merge language bytes written with sum
            reposInfo.repoLanguages = { ...reposInfo.repoLanguages, ...repoLanguages.data };

            reposInfo.repoTopics = [...new Set([...reposInfo.repoTopics, ...repo.topics])];
        };

        for (const repo of userRepos) {
            await getRepoInfo(repo)
        }
        for (const repo of starredRepos) {
            await getRepoInfo(repo)
        }
        for (const repo of watchedRepos) {
            await getRepoInfo(repo)
        }

        const userInfo = { ...reposInfo, ...{ bio: bio } };
        console.log(userInfo);
        res.status(200).send(userInfo);
    } catch (e) {
        console.log(e);
    };
});

module.exports = router;