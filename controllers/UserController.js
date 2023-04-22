const User = require("../Models/UserModel")
const bcrypt = require("bcryptjs")
const jwtGenerator = require("../middleware/jwtGenerator")

//Register User
const registerUser = async (req, res) => {
    try {
        const existingEmail = await User.findOne({email: req.body.email})
        if(existingEmail){
            return res.status(400).json("Email exists")
        }else{
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            const newUser = new User({
                fullName: req.body.fullName,
                userName: req.body.userName,
                email: req.body.email,
                password: hashedPassword
            })
            const user = await newUser.save()
            const token = jwtGenerator(user._id.toString())
            return res.status(200).json({token})
        }
    } catch (error) {
        res.status(500).json(error)   
    }
}

//Login User
const loginUser = async (req, res) => {
    const existingUser = await User.findOne({email: req.body.email})
    if(!existingUser){
        return res.status(400).json("Invalid Email Address")
    }
    const passwordTrue = await bcrypt.compare(req.body.password, existingUser.password)
    if(!passwordTrue){
        return res.status(400).josn("Incorrect  Password")
    }
    try {
        const { password, ...userInfo} = existingUser._doc
        const token = jwtGenerator(userInfo._id.toString())
        res.status(200).json({...userInfo, token})
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { registerUser, loginUser }