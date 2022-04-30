const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config()

CLIENT_ID = process.env.CLIENT_ID;
CLIENT_SECRET = process.env.CLIENT_SECRET; 

router.get('/getOffers', async (req, res) => {
  const query = req.query;
  try{
    const accessToken = await axios({
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

    console.log(accessToken.data)
  }
  catch (err){
    console.error(err);
  }

});

module.exports = router;