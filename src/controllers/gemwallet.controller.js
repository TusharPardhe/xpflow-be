const jwt = require('jsonwebtoken');
const rippleKP = require('ripple-keypairs');
const config = require('../config');

const checkSign = async (req, res, next) => {
    try {
        const { signature, token } = req.body;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, config.encKey);
        const { public_key, address } = decoded;

        if (typeof signature !== 'string') {
            throw new Error('Invalid signature');
        }

        const tokenHex = Buffer.from(token, 'utf8').toString('hex');
        const isVerified = rippleKP.verify(tokenHex, signature, public_key);

        if (isVerified) {
            const newToken = jwt.sign({ xrpAddress: address }, config.encKey);
            return res.json({ token: newToken, address: address });
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
        const { pubkey, address } = req.query;

        if (typeof pubkey !== 'string' || typeof address !== 'string') {
            throw new Error('Invalid input');
        }

        const token = jwt.sign({ public_key: pubkey, address: address }, config.encKey, { expiresIn: '1h' });
        return res.json({ token });
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};

module.exports = {
    checkSign,
    generateHash,
};
