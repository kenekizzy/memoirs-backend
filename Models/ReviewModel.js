const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    placeId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Place'
    }
});

const Review = mongoose.model('review', reviewSchema);

module.exports = Review;