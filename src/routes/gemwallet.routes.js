const express = require('express');
const router = express.Router();
const gemwalletController = require('../controllers/gemwallet.controller');

router.post('/checksign', gemwalletController.checkSign);
router.get('/hash', gemwalletController.generateHash);

module.exports = router;
