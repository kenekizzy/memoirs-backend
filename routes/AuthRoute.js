const { Router } = require('express');
const Authrouter = Router();
const { loginUser, logOut } = require('../controllers/AuthController');



Authrouter.route('/login')
.post(loginUser)


Authrouter.route('/logout')
.post(logOut);







module.exports = Authrouter;