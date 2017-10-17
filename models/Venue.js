const mongoose = require('mongoose');
//
//
//
//
//venue Schema



//sportsType
 const sportsTypeSchema = new mongoose.Schema({
     name:String,

 });
 //venuePhoto
const venuePhotoSchema = new mongoose.Schema({
    name:String,
    path:String,
});
//venuePrices
const venuePricesSchema = new mongoose.Schema({
    price:Number,
    timing:Number,
    description:String,
});
//venueReview
const venueReviewSchema = new mongoose.Schema({
    user:String,
    rating:Number,
    feedback:String,

});
const venueSchema = new mongoose.Schema({
    name: String,
    address:String,
    email:{ type: String },
    phone:Number,
    description:String,
    sportsType:[sportsTypeSchema],
    venuePhoto:[venuePhotoSchema],
    venuePrices:[venuePricesSchema],
    venueReview:[venueReviewSchema],

},{ timestamps: true });

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;
