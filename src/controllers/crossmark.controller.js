const jwt = require('jsonwebtoken');
const rippleKP = require('ripple-keypairs');
const crypto = require('crypto');
const config = require('../config');

const checkSign = async (req, res, next) => {
    try {
        const { pubkey: public_key, address, signature, token } = req.body;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (typeof signature !== 'string' || !public_key || !address) {
            throw new Error('Invalid input');
        }

        const isVerified = rippleKP.verify(token, signature, public_key);

        if (isVerified) {
            const jwtToken = jwt.sign({ xrpAddress: address }, config.encKey);
            return res.json({ token: jwtToken, address: address });
        } else {
            return res.status(400).json({ error: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};

const generateHash = async (req, res, next) => {
    try {
        const randomBuffer = crypto.randomBytes(16);
        const hash = crypto.createHash('sha256').update(randomBuffer).digest('hex');
        return res.json({ hash });
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};

module.exports = {
    checkSign,
    generateHash,
};
