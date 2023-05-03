const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const User = require('../Models/UserModel');


//@desc create user
//@route POST /api/register
//@access public

const registerUser = asyncHandler(async(req,res) => {
    const { fullName, userName, email, password } = req.body;
    if(!fullName || !email || !userName || !password){
        res.status(400);
        throw new Error ("Fill in all fields");
    }

    //Does user exist
    const userNameExists = await User.findOne({userName});
    if(userNameExists){
        res.status(400).json({message : "Userame is already in use"});
        throw new Error ('Cannot complete registration')
    };

    const emailExists = await User.findOne({email});
    if(emailExists){
        res.status(400).json({message : "Email is already in use"});
        throw new Error ('Cannot complete registration')
    }
    //hash password
    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        fullName, 
        userName,
        email,
        password : hashedPassword,
    });
    if(user){
        res.status(201).json({
            _id : user.id,
            userName : userName,
        });
    }else{
        res.status(400);
        throw new Error('Invalid Credentials');
    }

});


//@desc get user data
//@route GET/api/users/me
//@access private
const getUser = asyncHandler(async(req, res) => {
    const { _id, userName } = await User.findById(req.user.id);
    res.status(200).json({
        id : _id,
        userName
    })
})





module.exports={
    registerUser,
    getUser
}