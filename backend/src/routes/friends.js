const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

async function getFriends(accessToken) {
  try {
    const followers = await getFollowers(accessToken);
    const following = await getFollowing(accessToken);
    return calculateFriends(followers, following);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}

async function getFollowers(accessToken) {
  const response = await axios({
    method: 'get',
    url: 'https://api.github.com/user/followers',
    headers: {'Authorization': 'token ' + accessToken},
  });
  return response.data;
}

async function getFollowing(accessToken) {
  const response = await axios({
    method: 'get',
    url: 'https://api.github.com/user/following',
    headers: {'Authorization': 'token ' + accessToken},
  });
  return response.data;
}

function calculateFriends(followers, following) {
  return followers.filter(a => following.some(b => a.id === b.id));
}

module.exports = getFriends;