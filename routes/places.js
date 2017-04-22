// kinda PlacesController

// MongoDB terminology:
// db - db
// table - collection
// row - document
// column - field

const express = require('express');
const Place = require('../models/place');

// Get an instance of the express router
const router = express.Router();

// router.use(function(req, res, next) {
//     console.log(`${timeLog()} connection accepted from ${req.ip} { url: "${req.url}", type: "${req.method}"}`)
//     next()
// })

const errorLog = (err) => {
    console.log(timeLog() + err.message)
};

// routes ending with /
router.route('/')

// CREATE a place (accessed at POST http://localhost:3000/places)
.post((req, res) => {
    Place.create(req.body
        /*{
                    name:        req.body.name,
                    addresses:   req.body.locations,
                    type:        req.body.type,
                    prices:      req.body.prices,
                    description: req.body.description
                }*/
        , (err, place) => {
            if (err) {
                res.status(500).send(err);
                errorLog(err)
            } else {
                res.send(place);
                console.log(timeLog() + `${place.name} created`)
            }
        })
})

// READ all places (accessed at GET http://localhost:3000/places)
.get((req, res) => {
    Place.find({}, (err, places) => {
        if (err) {
            res.status(500).send(err);
            errorLog(err)
        } else {
            res.json(places);
            console.log(timeLog() + `returned items: ${places.length}`)
        }
    })
})

.delete((req, res) => {
    Place.remove({}, (err) => {
        if (err) {
            res.status(500).send(err);
            errorLog(err)
        } else {
            // fixme
            res.sendStatus(201);
            console.log(timeLog() + `collection Place removed`)
        }
    })
});

// routes starting with /places/:id
router.route('/:id')
    // READ the place with that id (accessed at GET http://localhost:3000/places/:id)
    .get((req, res) => {
        Place.findById(req.params.id, (err, place) => {
            if (err) {
                res.status(500).send(err);
                errorLog(err)
            } else if (place == null) {
                res.sendStatus(404)
            } else {
                res.json(place);
                console.log(timeLog() + `returned items: ${place.id}`)
            }
        })
    })

// UPDATE the place with this id (accessed at PUT http://localhost:3000/places/:id)
.put((req, res) => {
    Place.findByIdAndUpdate(req.params.id, req.body, /*{new: true},*/ (err, place) => {
        if (err) {
            res.status(500).send(err);
            errorLog(err)
        } else if (place == null) {
            res.sendStatus(404)
        } else {
            res.send(place);
            console.log(timeLog() + `updated: { id: ${place.id}, name: ${place.name} }`)
        }
    })
})

// DELETE the place with this id (accessed at DELETE http://localhost:3000/places/:id)
.delete((req, res) => {
    Place.findByIdAndRemove(req.params.id, (err, place) => {
        if (err) {
            res.status(500).send(err);
            errorLog(err)
        } else if (place != null) {
            res.json({ message: `Place ${place.name} removed` });
            console.log(timeLog() + `Place ${place.name} has been removed`)
        } else {
            res.sendStatus(404);
            console.log('NO SUCH FILE')
        }
    })
});

module.exports = router;
