import express from 'express';
import Place from '../models/place';

const postPlaces = (req, res) => {
    Place.create(req.body, (err, place) => {
        if (err) {
            res.status(400).send(err);
            errorLog(err)
        } else {
            res.status(201).send(place);
            console.log(`${timeLog()} ${place.name} created`)
        }
    })
};

const getPlaces = (req, res) => {
    Place.find({}, (err, places) => {
        if (err) {
            res.status(500).send(err);
            errorLog(err)
        } else {
            res.json(places);
            console.log(`${timeLog()} returned items: ${places.length}`)
        }
    })
};

const deletePlaces = (req, res) => {
    Place.remove({}, (err) => {
        if (err) {
            res.status(500).send(err);
            errorLog(err)
        } else {
            res.sendStatus(204);
            console.log(`${timeLog()} collection Place removed`)
        }
    })
};

const getPlace = (req, res) => {
    Place.findById(req.params.id, (err, place) => {
        if (err) {
            res.status(500).send(err);
            errorLog(err)
        } else if (place === null) {
            res.sendStatus(404)
        } else {
            res.json(place);
            console.log(`${timeLog()} returned items: ${place.id}`)
        }
    })
};

const putPlace = (req, res) => {
    Place.findByIdAndUpdate(req.params.id, req.body, /*{new: true},*/ (err, place) => {
        if (err) {
            res.sendStatus(400);
            errorLog(err)
        } else if (place === null) {
            res.sendStatus(404);
            errorLog(404)
        } else {
            res.send(place);
            console.log(`${timeLog()} updated: { id: ${place.id}, name: ${place.name} }`)
        }
    })
};

const deletePlace = (req, res) => {
    Place.findByIdAndRemove(req.params.id, (err, place) => {
        if (err) {
            res.status(500).send(err);
            errorLog(err)
        } else if (place !== null) {
            res.sendStatus(204);
            console.log(`${timeLog()} place ${place.name} has been removed`)
        } else {
            res.sendStatus(404);
            console.log(`${timeLog()} place not found`)
        }
    })
};


// Get an instance of express router.
const router = express.Router();

// Routes ending with "/".
router.route('/')
    // Create a place
    .post(postPlaces)
    // Read all places
    .get(getPlaces)
    // Delete all
    .delete(deletePlaces);

// Routes starting with "/places/:id".
router.route('/:id')
    // Read the place with id
    .get(getPlace)
    // Update the place with id
    .put(putPlace)
    // Delete the place with id
    .delete(deletePlace);

export default router;
