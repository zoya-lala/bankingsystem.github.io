// Imports______________________________
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const path = require('path');

// Server initialization & Database Connection _____________________________
dotenv.config();
connectDB();
const app = express();
app.use(express.json()); // To accept JSON Data

// API Routes __________________
app.use('/api/users', userRoutes);
app.use('/api/transaction', transactionRoutes);

// ----------------------Deployment--------

const dirname = path.resolve();
if (process.env.NODE_ENV === 'development') {
	app.use(express.static(path.join(dirname, '/frontend/build')));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(dirname, 'frontend', 'build', 'index.html'));
	});
} else {
	app.get('/', (req, res) => {
		res.send('API is running');
	});
}

// ----------------------Deployment--------

// Deployment________________
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
