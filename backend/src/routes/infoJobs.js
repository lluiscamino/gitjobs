const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const CLIENT_ID = process.env.INFO_JOBS_CLIENT_ID;
const CLIENT_SECRET = process.env.INFO_JOBS_CLIENT_SECRET;

router.get('/getOffers', async (req, res) => {
  const query = req.query;
  try{
    const response = await axios({
        method: 'get',
        url: 'https://api.infojobs.net/api/7/offer',
        headers: { 'Accept': 'application/json' },
        auth: {
          username: CLIENT_ID,
          password: CLIENT_SECRET
        },
        params: {
          q: query.q,
          city: "Madrid",
          province: "Madrid"
        }
      });

    res.send(response.data);
  }
  catch (err){
    console.error(err);
    res.sendStatus(500);
  }

});

module.exports = router;