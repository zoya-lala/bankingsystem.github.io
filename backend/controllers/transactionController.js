const asyncHandler = require('express-async-handler');
const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config();

// /api/transaction?loggedUser=${currentUser} (table of transaction)
const allTransactions = asyncHandler(async (req, res) => {
	const currentUser = req.query.loggedUser;

	try {
		const userExists = await User.find({ _id: currentUser });

		if (userExists) {
			const transactions = await Transaction.find()
				.populate('sender')
				.populate('receiver');

			res.send(transactions);
		}
	} catch (error) {
		res.status(400).send(error);
	}
});

// /api/transaction/send
const sendMoney = asyncHandler(async (req, res) => {
	const { senderId, receiverId, amt } = req.body;

	const sender = await User.findOne({ _id: senderId });

	const receiver = await User.findOne({ _id: receiverId });

	if (sender && receiver) {
		const debit = Number(sender.currentBalance) - Number(amt);
		const credit = Number(receiver.currentBalance) + Number(amt);

		const amount = Number(amt);

		const updateDebit = await User.updateOne(
			{ _id: senderId },
			{
				$set: { currentBalance: debit },
			}
		);

		const updateCredit = await User.updateOne(
			{ _id: receiverId },
			{
				$set: { currentBalance: credit },
			}
		);

		const success = updateDebit && updateCredit;
		if (success) {
			const senderTrans = await Transaction.create({
				transactionType: 'Debit',
				sender: sender,
				receiver: receiver,
				amount: amount,
				balance: debit,
			});

			const receiverTrans = await Transaction.create({
				transactionType: 'Credit',
				sender: sender,
				receiver: receiver,
				amount: amount,
				balance: credit,
			});
			const updatedSender = await User.findOne({ _id: senderId });

			if (senderTrans && receiverTrans) {
				res.send(updatedSender);
			} else {
				res.status(400).send('Transaction Failed, Try Again');
			}
		} else {
			res.status(400).send('An error occurred, Try Again');
		}
	} else {
		res.status(400).send(' Either of the Users not found, Try Again');
	}
});

module.exports = { allTransactions, sendMoney };
