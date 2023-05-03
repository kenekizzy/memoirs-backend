const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const User = require('../Models/UserModel');
const { generateAccessToken, generateRefreshToken } = require('../middleware/jwtGenerator');


//@desc auth user
//@route POST /api/login
//@access public


const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    //check email

    const user = await User.findOne({email});

    //validate this user
    if(user && (bcrypt.compare(password, user.password))){
        const accessToken = generateAccessToken(user._id);
        const userRefreshToken = generateRefreshToken(user._id);
        await User.findOneAndUpdate(user.id, {refreshToken : userRefreshToken});
        res.cookie('jwt', userRefreshToken, { httpOnly: true, maxAge : 24 * 60 * 60 * 1000 })
        res.status(200).json({
            _id : user.id,
            userName : user.userName,
            token : accessToken,
        });
    }else{
        res.status(400);
        throw new Error('Invalid Credentials');
    }
});


//@desc deauth user
// @route POST /api/logout
//@access Public

const logOut = (req, res) => {
    const cookies = req.cookies;

    if(!cookies?.jwt) return res.status(204);
    res.clearCookie('jwt' , { httpOnly : true , sameSite: 'None'});
    res.json({ message : 'Cookie cleared' });
}


module.exports = { loginUser, logOut };