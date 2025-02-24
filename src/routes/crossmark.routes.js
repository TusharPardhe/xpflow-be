const express = require('express');
const router = express.Router();
const crossmarkController = require('../controllers/crossmark.controller');

router.post('/checksign', crossmarkController.checkSign);
router.get('/hash', crossmarkController.generateHash);

module.exports = router;
