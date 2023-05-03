const { Router } = require('express');
const router = Router();

const { registerUser, getUser } = require('../controllers/UserController');

const protect = require('../middleware/AuthMiddleWare');


router.route('/register')
.post(registerUser)


router.route('/users/me')
.get(protect, getUser)



module.exports = router