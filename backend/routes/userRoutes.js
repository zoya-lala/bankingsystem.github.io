const express = require('express');
const {
	allUsers,
	addUser,
	loginAdmin,
} = require('../controllers/userController');

const router = express.Router();

router.get('/', allUsers);

router.post('/addUser', addUser);

router.post('/loginAdmin', loginAdmin);

module.exports = router;
