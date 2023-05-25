const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config();

// /api/users?loggedUser=${currentUser}
const allUsers = asyncHandler(async (req, res) => {
	const currentUser = req.query.loggedUser;

	try {
		const userExists = await User.find({ _id: currentUser });

		if (userExists) {
			const users = await User.find({ _id: { $ne: currentUser } });

			res.send(users);
		}
	} catch (error) {
		res.status(400).send(error);
	}
});

// /api/users/addUser
const addUser = asyncHandler(async (req, res) => {
	const { name, currentBal } = req.body;

	if (name && currentBal) {
		const newUser = await User.create({
			userName: name,
			currentBalance: currentBal,
		});

		if (newUser) {
			res.send('New User Added');
		} else {
			res.status(400).send("Couln't create User, Try Again.");
		}
	} else {
		res.status(400).send("Name & Current Balance shouln't be empty");
	}
});

// /api/users/loginAdmin
const loginAdmin = asyncHandler(async (req, res) => {
	const { name } = req.body;

	if (name) {
		const findAdmin = await User.findOne({ userName: name });

		if (findAdmin) {
			res.send(findAdmin);
		} else {
			res.status(400).send("Couldn't find Admin");
		}
	} else {
		res.status(400).send("Name & Current Balance shouln't be empty");
	}
});

module.exports = { allUsers, addUser, loginAdmin };
