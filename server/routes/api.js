const express = require('express');
const db = require('../models')
const router = express.Router();
const seeder = require('../test_data/seeder');
const volController = require('../controllers/volController');
const authController = require('../controllers/authController');
const passport = require('../passport');
router.get('/Login', volController.Login);



router.get('/Signup', volController.Signup);

router.post('/Signup', volController.Signup);

router.get('/Logout', authController.Logout);

router.get("/getVolunteerLogin", (req, res) => {
    let query = {
        $and: [{email: { $regex: req.query.email}},
                
                {password: { $regex: req.query.password}}
             ]
        };
    
            db.Volunteer.findOne(query, (err, data) => {
                if (err) return res.json({ success: false, error: err });
                // return res.json({ success: true, volunteerinfo: volunteerinfo });
                res.send(data);
                 console.log("search: "+ data);
            });
        
})
router.get("/getVolunteer", (req, res) => {
    let query = {firstname:{ $regex: req.query.search,$options: 'i'}};
    
    console.log("search query: "+ query);
    if(!query){
        db.Volunteer.find((err, data) => {
            if (err) return res.json({ success: false, error: err });
            res.send(data);
            // console.log("with out  search "+volunteerinfo);
        })
     }else  {
        db.Volunteer.find(query, (err, data) => {
            if (err) return res.json({ success: false, error: err });
            // return res.json({ success: true, volunteerinfo: volunteerinfo });
             res.send(data);
            //  console.log("search: "+volunteerinfo);
        });
     }
});
//-----------------------------------------------------
router.post('/signin', (req, res) => {
    const {password}=req.body;
    let {email}=req.body;
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }
    email = email.toLowerCase();
    email = email.trim();
    db.Volunteer.find({
      email: email
    }, (err, volunteers) => {
      if (err) {
        console.log('err 2:', err);
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      if (volunteers.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }
      const volunteer = volunteers[0];
      if (!volunteer.validPassword(password)) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }
      // Otherwise correct user
      const VolunteerSession = new db.VolunteerSession();
      VolunteerSession.userId = volunteer._id;
      VolunteerSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: server error'
          });
        }
        return res.send({
          success: true,
          message: 'Valid sign in',
          token: doc._id
        });
      });
    });
  });

  router.get('/logout', (req, res) => {
    // Get the token
    
    const { token } = req.query;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    VolunteerSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted:true
      }
    }, null, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send({
        success: true,
        message: 'Good'
      });
    });
  });
//-------------------------------------------------------
router.post("/volunteer/signup", (req, res) => {
    

    const { firstname, lastname,  password, password_confirm, image } = req.body;
    let {email}= req.body;
    if (!email) {
        return res.send({
          success: false,
          message: 'Error: Email cannot be blank.'
        });
    }
    if (!password) {
        return res.send({
          success: false,
          message: 'Error: Password cannot be blank.'
        });
    }
      email = email.toLowerCase();
      email = email.trim();
    db.Volunteer.find({
        email: email
        }, (err, previousUsers) => {
            if (err) {
                return res.send({
                success: false,
                message: 'Error: Server error'
                });
            } else if (previousUsers.length > 0) {
                return res.send({
                success: false,
                message: 'Error: Account already exist.'
                });
            }
        
                let volunteer = new db.Volunteer();
                volunteer.firstname = firstname;
                volunteer.lastname = lastname;
                volunteer.email = email;
                volunteer.password = volunteer.generateHash(password);
                volunteer.password_confirm = password_confirm;
                volunteer.image = image;
            volunteer.save(err => {
                    // console.log("data: " + volunteer);
                    if (err) return res.json({ success: false, message: 'Error: Server error'});
                    return res.json({ success: true, message:'Signed up' });
            });
        })
});


