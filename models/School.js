const mongoose = require('mongoose');
//CreateId
const createIdSchema = new mongoose.Schema
        ({
            name: String,
            email: {type: String},
            phone: Number,
            password: String
        });
const logInIdSchema = new mongoose.Schema
        ({
            name: String,
            email: {type: String},
            password: String
        });
const classesListSchema = new mongoose.Schema
        ({
            name:String
        });
const viewSubjectsSchema = new mongoose.Schema
        ({
            name:String
        });
const uploadPostsSchema = new mongoose.Schema
        ({
            status:String,
            name:String,
            path:String,

        });
const School = mongoose.model('School', schoolSchema);

module.exports = School;
