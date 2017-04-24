import express from 'express';
import Place   from '../models/place';

const router = express.Router();

// Routes ending with "/"
router.route('/')
    .post(postPlace)        // Create place
    .get(getPlaces)         // Read all places
    .delete(deletePlaces);  // Delete all places

// Routes starting with "/:id"
router.route('/:id')
    .get(getPlace)          // Read place with id
    .put(putPlace)          // Update place with id
    .delete(deletePlace);   // Delete place with id

export default router;


function deletePlace(req, res) {
    Place.findByIdAndRemove(req.params.id, (err, place) => {
        if (err) {
            res.status(400).send(err);
            console.log(`${timeLog()} ${err.name}`)
        } else if (place !== null) {
            res.sendStatus(204);
            console.log(`${timeLog()} ${place.name} removed`)
        } else {
            res.sendStatus(404);
            console.log(`${timeLog()} nothing found`)
        }
    })
}

function deletePlaces(req, res) {
    Place.remove({}, (err) => {
        if (err) {
            res.status(400).send(err);
            console.log(`${timeLog()} ${err.name}`)
        } else {
            res.sendStatus(204);
            console.log(`${timeLog()} ${Place.name} collection removed`)
        }
    })
}

function getPlace(req, res) {
    Place.findById(req.params.id, (err, place) => {
        if (err) {
            res.status(400).send(err);
            console.log(`${timeLog()} ${err.name}`)
        } else if (place === null) {
            res.sendStatus(404);
            console.log(`${timeLog()} nothing found`)
        } else {
            res.json(place);
            console.log(`${timeLog()} ${place.id} returned`)
        }
    })
}

function getPlaces(req, res) {
    Place.find({}, (err, places) => {
        if (err) {
            res.status(400).send(err);
            console.log(`${timeLog()} ${err.name}`)
        } else {
            res.json(places);
            console.log(`${timeLog()} returned ${places.length} items`)
        }
    })
}

function postPlace(req, res) {
    Place.create(req.body, (err, place) => {
        if (err) {
            res.status(400).send(err);
            console.log(`${timeLog()} ${err.name}`)
        } else {
            res.status(201).json(place);
            console.log(`${timeLog()} ${place.name} created`)
        }
    })
}

function putPlace(req, res) {
    Place.findByIdAndUpdate(req.params.id, req.body, /*{new: true},*/ (err, place) => {
        if (err) {
            res.sendStatus(400);
            console.log(`${timeLog()} ${err.name}`)
        } else if (place === null) {
            res.sendStatus(404);
            console.log(`${timeLog()} nothing found`)
        } else {
            res.json(place);
            console.log(`${timeLog()} ${place.id} updated`)
        }
    })
}
