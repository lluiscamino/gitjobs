const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const CLIENT_ID = process.env.INFO_JOBS_CLIENT_ID;
const CLIENT_SECRET = process.env.INFO_JOBS_CLIENT_SECRET;

router.post('/getOffers', async (req, res) => {
  const langs = req.body.langs.split(',').slice(0, 5);
  const city = req.body.city;
  const minSalary = req.body.minSalary;
  const yoe = req.body.yoe;
  const userInfo = JSON.parse(req.body.userInfo);
  const readmeFiles = userInfo.repoReadmes;
  const token = userInfo.token;
  const bio = userInfo.bio;

  try {
    let offers = await Promise.all(langs.flatMap(async lang => await getKeywordOffers(lang, city)));
    offers = offers.flat();

    offers = offers.filter(offer => {
      if (!offer.experienceMin?.value) {
        return true;
      }
      const minJobExpStr = offer.experienceMin.value.replace(/[^0-9]/g, '');
      const minJobExperience = parseInt(minJobExpStr);
      if (isNaN(minJobExperience)) {
        return true;
      }
      return yoe >= minJobExperience;
    });

    if (minSalary > 0) {
      offers = offers.filter(offer => {
        if (!offer.salaryMin?.value) {
          return false;
        }
        const salaryStr = offer.salaryMin.value.replace(/[^0-9]/g, '');
        const salary = parseInt(salaryStr);
        if (isNaN(salary)) {
          return true;
        }
        return salary >= minSalary;
      });
    }

    res.send(offers);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

async function getKeywordOffers(keyword, city) {
  const response = await axios({
    method: 'get',
    url: 'https://api.infojobs.net/api/7/offer',
    headers: { 'Accept': 'application/json' },
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