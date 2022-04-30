const router = require('express').Router();

const githubUser = require('./githubUser.js');
const infoJobs = require('./infoJobs.js');

router.use('/githubUser', githubUser);
router.use('/infoJobs', infoJobs);

module.exports = router;