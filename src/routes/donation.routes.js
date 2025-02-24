const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donation.controller');

router.post('/add', donationController.addDonation);

module.exports = router;
