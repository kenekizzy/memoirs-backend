const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : [true, 'Name is required']
    },
    email : {
        type : String,
        required : true,
        uniquie : true
    },
    password : {
        type : String,
        required : true
    },
    isMasterAdmin : true
}, {
    timestamps : true
});

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;