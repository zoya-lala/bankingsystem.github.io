const mongoose = require('mongoose');

const userModel = mongoose.Schema(
	{
		userName: { type: String, required: true },
		currentBalance: { type: Number, required: true },
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	}
);

const User = mongoose.model('User', userModel);

module.exports = User;

//_id
//userName
//currentBalance
//timestamps
