const mongoose = require('mongoose');

const placesSchema = new mongoose.Schema({
    placeName : {
        type : String,
        required : true
    },
    placePrice: {
        type: Number,
        required : true
    },
    reviews : {
        type: Number,
        min : 1,
        max : 5
    },
    placeAddress: {
        type: String,
        required: true
    },
    reviewedIds : {
        type: [mongoose.Schema.Types.ObjectId],
        ref : 'User'
    },
    photo: {
        type : String
    },
    location: {
        type : String,
        required: true
    },

}, {
    timestamps: true
});


const Place = mongoose.model('place', placesSchema);

module.exports = Place;