const { verifySignature } = require('verify-xrpl-signature');
const jwt = require('jsonwebtoken');
const config = require('../config');
const XummService = require('../services/xumm.service');

const checkSign = async (req, res, next) => {
    try {
        const { hex } = req.body;

        if (!hex) {
            throw new Error('hex parameter is missing from the request body');
        }

        const decodedHex = decodeURIComponent(hex);
        const resp = verifySignature(decodedHex);

        if (resp.signatureValid) {
            const xrpAddress = resp.signedBy;
            const encrypted = jwt.sign({ address: xrpAddress }, config.encKey);
            return res.json({ xrpAddress: resp.signedBy, token: encrypted });
        } else {
            throw new Error('Invalid signature');
        }
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};

const createPayload = async (req, res, next) => {
    try {
        const { transaction } = req.body;
        const payload = await XummService.createPayload(transaction);
        return res.json({ payload });
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};

const getPayload = async (req, res, next) => {
    try {
        const { payloadId } = req.query;

        if (!payloadId) {
            throw new Error('payloadId is missing from the query parameters');
        }

        const payload = await XummService.getPayload(payloadId);
        return res.json({ payload });
    } catch (error) {
        throw new Error('Error occurred:', error);
    }
};

module.exports = {
    checkSign,
    createPayload,
    getPayload,
};