router.get("/getAnimal", (req, res) => {
    // if animal type is dog 
    var query = {
        $and: [
            
        { size: { $regex: req.query.size, $options: 'i' } },
        { agelabel: { $regex: req.query.agelabel, $options: 'i' } },
        { sex: { $regex: req.query.sex, $options: 'i' } }]
    }
    db.Animal.find( query,
     (err, data) => {
        // console.log("animal" + animal);
        if (err) return res.json({ success: false, error: err });
        res.send(data)
        // console.log("animal" + data);            
    });
    
    
});


router.post("/putAnimal", (req, res) => {
    let animal = new db.Animal();

    const { id, breed, dogname, weight, sex, age ,zipcode,image} = req.body;
    // animal._id = new mongoose.Types.ObjectId(),
    animal.id = id;
    animal.breed = breed;
    animal.dogname = dogname;
    animal.weight = weight;
    animal.sex = sex;
    animal.age = age;
    animal.zipcode = zipcode;

    animal.image = image; // I like comments
        if (weight < 25) {
            animal.size = "small";
        } else if ((weight >= 25) && (weight <= 50)) {
            animal.size = "medium";
        } else if ((weight >= 51) && (weight <= 75)) {
            animal.size = "large";
        } else if ((weight > 75)) {
            animal.size = "extra-large";
        }
        
        if (age < 1) {
            animal.agelabel = "baby"
        } else if (age > 1 && age <= 3) {
            animal.agelabel = "young"
        } else if (age >= 4 && age <= 10) {
            animal.agelabel = "adult"
        } else if (age > 10) {
            animal.agelabel = "senior"
        }
    console.log("animal before save "+animal);

    animal.save(err => {
        // console.log("after save "+animal);
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
        // console.log(data);
    })
});

// POST /seed_data[?reset=true]
// Intent here is to seed animal, and volunteer data
// optionally pass ?reset query param to empty existing data models
router.post('/seed_data', (req, res) => {

    if (req.query.reset) {
        seeder.resetData()
        .then(() => seeder.seedData())
        .then(() => {
            res.json({success: true});
        })
        .catch(err => {
            res.json({success: false, error: err})
        })
        
    } else {
        seeder.seedData().then( () => {
            res.json({success: true})
        }).catch(err => {
            res.json({success: false, error: err})
        })
    }
})

router.post("/addrating/:id", (req, res) => {

    let volunteerReport = new db.VolunteerReport();
    const { name, sit_rating, lay_down_rating, walk_on_leash_rating, sit_in_crate_rating, comment } = req.body;
   const id= req.params.id;
    // volunteerReport.animal = req.params.id;
    volunteerReport.id = id;
    volunteerReport.name= name;
    volunteerReport.sit_rating= sit_rating;
    volunteerReport.lay_down_rating = lay_down_rating;
    volunteerReport.walk_on_leash_rating = walk_on_leash_rating;
    volunteerReport.sit_in_crate_rating = sit_in_crate_rating;
    volunteerReport.comment =comment;
    const ids=req.params.id;
      console.log("line no 169 animal id"+ ids);
  db.Animal.findOne({id:id},((err, dbanimal)=>{
    
      if(err) return res.json({ success: false, error: err });
      animalid= dbanimal._id;
      console.log("animal _id "+ animalid);
      volunteerReport.animalid= animalid;
      volunteerReport.save(err => {
        console.log("volunteer: "+ volunteerReport);
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
        //console.log(data)
    });
  }))
    

});

router.get("/getrating", (req, res) => {
    var query = {animalid: req.query.animalid}
    console.log("ids : "+ query);
    db.VolunteerReport.find( query, (err, data) =>{
        
        if (err) return res.json({ success: false, error: err });
         res.send(data);
         console.log("get rating from db: "+data);
        })
        
    
})
// router.get("/getrating", (req, res) => {
//     db.Volunteer.find((err, data) => {
//         if (err) return res.json({ success: false, error: err });
//         return res.json({ success: true, rating: data });
//         // res.send({data})
//     });
// });
module.exports = router;