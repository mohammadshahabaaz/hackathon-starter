const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const Sport = require('../models/Sport');


exports.createSportForm = (req, res) => {
   res.render('sport/create', {title: 'Create Sport'});
};

/**
 * POST /signup
 * Create a new local account.
 */
exports.createSport = (req, res, next) => {
   // req.assert('email', 'Email is not valid').isEmail();
    //req.assert('password', 'Password must be at least 4 characters long').len(4);
    //req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
    //req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

//    const errors = req.validationErrors();

   // if (errors) {
   //     req.flash('errors', errors);
    //    return res.redirect('/createSportForm');
    //}

    const sport = new Sport({
        name: req.body.name,
        type: req.body.type,
    });

    Sport.findOne({ name: req.body.name }, (err, existingUser) => {
//        if (err) { return next(err); }
        if (existingUser) {
            req.flash('errors', { msg: 'This sport is already exists.' });
            return res.redirect('/createSportForm');
        }
        sport.save((err) => {
            if (err) { return next(err); }

                res.redirect('/createSportForm');

        });
    });
};

exports.sportsList = (req, res) => {

    Sport.find({}, function(err, sports) {

        console.log(sports);

res.render("sport/list", {values:sports});
    });

    };


exports.getsport=(req,res)=>{

    Sport.findOne({name:req.params.name}, function(err, sport) {

        console.log(sport);

        res.render("sport/sport", {sport:sport});

    });
}
exports.deleteSport=(req,res)=> {

    Sport.remove({name: req.body.name}, function (err, sport) {

        console.log(sport);

        //res.render("sport/sport", {sport: sport});
        res.redirect('/sportsList');

    });
}
exports.getUpdate = (req, res) => {

    Sport.findOne({name:req.params.name}, function(err, sport) {

        console.log(sport);

        res.render('sport/update', {sport:sport});
        //res.render('sport/create', {title: 'Create Sport'});

    });
};
exports.update = (req, res) => {

    Sport.findOneAndUpdate({_id: req.body.id}, req.body, function (err, sport) {
        // console.log(sport);
        //res.redirect('/sportsList')
        res.json(sport);
    });
}

