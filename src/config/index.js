require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    encKey: process.env.ENC_KEY,
    xummKey: process.env.XUMM_KEY,
    xummKeySecret: process.env.XUMM_KEY_SECRET,
    nodeEnv: process.env.NODE_ENV || 'development',
};
