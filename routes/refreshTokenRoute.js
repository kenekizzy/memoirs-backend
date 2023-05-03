const { Router } = require('express');
const refreshRouter = Router();
const { handleRefreshToken } = require('../controllers/refreshTokenController');


refreshRouter.route('/token')
.get(handleRefreshToken)



module.exports = refreshRouter;