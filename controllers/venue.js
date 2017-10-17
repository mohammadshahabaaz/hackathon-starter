const passport = require('passport');
const Sport = require('../models/Venue');
//venue selection
exports.venueSelection = (req, res) => {

const venue = new Venue({
    name: req.body.name,
    type: req.body.type,
});