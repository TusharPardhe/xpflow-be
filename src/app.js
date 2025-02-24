// src/app.js
const express = require('express');
const cors = require('cors');
const config = require('./config');
const errorMiddleware = require('./middleware/error.middleware');

// Import routes
const crossmarkRoutes = require('./routes/crossmark.routes');
const gemwalletRoutes = require('./routes/gemwallet.routes');
const xamanRoutes = require('./routes/xaman.routes');
const accountRoutes = require('./routes/account.routes');
const donationRoutes = require('./routes/donation.routes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/wallets/crossmark', crossmarkRoutes);
app.use('/api/wallets/gemwallet', gemwalletRoutes);
app.use('/api/wallets/xaman', xamanRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/donation', donationRoutes);

// Error handling
app.use(errorMiddleware);

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
