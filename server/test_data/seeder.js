const db = require('../models')
const uniqueNames = require('unique-names-generator');
const personNameGenerator = require('node-random-name');
const dogNames = require('dog-names');
const loremIpsum = require('lorem-ipsum');

const numShelters = 10;
const numAnimalsPerShelter = 300;
const numVolunteersPerShelter = 12;
const numVolunteerReportsPerAnimal = 25;
/**
 * Resets all model data. Returns a Promise
 * Usage: resetData().then(() => {}).catch(err => {})
 */
const resetData = () => {
    seederLog("Resetting data");
    const models = ['Animal','Volunteer','VolunteerReport','Shelter'];
    // builds up array of promise callbacks
    const removeMethods = [];
    models.forEach(modelName => {
        removeMethods.push( new Promise ((localResolve, localReject) => {
            
            try{
                // Drop and create
                db[modelName].collection.drop();
                db[modelName].createCollection().then(() => {
                    localResolve()
                }).catch(err => {
                    localReject(err)
                })
                localResolve()
            } catch(err) {
                localReject(err);
            }
        }));
    })
    return Promise.all(removeMethods)
}



/**
 * Creates new fake data. Returns a Promise
 * Usage: resetData().then(() => {}).catch(err => {})
 */
const seedData = () => {
    seederLog("Seeding new data");
    return new Promise( (resolve, reject) => {

        const animalCreationPromises = []
        for (let k=0; k<numAnimalsPerShelter; k++) {
            animalCreationPromises.push(buildAnimalCreationPromise())
        }

        // Now let's create a bunch of volunteers
        volunteerCreationPromises = []
        for (let k=0; k<numVolunteersPerShelter; k++) {
            volunteerCreationPromises.push(buildVolunteerCreationPromise())
        }

        seederLog(`Creating ${numAnimalsPerShelter} animals`)
        // will house results from first set of promises
        let createdAnimals
        Promise.all(animalCreationPromises)
        .then(promisedCreatedAnimals => {
            createdAnimals = promisedCreatedAnimals;
            seederLog(`Creating ${numVolunteersPerShelter} volunteers`)
            return Promise.all(volunteerCreationPromises)
        })
        .then(createdVolunteers => {
            // @todo create reports for volunteers to animals

            // for each animal, create some reports 
            seederLog(`Creating ${numVolunteerReportsPerAnimal} volunteer reports for each animal using a random volunteer`)
            for(var l=0; l< createdAnimals.length; l++) {
                for(var m=0; m< numVolunteerReportsPerAnimal; m++) {
                    // Get a random volunteer and do it!
                    const randVolunteerIdx = Math.floor(Math.random() * createdVolunteers.length)                            
                    db.VolunteerReport.create({
                        volunteer: createdVolunteers[randVolunteerIdx]._id,
                        animal: createdAnimals[l]._id,
                        sit_rating: Math.floor((Math.random() * 5) + 1),
                        lay_down_rating: Math.floor((Math.random() * 5) + 1),
                        walk_on_leash_rating: Math.floor((Math.random() * 5) + 1),
                        sit_in_crate_rating: Math.floor((Math.random() * 5) + 1),
                        comment: loremIpsum({
                            count: 2,
                            units: 'sentences',
                        }),
                    })
                }   
            }
            
            resolve("done")
        })
        .catch(err => {
            reject(err);
        })

    }).catch(err => {
        reject(err)
    })
        
        
}


const randomImages = ["https://www.kimballstock.com/pix/PUP/12/PUP-12-GR0004-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-CB0007-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-CB0004-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-GR0021-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP_12_FA0006_01_P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-GR0014-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-GR0011-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-GR0019-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-CB0006-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-GR0005-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP_12_RC0005_01_P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-GR0007-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP_12_CE0005_01_P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP_12_CE0006_01_P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP_12_RC0002_01_P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-GR0008-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-CB0003-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-GR0026-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-CB0013-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP_12_FA0004_01_P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-CB0005-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-GR0013-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-LS0001-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP_12_RC0004_01_P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP_12_RK0008_02_P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-CB0001-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-CB0012-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-CB0008-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-CB0015-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP_12_RK0009_09_P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP_12_CE0001_01_P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-GR0009-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-GR0015-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-CB0009-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP_12_RC0001_01_P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-GL0001-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP_12_RK0012_03_P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-GR0023-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-GR0027-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP_12_RC0003_01_P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP_12_FA0001_01_P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP_12_GR0003_01_P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-CB0002-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-GR0020-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-CB0010-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-GR0006-01P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP_12_FA0003_01_P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP_12_CE0003_01_P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP_12_CE0004_01_P.JPG", "https://www.kimballstock.com/pix/PUP/12/PUP-12-CB0016-01P.JPG"];

const getRandomImage = () => {
    const randomIdx = Math.floor((Math.random() * randomImages.length));
    return randomImages[randomIdx]
};

const buildAnimalCreationPromise = () => {
    return new Promise( (resolve, reject) => {
        const gender = Math.round(Math.random()) === 1 ? 'M': 'F'
        db.Animal.create({
            animalType: 'dog',
            sex: gender,
            size: Math.floor(Math.random() * 130) + 'lbs',
            age: Math.floor(Math.random() * 15),
            name: gender === 'F' ? dogNames.femaleRandom() : dogNames.maleRandom(),
            image: getRandomImage(), // This just gets a random image from the randomImages array
        }).then(animal => {
            resolve(animal)
        }).catch(err => {
            reject(err);
        })
        
    })
}

const buildVolunteerCreationPromise = () => {
    return new Promise( (resolve, reject) => {

        const volunteerData = {
            fname: personNameGenerator({first: true}),
            lname: personNameGenerator({last: true}),
            email: uniqueNames.generate('-') + '@somewhere.com',
            password: 'abc12345',
        }
        db.Volunteer.create(volunteerData)
        .then(volunteer => {
            resolve(volunteer)
        }).catch(err => {
            reject(err);
        })
    })
}


const seederLog = (msg) => {
    console.log(`[seeder] ${msg}`);
}

module.exports = {
    resetData,
    seedData
}