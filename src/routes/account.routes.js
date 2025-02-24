const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account.controller');

router.get('/donations', accountController.getAccountDonationInfo);
router.get('/details', accountController.getAccountDetails);

module.exports = router;
