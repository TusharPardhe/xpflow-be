// src/services/xumm.service.js
const { XummSdk } = require('xumm-sdk');
const config = require('../config');

class XummService {
    constructor() {
        this.sdk = new XummSdk(config.xummKey, config.xummKeySecret);
    }

    async createPayload(transaction) {
        const signInPayload = {
            txjson: transaction,
        };

        return await this.sdk.payload.create(signInPayload, true);
    }

    async getPayload(payloadId) {
        const payload = await this.sdk.payload.get(payloadId);

        if (!payload) {
            throw new Error('Failed to retrieve payload from Xumm SDK');
        }

        return payload;
    }
}

module.exports = new XummService();
