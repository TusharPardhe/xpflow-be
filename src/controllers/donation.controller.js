const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const addDonation = async (req, res) => {
    try {
        const { donation } = req.body;

        if (!donation || !donation.address || !donation.transactionId || !donation.amount) {
            return res.status(400).json({ error: 'a' });
        }

        // Check if donation exists
        const donationExists = await prisma.donation.findFirst({
            where: {
                address: donation.address,
                transactionId: donation.transactionId,
            },
        });

        if (donationExists) {
            if (donationExists.status === 'confirmed') {
                return res.status(400).json({ error: 'Donation already confirmed' });
            } else if (donationExists.status === 'pending') {
                const updatedDonation = await prisma.donation.update({
                    where: {
                        id: donationExists.id,
                    },
                    data: {
                        status: 'confirmed',
                    },
                });
                return res.json({ donation: updatedDonation });
            }
            return res.status(400).json({ error: 'Donation already exists' });
        }

        // Add donation
        const newDonation = await prisma.donation.create({
            data: {
                address: donation.address,
                transactionId: donation.transactionId,
                amount: donation.amount,
                status: donation.status ?? 'pending',
            },
        });

        return res.json({ donation: newDonation });
    } catch (error) {
        throw new Error('Error occurred:', error);
    }
};

module.exports = {
    addDonation,
};
