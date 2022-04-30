const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const CLIENT_ID = process.env.INFO_JOBS_CLIENT_ID;
const CLIENT_SECRET = process.env.INFO_JOBS_CLIENT_SECRET;

router.get('/getOffers', async (req, res) => {
  const langs = req.query.langs.split(',').slice(0, 5);
  const city = req.query.city;
  console.log(langs);
  console.log(city);
  try {
    const offers = await Promise.all(langs.flatMap(async lang => await getKeywordOffers(lang, city)));
    res.send(offers.flat());
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

async function getKeywordOffers(keyword, city) {
  const response = await axios({
    method: 'get',
    url: 'https://api.infojobs.net/api/7/offer',
    headers: {'Accept': 'application/json'},
    auth: {
      username: CLIENT_ID,
      password: CLIENT_SECRET
    },
    params: {
      q: keyword,
      city: city
    }
  });
  return response.data.items;
}

module.exports = router;