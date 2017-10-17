const passport = require('passport');
const Venue = require('../models/Venue');
//venue selection.................

exports.venueSelection = (req, res) => {
    res.json( {title: 'Venue Selection'});
};


//use Details..............

exports.createVenue = (req, res, next) => {

    const venue = new Venue({
        name: req.body.name,
        address: req.body.address,
        email:req.body.email,
        phone:req.body.phone,
        description:req.body.description,
        sportsType:req.body.sportsType,

    });

    Venue.findOne({ name: req.body.name }, (err, existingUser) => {

        if (existingUser) {
            req.flash('errors', { msg: 'This user is already exists.' })
            //return res.redirect('/createSportForm')
            return res.json({status:"error"})

        }
         venue.save((err) => {
            if (err) { return res.json({status:err}); }
            res.json({status:"success"})
           // res.redirect('/createSportForm');

        });
    });
};
//venue list
exports.venuesList = (req, res) => {

    Venue.find({}, function(err, venues) {

        console.log(venues);

        res.json( {values:venues});
    });

};
//getVenue
exports.getVenue=(req,res)=>{

    Venue.findOne({_id:req.params.id}, function(err, venue) {

        console.log(venue);

        res.json( {venue:venue});

    });
};
// edit venue
exports.venueEdit=(req,res)=>{

    Venue.findOneAndUpdate({_id:req.params.id}, req.body,{new:true}, function(err,venue){

        //console.log(venue);

        res.json(venue);
    });
};

 //delete venue
 exports.deleteVenue=(req,res)=> {
     // console.log(req.body,req.query,req.params)

     Venue.findOneAndRemove({_id: req.params.id}, function (err, venue) {
        console.log(venue);

         //res.render("sport/sport", {sport: sport});
         //res.json({venue:venue},{status:"success"});
         res.json({status:"success"});

     });
 };
//add sportType
exports.addSportsType=(req,res)=>{
    Venue.addOneAndUpdate({_id:req.params.id},function(err, venue){
        console.log(venue);
        venue.sportsType = venue.sportsType.concat(req.body.sportsType);

        venue.save(function (err, newvenue) {
            if (err) {
                req.flash('errors', {msg: 'Something wrong'})
            }
            res.json({venue: newvenue, status: " success !!"})
        });
    })
}