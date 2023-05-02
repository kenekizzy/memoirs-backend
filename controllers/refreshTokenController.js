const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');
const { generateAccessToken } = require('../middleware/jwtGenerator');
const asyncHandler = require('express-async-handler');


const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(401);

    const refreshToken = cookies.jwt;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, asyncHandler(async(err,decoded) => {
        if(err) return res.status(403);
        const foundUser = await User.findById(decoded.id);
        if(!foundUser) return res.status(401);
        const accessToken = generateAccessToken(foundUser.id);
        res.json({accessToken});
    }))
    
    
};

module.exports = { handleRefreshToken };