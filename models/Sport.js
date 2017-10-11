const mongoose = require('mongoose');
const sportSchema = new mongoose.Schema({
    name: String,
    type: String,
});

const Sport = mongoose.model('Sport', sportSchema);

module.exports = Sport;
