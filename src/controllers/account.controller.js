const { Client, dropsToXrp } = require('xrpl');
const { BASE_RESERVE_XRPL, RESERVE_INCREMENT_XRPL, XRPL_SERVER } = require('../common/common.constants');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAccountDonationInfo = async (req, res) => {
    try {
        const { xrpAddress } = req.query;

        if (!xrpAddress) {
            return res.status(400).json({ error: 'Address is required.' });
        }

        const fundDistribution = await prisma.fund.findMany({});
        const donations = await prisma.donation.findMany({
            where: {
                address: xrpAddress,
            },
        });

        const donationAmount = donations.reduce((acc, donation) => acc + donation.amount, 0);

        return res.json({ funds: fundDistribution, donation: donationAmount });
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};

const getAccountDetails = async (req, res) => {
    try {
        const { xrpAddress } = req.query;

        if (!xrpAddress) {
            return res.status(400).json({ error: 'Address is required.' });
        }

        const client = new Client(XRPL_SERVER);
        await client.connect();

        const accountDetails = await client.request({
            command: 'account_info',
            account: xrpAddress,
        });

        const reservedXRP = BASE_RESERVE_XRPL + accountDetails.result.account_data.OwnerCount * RESERVE_INCREMENT_XRPL;
        const availableBalance = dropsToXrp(accountDetails.result.account_data.Balance) - reservedXRP;
        await client.disconnect();

        return res.json({
            reservedXRP,
            availableBalance,
        });
    } catch (error) {
        throw new Error('Error occurred:', error);
    }
};

module.exports = {
    getAccountDonationInfo,
    getAccountDetails,
};
