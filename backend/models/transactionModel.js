const mongoose = require('mongoose');

const transactionModel = mongoose.Schema(
	{
		transactionType: { type: String, required: true },
		sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		amount: { type: Number, required: true },
		balance: { type: Number, required: true },
	},
	{
		timestamps: true,
	}
);

const Transaction = mongoose.model('Transaction', transactionModel);

module.exports = Transaction;

//_id
//timestamps
//transactionType
//sender
//receiver
//balance
