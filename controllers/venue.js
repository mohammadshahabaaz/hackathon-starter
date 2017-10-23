const passport = require('passport');
const Venue = require('../models/Venue');
//venue selection.................

exports.venueSelection = (req, res) => {
    res.json( {title: 'Venue Selection'});
};


//use Details..............

exports.createVenue = (req, res, next) => {
    //Express validation
    req.checkBody("email", "Enter a valid email address.").isEmail();

    req.checkBody(
        "phone",
        "Enter a valid IND phone number.").isMobilePhone("en-IN");
    var errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    } else {
        // normal processing here
    }

    const venue = new Venue({
        name: req.body.name,
        address: req.body.address,
        email:req.body.email,
        phone:req.body.phone,
        description:req.body.description,
        sportsType:req.body.sportsType,
        venuePhoto:req.body.venuePhoto,
        venuePrices:req.body.venuePrices,
        venueReview:req.body.venueReview,


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
exports.addSportsType=(req,res)=> {
    if (req.body.sportsType) {
        Venue.findOne({_id: req.params.id}, function (err, venue) {
            console.log(venue.sportsType);
            venue.sportsType = venue.sportsType.concat(req.body.sportsType);
            console.log(venue.sportsType, req.body);


            venue.save(function (err, venue) {
                if (err) {
                    req.flash('errors', {msg: 'Something wrong'})
                }
                res.json({venue: venue, status: " success !!"})
            });
        })
    }else{
      res.json({status:"error"})
    }
}


// edit sportsType
exports.editSportsType=(req,res)=> {
    console.log(req.body);
    Venue.findOneAndUpdate(
        {
            _id: req.params.id,
            "sportsType._id":req.params.sportsTypeId,
        },
        {
            "$set": {
                "sportsType.$.name":req.body.sportsType[0].name,
            }
        },
        {new:true},
        function (err, venue) {

        console.log(venue   );

        res.json({venue:venue, status: " success !!"})
    });
}

// delete sportsType
exports.deleteSportsType=(req,res)=> {
    console.log(req.params);
    Venue.sportsType.remove({
        _id: req.params.id,
        "sportsType._id":req.params.sportsTypeId
    },{new:true},
        function (err, venue) {

        console.log(venue);

        res.json({venue:venue,status: "success"});

    });
}
//sportsType list
exports.listSportsType=(req,res)=>{
    Venue.find({_id: req.params.id}, function(err, venues) {

        console.log(venues[0]);

        res.json( {values:venues[0].sportsType});
    });

}
// uploadVenuePhoto
exports.uploadVenuePhoto=(req,res)=>{
    {
        var upload = multer({
            storage: storage
        }).single('userFile')
        upload(req, res, function(err) {
            res.end('File is uploaded')
        })
}