const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: [true, 'FullName required'],
    },
    userName: {
        type: String,
        required: [true, 'Username is required']
    },
    email:{
        type: String,
        required : [true, 'Email is required'],
        unique : true
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minlength: 8
    },
    reviews :{
        type: Number,
        min: 1,
        max: 5
    },
    phoneNumber : {
        type: Number
    },
    uploads : []
},{
    timestamps: true
});


const User = mongoose.model('user', userSchema);

module.exports = User;