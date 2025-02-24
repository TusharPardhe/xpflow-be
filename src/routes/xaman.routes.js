const express = require('express');
const router = express.Router();
const xamanController = require('../controllers/xaman.controller');

router.post('/checksign', xamanController.checkSign);
router.post('/createpayload', xamanController.createPayload);
router.get('/getpayload', xamanController.getPayload);

module.exports = router;
