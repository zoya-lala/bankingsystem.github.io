const express = require('express');
const {
	allTransactions,
	sendMoney,
} = require('../controllers/transactionController');

const router = express.Router();

router.get('/', allTransactions);
router.post('/send', sendMoney);

module.exports = router;
